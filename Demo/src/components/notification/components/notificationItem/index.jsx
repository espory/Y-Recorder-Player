import { Skeleton, Avatar, List } from 'antd';
import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { avatar, title, description, loading } = this.props;
    return (
      <List.Item style={{ background: 'white' }}>
        <Skeleton avatar title={false} loading={loading} active>
          <List.Item.Meta
            avatar={<Avatar src={avatar} size={45} style={{ marginLeft: 10, marginRight: 0 }}/>}
            title={title}
            description={description}
          />
        </Skeleton>
      </List.Item>);
  }
}
export default NotificationItem;

