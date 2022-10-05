import { PureComponent } from 'react';
import './index.less';
import { List } from 'antd';
import SearchGroupItem from '../search-item';


export default class SearchGroupList extends PureComponent {

  onMyGoupPageChange = async page => {
    const { data = {}, dispatch } = this.props;
    const { searchGroupPageInfo } = data;
    await dispatch('setData', { searchGroupPageInfo: { ...searchGroupPageInfo, current: page } });
    await dispatch('getSearchData');
  }

  render() {
    const { data = {}, dispatch } = this.props;
    const { searchGroupList, searchGroupPageInfo } = data;

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: this.onMyGoupPageChange,
          ...searchGroupPageInfo,
        }}
        dataSource={searchGroupList}
        renderItem={item => (
          <List.Item key={item.id}>
            <SearchGroupItem data={item} dispatch={dispatch}/>
          </List.Item>
        )}/>
    );
  }
}
