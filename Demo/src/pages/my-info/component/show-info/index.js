import { PureComponent } from 'react';
import { Row, Col, Button, Popover, Descriptions, message } from 'antd';
import { PlusOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getAge } from '../../utils';
import './index.less';
import { FILES_HOST } from '../../../../common/fetch';

class ShowInfo extends PureComponent {
  handleVisibleChange = async () => {
    const { data = {}, dispatch } = this.props;
    const { avatarPopoverVisible } = data;
    await dispatch('setData', { avatarPopoverVisible: !avatarPopoverVisible });
  }

  handleUpdataAvatarClick = async () => {
    const { dispatch } = this.props;
    dispatch('getSystemAvatarsData');
  }

  handleClickSystemAvatar = async img => {
    const { dispatch } = this.props;
    await dispatch('handleChangeSystemAvatar', img);
    message.success('更换成功');
  }

  render() {
    const { data = {} } = this.props;
    const { avatarPopoverVisible, systemAvatars, myInfo } = data;

    const updateAvatar = (
      <div>
        <div>
          <div className="system-avatar-text">系统头像</div>
          <div className="mt-10">
            {systemAvatars.map((item, index) =>
              <img
                key={item.id}
                src={FILES_HOST + '/' + item.link}
                className="system-avatar"
                style={{ marginLeft: index !== 0 ? 8 : 0 }}
                onClick={this.handleClickSystemAvatar.bind(this, item)} />
            )}
          </div>
        </div>
        <div className="custom-avatar-btn">
          <Link to="/customAvatar">
            <PlusOutlined />
            &nbsp;&nbsp;自定义头像
          </Link>
        </div>
      </div>
    );

    return (
      <div className="container">
        <Row className="flex-center">
          <Col span={1}>
            <img
              src={myInfo.avatar.link ? FILES_HOST + '/' + myInfo.avatar.link : '' }
              className="avatar" />
          </Col>
          <Col span={4}>
            <div className="ml-30">
              <Popover
                trigger="click"
                placement="bottom"
                title="更换头像"
                content={updateAvatar}
                visible={ avatarPopoverVisible }
                onVisibleChange={this.handleVisibleChange}>
                <Button onClick={this.handleUpdataAvatarClick.bind(this)}>更换头像</Button>
              </Popover>
              <div className="avatar-btn-text">点击进行头像更换</div>
            </div>
          </Col>
        </Row>

        <div className="mt-25">
          <Descriptions column = {{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label = '昵称'>
              {myInfo.name} &nbsp;
              { myInfo.gender === 'male' && <ManOutlined /> }
              { myInfo.gender === 'female' && <WomanOutlined /> }
            </Descriptions.Item>
            <Descriptions.Item label = '年龄'>{myInfo.birthday ? getAge(myInfo.birthday) : ''}</Descriptions.Item>
            <Descriptions.Item label = '简介'>{myInfo.intro}</Descriptions.Item>
            <Descriptions.Item label = '学/工号'>{myInfo.stu_num}</Descriptions.Item>
            <Descriptions.Item label = '电子邮箱'>{myInfo.mail}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}

export default ShowInfo;
