import { PureComponent } from 'react';
import { message, Row, Col, Divider, Button } from 'antd';
import Avatar from 'react-avatar-edit';
import './index.less';
import { FILES_HOST } from '../../../../common/fetch';

class CustomAvatar extends PureComponent {
  onClose = async () => {
    const { data = {}, dispatch } = this.props;
    const { myInfo } = data;
    await dispatch('setData', { avatarPreview: myInfo.avatar.link ? FILES_HOST + '/' + myInfo.avatar.link : '', avatarSelected: false });
  }

  onCrop = async preview => {
    const { dispatch } = this.props;
    await dispatch('setData', { avatarPreview: preview });
  }

  onBeforeFileLoad = async elem => {
    const { dispatch } = this.props;
    if (elem.target.files[0].size > 200 * 1024) {
      message.error('大小超出限制');
      return;
    }
    const names = elem.target.files[0].name.split('.');
    names[0] += '_' + (new Date()).getTime().toString();
    await dispatch('setData', { customAvatarName: names.join('.'), avatarSelected: true });
  }

  dataURIToFile = (dataUri, customAvatarName) => {
    const splitDataUri = dataUri.split(',');
    const byteString = splitDataUri[0].indexOf('base64') >= 0 ? atob(splitDataUri[1]) : decodeURI(splitDataUri[1]);
    const mimeString = splitDataUri[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; ++i) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ ia ], customAvatarName, { type: mimeString });
  }

  handleClickUpload = async () => {
    const { data = {}, dispatch } = this.props;
    const { avatarPreview, customAvatarName } = data;
    const file = this.dataURIToFile(avatarPreview, customAvatarName);
    const user = localStorage.getItem('user');
    const formData = new FormData();
    formData.append('Content-Type', 'multipart/form-data');
    formData.append('file', file);
    formData.append('filename', customAvatarName);
    formData.append('user', JSON.stringify(user));
    await dispatch('handleChangeCustomAvatar', formData);
    message.success('更换成功');
  }

  render() {
    const { data = {} } = this.props;
    const { avatarSelected, avatarPreview } = data;

    return (
      <div className="custom-avatar-container">
        <Row className="avatar-uploader">
          <Col span={4} offset={8}>
            <div className="ta-center of-hidden">
              <Avatar
                width={250}
                height={250}
                cropRadius={60}
                onCrop={this.onCrop}
                onClose={this.onClose}
                onBeforeFileLoad={this.onBeforeFileLoad}
                label="选择图片"
                labelStyle={{ letterSpacing: 2, fontSize: 20, color: 'grey' }}
                borderStyle={{ border: '1px dashed #d9d9d9', borderRadius: 5, backgroundColor: '#fafafa' }}
              />
            </div>
          </Col>
          <Col span={1}>
            <div className="ta-right">
              <Divider className="divider" type="vertical" />
            </div>
          </Col>
          <Col span={3}>
            <div className="ta-center">
              <div className="dp-ib">
                <div className="img-wrapper">
                  <img
                    src={avatarPreview}
                    className="avatar"
                    alt="Preview" />
                </div>
              </div>
              <div className="avatar-text">{ avatarSelected ? '预览头像' : '当前头像' }</div>
            </div>
          </Col>
        </Row>

        <div className="uploader-text">
          请选择图片上传：大小250 * 250像素支持JPG、PNG等格式，图片需小于200KB
        </div>

        <div className="uploader-btn">
          <Button onClick={this.handleClickUpload.bind(this)} type="primary" disabled={ !avatarSelected }>更新</Button>
        </div>
      </div>
    );
  }
}

export default CustomAvatar;
