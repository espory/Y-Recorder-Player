import { PureComponent, createRef } from 'react';
import { Form, Input, Button, Space, Modal, Row, Col, Tooltip, message } from 'antd';
import { InboxOutlined, DeleteFilled, CloseCircleFilled } from '@ant-design/icons';
import IconToolTip from '../../../../components/iconToolTip';
import { formConfig, TYPE } from './config';
import { checkSplitFile, fileIcon } from '../../utils';
import './index.less';
const { Item } = Form;
// const { Dragger } = Upload;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: { span: 17 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 14 },
};
const validExtend = [ 'pdf', 'bib' ];
const attachmentValidExtend = [ 'doc', 'docx', 'pdf', 'ppt', 'md', 'txt', 'jpg', 'png', 'jpeg', 'gif',
  'bmp', 'csv', 'json', 'gz', 'zip', 'bib', 'xls', 'xlsx', 'csv', 'ppt', 'pptx' ];
// const selectOption = [ 'article', 'book', 'incollection', 'inproceedings', 'mastersthesis', 'phdthesis', 'proceedings', 'www' ];

/**
 * 弹出表单,通过fileFormVisible来控制是否显示,通过formData传递表单内容,当前有处3调用
 * 1. "添加文献"按钮
 * 2. infoDrawer => "引用"tab => 引文list中的超链接导入文献
 * 3. fileTable中的添加按钮(已废弃)
 */
class FileForm extends PureComponent {
  formRef = createRef();

  constructor(props) {
    super(props);
    const { createType } = props;
    const formType = createType === TYPE.DOCUMENT.name ? TYPE.DOCUMENT : TYPE.ATTACHMENT;
    this.state = {
      status: 0,
      filenameList: [],
      files: {},
      inputValue: '',
      formType,
    };
  }
  parseToBibTexOrRef = value => {
    const files = [];
    let isBibTex = false;
    let file = '';
    for (let i = 0; i < value.length; ++i) {
      if (file.length === 0) {
        if (value[i] === ' ' || value[i] === '\n') continue;
        if (value[i] === '@') isBibTex = true;
        file += value[i];
      } else {
        if (value[i] === '\n') {
          if (!isBibTex ||
              file[file.length - 1] === '}' && (file[file.length - 2] === '}' || file[file.length - 2] === ',')) {
            files.push({ type: isBibTex ? 'bibtxt' : 'reftxt', text: file });
            file = '';
            isBibTex = false;
          }
        } else {
          file += value[i];
        }
      }
    }
    if (file.length !== 0) files.push({ type: isBibTex ? 'bibtxt' : 'reftxt', text: file });
    return files;
  }

  onFinish = async values => {
    const { dispatch, topicId, history } = this.props;
    const { files, filenameList, status, inputValue, formType } = this.state;
    if (filenameList.length) {
      if (formType === TYPE.DOCUMENT) {
        const { filesList, bibErrorInfo } = await checkSplitFile(files);
        if (bibErrorInfo.length > 0) {
          dispatch('setData', { bibErrorVisible: true, bibErrorInfo, filesList });
        } else {
          dispatch('toAfterUpload', { files: filesList, history });
        }
      } else {
        dispatch('setData', { loading: true });
        await dispatch('uploadAttachment', { files });
        dispatch('setData', { loading: false });

      }
      return;
    }
    if (status === 1) {
      const parseFiles = this.parseToBibTexOrRef(inputValue);
      const files = [ new File([ inputValue ], 'input.bib') ];
      console.log('parseFiles', files);
      if (parseFiles.length > 0) {
        const { filesList, bibErrorInfo } = await checkSplitFile(files);
        if (bibErrorInfo.length > 0) {
          dispatch('setData', { bibErrorVisible: true, bibErrorInfo, filesList });
        } else {
          dispatch('toAfterUpload', { files: filesList, history });
        }
      } else {
        message.error('请粘贴BibTex结构化文本或者引文格式');
      }
      return;
    }

    const { authors = '', title } = values;
    if (!title || title === '') {
      message.error('请填写标题或上传文件');
      return;
    }
    values.authors = authors.split(' and ');
    dispatch('createFile', { ...values, topicId });
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({ filenameList: [], files: [], status: 0 });

  };

  // 在点击添加文献button出现的modal，内部拖拽触发
  toAfterUploadDocument = () => {
    const that = this;
    return async e => {
      const { files } = e.dataTransfer || e.target;
      for (const file of files) {
        if (validExtend.indexOf(file.name.split('.').pop()) === -1) {
          message.error('仅支持.pdf .bib文件');
          return;
        }
      }
      const filenameList = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        filenameList.push(file.name);
      }
      that.setState({ status: 2, filenameList, files });
    };
  }
