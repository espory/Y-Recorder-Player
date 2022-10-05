import { PureComponent } from 'react';
import './index.less';
import { List } from 'antd';
import GroupItem from '../own-item';


export default class CreatedGroupList extends PureComponent {

  onMyGoupPageChange = async page => {
    const { data = {}, dispatch } = this.props;
    const { createdGroupPageInfo } = data;
    await dispatch('setData', { createdGroupPageInfo: { ...createdGroupPageInfo, current: page } });
    await dispatch('getCreatedData');
  }

  render() {
    const { data = {}, dispatch } = this.props;
    const { createdGroupList, createdGroupPageInfo } = data;

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: this.onMyGoupPageChange,
          ...createdGroupPageInfo,
        }}
        dataSource={createdGroupList}
        renderItem={item => (
          <List.Item key={item.id} >
            <GroupItem data={item} dispatch={dispatch}/>
          </List.Item>
        )}/>
    );
  }
}
