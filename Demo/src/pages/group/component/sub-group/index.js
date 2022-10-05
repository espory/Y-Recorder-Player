import { PureComponent } from 'react';
import './index.less';
import { List } from 'antd';
import SubGroupItem from '../sub-item';


export default class SubGroupList extends PureComponent {

  onMyGoupPageChange = async page => {
    const { data = {}, dispatch } = this.props;
    const { subGroupPageInfo } = data;
    await dispatch('setData', { subGroupPageInfo: { ...subGroupPageInfo, current: page } });
    await dispatch('getSubData');
  }

  render() {
    const { data = {}, dispatch } = this.props;
    const { subGroupList, subGroupPageInfo } = data;

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: this.onMyGoupPageChange,
          ...subGroupPageInfo,
        }}
        dataSource={subGroupList}
        renderItem={item => (
          <List.Item key={item.id} >
            <SubGroupItem data={item} dispatch={dispatch}/>
          </List.Item>
        )}/>
    );
  }
}
