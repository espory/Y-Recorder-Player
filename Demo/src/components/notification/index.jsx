import { Drawer, List } from 'antd';
import { PureComponent } from 'react';
import NotificationItem from './components/notificationItem';
import connect from '../../model/connect';

const WIDTH = 300;
const CONTENT_MAXLENGTH = 14;

class Notification extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch('setData', { userName: 'cy' });
  }
  render() {
    const { notificationVisible, notificationList, dispatch } = this.props;
    return (<div className="notification-container">
      <Drawer
        title="通知"
        placement={'right'}
        closable={true}
        onClose={() => dispatch('setData', { notificationVisible: false })}
        visible={notificationVisible}
        width={WIDTH}
        bodyStyle={{ background: '#F0F2F5', padding: 0 }}
      >
        <List>
          {notificationList.map((item, idx) => {
            if (item.content && item.content.length >= CONTENT_MAXLENGTH) {
              item.content = item.content.slice(0, CONTENT_MAXLENGTH) + '...';
            }
            return (<NotificationItem key={idx} title={item.name} description={item.content} avatar={item.avatar}/>);
          })}
        </List>
      </Drawer></div>);
  }
}
export default connect()(Notification);

