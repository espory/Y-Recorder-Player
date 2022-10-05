import FileButton from './fileButton';
import TagsEditor from './tagsEditor';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Upload, message, Rate, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { getLoadedDocModel } from '../../../docTypeModels';

const { TextArea } = Input;
const { Option } = Select;

const loadedDocModel = getLoadedDocModel();
const loadedDocModelKeys = Object.keys(loadedDocModel);

export default function EditInfo(props) {
  const { setstatus, model, dispatch } = props;
  const { id, fileUrl } = model;
  const [ form ] = Form.useForm();
  const { title, mark, tags = [], authors = [], type } = model;
  // 按照type选择展示form表
  const [ showForm, setshowForm ] = useState(type);
  const [ titleTextArea, settitleTextArea ] = useState('');
  const [ tagsState, setTagsState ] = useState([]);
  const [ authorsList, setauthorsList ] = useState([]);

  const haveFile = fileUrl === undefined ? false : fileUrl !== '';
  const choosedModel = loadedDocModel[loadedDocModelKeys.find(key => key === showForm)];

  const onFinish = async values => {
    const { id, extra } = model;
    // 此处 howpublished 写作url ，后续需要修改
    if ('url' in values) {
      values.howpublished = values.url;
      delete values.url;
    }
    values = Object.assign(values, { title: titleTextArea, tags: tagsState });
    const { title, authors, tags, mark, ...rest } = values;
    tags.sort();
    const submit = { fileId: id, title, authors, type: showForm, tags, mark, extra: { ...extra, ...rest } };
    await dispatch('updateDocument', submit);
    message.success('修改成功');
    setstatus('showInfo');
  };

  const onReset = () => {
    form.resetFields();
    setshowForm(type);
  };

  useEffect(() => {
    setTagsState(tags);
    settitleTextArea(title);
    setauthorsList(authors);
    onReset();
  }, [ model ]);
  return (
    <div className="edit-form">
      <TextArea
        value={titleTextArea}
        onChange={e => { settitleTextArea(e.target.value); }}
        placeholder="请填写标题信息"
        style={{ fontSize: '18px', maxWidth: '96%' }}
        autoSize={{}}
      />

      <div className="file-frame">
        {/* 有文件时 */}
        {haveFile && <FileButton
          downloadFile={ ({ fileUrl }) => {
            dispatch('downloadFile', { url: fileUrl });
          }}
          clearFileUrl={ ({ fileId }) => {
            dispatch('clearFileUrl', { fileId });
          }}
          fileUrl={fileUrl} fileId = {id}/>}
        {/* 无文件时 */}
        {!haveFile && <Upload
          onClick ={e => {
            e.stopPropagation();
          }}
          accept ='.pdf'
          beforeUpload ={file => {
            dispatch('updateFileUrl', { file, fileId: id });
            return false;
          }}>
          <Button icon={<UploadOutlined />}
          >选择文献</Button>
        </Upload>}
      </div>

      <Form
        form = {form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        name="control-hooks"
        initialValues = { { ...model,
          url: model.howpublished, // 此处 howpublished 写作url ，后续需要修改
        } }
        onFinish={onFinish}>

        <Form.Item
          label="type"
          name="type"
          rules={[{ required: true, message: 'Please input type' }]}
        >
          <Select value={showForm} defaultValue={type} onChange={value => {
            setshowForm(value);
          }}>
            {
              loadedDocModelKeys.map(type => <Option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Option>)
            }
          </Select>
        </Form.Item>

        {(choosedModel.editFields).map(({ name, required }) => {
          name = name === 'howpublished' ? 'url' : name; // 此处 howpublished 写作url ，后续需要修改
          return <Form.Item
            label={name.charAt(0).toUpperCase() + name.slice(1)}
            name={name}
            rules={[{ required, message: `Please input ${name}` }]}
          >
            {name === 'authors' ? <div className="edit-form-authors-div">
              <Input defaultValue={ typeof (authorsList) === 'string' ? authorsList : authorsList.join(' and ')} />
              <span id="edit-form-span">请用 and 分隔作者</span>
            </div> : <Input /> }
          </Form.Item>;
        })}

        <Form.Item
          label="mark"
          name="mark"
        >
          <Rate defaultValue={mark}/>
        </Form.Item>
        <Row className='form-tags'>
          <Col span={4} style={{ textAlign: 'right' }}><label>标签</label></Col>
          <Col span={19}>
            <TagsEditor tags={tagsState} setTags={setTagsState}/>
          </Col>
        </Row>
        <Form.Item
          wrapperCol= {{ offset: 8, span: 16 }}
        >
          <Button type="primary" style={{ marginRight: '15px' }} htmlType="submit">
          提交
          </Button>
          <Button htmlType="button" onClick={
            () => {
              setstatus('showInfo');
            }
            // onReset
          }>
          返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

