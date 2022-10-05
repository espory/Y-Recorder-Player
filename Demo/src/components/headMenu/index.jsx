import { BellOutlined, PlusCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Popover, List } from 'antd';
import { PureComponent } from 'react';
import connect from '../../model/connect';
import { FILES_HOST } from '../../common/fetch';
import './index.less';

const buttonSize = 18;
const avatarMenu = props => {
  const { dispatch, routeHistory, setActiveKey } = props;
  return [
    {
      name: '个人信息',
      icon: <UserOutlined/>,
      onClick: () => {
        setActiveKey({ key: '我的信息-0' }, '个人信息管理');
        dispatch('toMyInfo', { routeHistory });
      },
    },
    {
      name: '登出',
      icon: <LogoutOutlined/>,
      onClick: () => {
        dispatch('logout');
      },
    },
  ];
};
class HeadMenu extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch('getUserInfo');
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, myInfo } = nextProps;
    const { avatar = {} } = myInfo.myInfo;
    const { link = '' } = avatar;
    if (link.length) {
      dispatch('setData', { avatarPreview: FILES_HOST + '/' + link });
    }
  }
  render() {
    const { notificationList, avatarPreview, name } = this.props;

    return (
      <>
        <div className='head-menu'>
          <PlusCircleOutlined className='head-menu-button'
            onClick={() => { console.log('icon click'); }} style={{ fontSize: buttonSize }}/>

          <Badge count={notificationList.length}
            dot={true}
            // size={'small'}
            offset={[ -12, 2 ]}
          >
            <BellOutlined className='head-menu-button'
              onClick={() => { console.log('icon click'); }}style={{ fontSize: buttonSize }}/>
          </Badge>

          <Popover overlayClassName={'head-menu-popover'} placement="bottomRight" title={<span style={{ fontSize: 16 }}>{name}</span>} content={
            <List
              size="small"
              header={null}
              footer={null}
              dataSource={avatarMenu(this.props)}
              renderItem={item => <div className='avatar-menu-item'
                onClick={item.onClick}
              >{item.icon}
                {<div style={{ marginLeft: 10 }}>{item.name}
                </div>}
              </div>
              }
            />
          }>
            <Avatar
              src={ avatarPreview}
              style={{ marginRight: 20 }}/>
          </Popover>
        </div>
      </>);
  }
}
export default connect()(HeadMenu);
