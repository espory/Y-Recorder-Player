import { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FILES_HOST } from '../../../../common/fetch';

const { Dragger } = Upload;


export default class FileDragger extends PureComponent {
  render() {
    // const { breadcrumbList } = this.props;
    const { dispatch, visible, data } = this.props;
    const { topicId } = data;
    dispatch('setData', { topicId });

    const props = {
      name: 'file',
      accept: '.pdf,.bib',
      multiple: true,
      action: FILES_HOST + '/pdf/upload',
      withCredentials: true,
      data: file => {
        const { name } = file;
        const type = name.split('.').pop();
        return {
          type,
          topicId,
        };
      },
      onChange(info) {
        const { status } = info.file;
        if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
        if (status === 'done') {
          const { response } = info.file;
          const { data } = response;
          message.success(`${info.file.name} file uploaded successfully.`);
          const type = info.file.name.split('.').pop();
          if (type === 'pdf') {
            dispatch('getHeadData', { filename: info.file.name, topicId, crypted: data });
            dispatch('setData', { draggerVisible: false, bibFormVisible: false, headFormVisible: true, crypted: data });
          }
          if (type === 'bib') {
            dispatch('setData', { draggerVisible: false, bibFormVisible: true, headFormVisible: false, bibData: data });
          }
        }
      },
    };

    return (
      <div>
        {
          visible &&
          <Dragger {...props}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger>
        }
      </div>
    );
  }
}
