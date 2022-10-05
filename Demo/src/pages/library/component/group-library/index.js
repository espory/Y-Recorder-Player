import { PureComponent } from 'react';
import { Input, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import DocList from '../doc-list';
import './index.less';
// mode: deleteFromGroup(default) or add2Group

const { Search } = Input;
class GroupLibrary extends PureComponent {
  componentDidMount() {

  }
  onSearch = title => {
    const { dispatch, mode, pageInfo } = this.props;
    const { pageSize = 10 } = pageInfo;
    if (mode === 'add2Group') {
      dispatch('searchDoc', { title, current: 1, pageSize });
    }
    if (mode === 'deleteFromGroup') {
      dispatch('topicDoc', { title, current: 1, pageSize });
    }
  }

  addDocs = async () => {
    const { dispatch, selectedRowKeys, topicId, pageInfo } = this.props;
    const { pageSize = 10 } = pageInfo;
    await dispatch('addDocs', { docIds: selectedRowKeys });
    dispatch('topicDoc', { topicId, current: 1, pageSize });
  }

  goBack = () => {
    const { dispatch, mode } = this.props;
    if (mode === 'add2Group') {
      dispatch('setData', { mode: 'deleteFromGroup', selectedRowKeys: [] });
      dispatch('topicDoc');
    }
  }

  render() {
    const { dispatch, libraryList, pageInfo, selectable, selectedRowKeys, mode, topicId } = this.props;

    return <>
      <div className={'table-head'}>
        <Space className="left">
          <Search className="search-box"
            placeholder={mode === 'add2Group' ? '搜索文献库' : '组内搜索'}
            onSearch={this.onSearch} />
          {
            mode === 'add2Group' && <>
              <div>
                <Button type="primary" disabled={selectedRowKeys.length === 0} onClick={this.addDocs}>添加</Button>
                <span
                  style={{ marginLeft: 8 }}>{(selectedRowKeys.length !== 0) ? `选择了 ${selectedRowKeys.length} 条` : ''}</span>
              </div>
            </>
          }
        </Space>
        <Space>
          {
            mode === 'deleteFromGroup' && <Button type="primary" onClick={() => {
              dispatch('setData', { mode: 'add2Group', libraryList: [] });
              dispatch('searchDoc', { current: 1, pageSize: pageInfo.pageSize });

            }}>添加文献</Button>
          }
          <Button type="primary" onClick={() => {
            dispatch('setData', { showAdd: true, tuple: { topicId } });
          }
          }>新增文献</Button>
        </Space>
      </div>
      < DocList libraryList={libraryList} pageInfo={pageInfo} selectable={selectable} selectedRowKeys={selectedRowKeys}
        dispatch={dispatch} mode={mode} />
      <div className="bottom">
        <Button style={{ marginTop: 5 + 'px' }} type="primary" onClick={this.goBack}>{mode === 'deleteFromGroup' && <Link to='/topic'>返回</Link>}{mode === 'add2Group' && '返回'}</Button>
      </div>
    </>;
  }
}

export default GroupLibrary;