// 在点击添加文献button出现的modal，内部点击触发
toAfterUploadAttachment = () => {
  const that = this;
  return async e => {
    const { files } = e.dataTransfer || e.target;
    for (const file of files) {
      const ext = file.name.split('.').pop();
      if (attachmentValidExtend.indexOf(ext) === -1) {
        message.error(`不支持.${ext}类型文件`);
        return;
      }
    }
    const filenameList = [];
    for (let index = 0; index < files.length; index++) {
      filenameList.push(files[index].name);
    }
    that.setState({ status: 2, filenameList, files });
  };
}
  deleteFile = (that, index) => () => {
    const { filenameList } = that.state;
    that.setState({
      filenameList: filenameList.filter((_, i) => i !== index),
    });
    if (filenameList.length === 1) {
      this.setState({ status: 0, files: {} });
    }
  }

  render() {
    const { dispatch } = this.props;
    const { status, formType, filenameList } = this.state;
    // const formType = TYPE.ATTACHMENT;

    let formRender;
    if (formType.name === TYPE.DOCUMENT.name) {
      formRender = <div
        className="upload-block dragger-block"
        onClick={() => {
          this.setState({ status: 1 });
        }}
        onDrop={this.toAfterUploadDocument()}>
        <p className="dragger-block-icon"><InboxOutlined /></p>
        <div className="dragger-block-text">
          <p>支持拖拽多篇.pdf .bib文件上传</p>
          <p>支持粘贴BibTex结构化文本</p>
          {/* <p>支持粘贴引文格式</p> */}
        </div>
      </div>;
    } else if (formType.name === TYPE.ATTACHMENT.name) {
      formRender = <div
        className="upload-block dragger-block"
        style={{ marginBottom: '10px' }}
        onDrop={this.toAfterUploadAttachment()}>
        <p className="dragger-block-icon"><InboxOutlined /></p>
        <div className="dragger-block-text">
          <p>支持多种附件格式点击、拖动上传</p>
          <input type="file" className="file_upload" multiple onChange={this.toAfterUploadAttachment()} />
        </div>
      </div>;
    }

    return (<Modal
    // 用formData.id是否被定义判断 编辑文献｜添加文献
      title={
        <div>{formType.title}&nbsp;{formType.name === TYPE.DOCUMENT.name ? <IconToolTip info="Aplus建议上传pdf或bib文件以提高文献信息准确度"/> : null}</div>
      }
      visible={true}
      footer={null}
      getContainer={false}
      onCancel={() => { dispatch('setData', { fileFormVisible: false }); }}>
      <Form {...layout} ref={this.formRef} onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}>
        { formType.name === TYPE.DOCUMENT.name && status === 0 && <>
          {formConfig.map(it => {
            return (it.inCreate && <Item
              key={it.name}
              name={it.name}
              label={it.label}
              extra={it.extra}
              rules={[{ ...it.rule, message: `请输入${it.label}` }]}
            >
              {it.child ? it.child : <Input size="large" placeholder={it.label} />}
            </Item>);
          })}
        </> }
        <Row>
          <Col offset={3} span={19} style={{ marginBottom: 10 }}>

            {status === 0 && formRender}
            {status === 1 && <div
              className="input-block">
              <Input.TextArea
                className="border-style-dashed"
                placeholder="粘贴BibTex结构化文本"
                onChange={e => { this.setState({ inputValue: e.target.value }); }}
                rows={10} />
              <div className="close-block">
                <CloseCircleFilled onClick={() => { this.setState({ status: 0, inputValue: '' }); }} className="close-icon" />
              </div>
            </div>}
            {status === 2 && <div
              className="upload-block file-list-block">
              <Row gutter={[ 16, 16 ]}>
                {filenameList.map((filename, index) => (
                  <Col key={filename} span={8} className="file-item">
                    <div className="file-icon-block">
                      {/* <FilePdfFilled className="file-icon" /> */}
                      {fileIcon(filename, 'file-icon')}
                      {formType.name === TYPE.DOCUMENT.name && <div className="delete-mask">
                        <DeleteFilled className="delete-icon" onClick={this.deleteFile(this, index)} />
                      </div>}
                    </div>
                    <Tooltip title={filename} placement="bottom">
                      <p className="file-name">{filename}</p>
                    </Tooltip>
                  </Col>
                ))}
              </Row>
            </div>}
          </Col>
        </Row>
        <Item {...tailLayout}>
          <Space style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button size='middle' type="primary" htmlType="submit">
            提交
            </Button>
            <Button size='middle' onClick={this.onReset}>
            重置
            </Button>
          </Space>
        </Item>
      </Form>
    </Modal>);
  }
}

export default FileForm;

