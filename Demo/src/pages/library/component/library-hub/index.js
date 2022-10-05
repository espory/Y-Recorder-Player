import { PureComponent } from 'react';
import { Input, Button, Space } from 'antd';
import DocList from '../doc-list';
import './index.less';
// import CommentList from './component/comment-list';

const { Search } = Input;

// mode: show(default) or search
class LibraryHub extends PureComponent {
  componentDidMount() {

  }
  onSearch = title => {
    const { dispatch, mode, pageInfo } = this.props;
    const { pageSize = 10 } = pageInfo;
    if (mode === 'search') dispatch('searchDoc', { title, current: 1, pageSize });
    if (mode === 'related') dispatch('getRelated', { title, current: 1, pageSize });
  }
  render() {
    const { dispatch, libraryList, pageInfo, mode } = this.props;

    return <>
      <div className={'table-head'}>
        <Space className="left">
          <Search className="search-box"
            placeholder={mode === 'related' ? '搜索我的文献' : '搜索文献库'}
            onSearch={this.onSearch}/>
        </Space>
        <Button type="primary" onClick={() => {
          dispatch('setData', { showAdd: true, tuple: null });
        }}>新增文献</Button>
      </div>
      < DocList libraryList={libraryList} pageInfo={pageInfo} selectable={false} dispatch={dispatch} mode={mode}/>
    </>;
  }
}

export default LibraryHub;
