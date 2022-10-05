import { PureComponent } from 'react';
import { Modal } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import store from './store';
import GroupLibrary from './component/group-library';
import LibraryHub from './component/library-hub';
import DocForm from './component/doc-form';
import './index.less';
import CommentList from './component/comment-list';

@pageWrapper({ store })
class Library extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const { params } = this.props.match;
    let { mode } = this.props;
    // url判断mode
    if (params.topicId) {
      mode = 'deleteFromTopic';
      dispatch('setData', { topicId: params.topicId });
      dispatch('topicDoc');
    }
    if (!params.topicId && this.props.match.path === '/library') {

      mode = 'related';
      dispatch('setData', { libraryList: [] });
      dispatch('getRelated');
    }
    if (this.props.match.path === '/libraryHub') {
      mode = 'search';
      dispatch('searchDoc');
    }
    dispatch('setData', { mode });
    dispatch('setBreadcrumbList', mode);
  }

  render() {
    const { dispatch, libraryList, commentList, pageInfo, commentPageInfo, selectable, selectedRowKeys, mode, showUpdate, showAdd, showComment, tuple, topicId, breadcrumbList } = this.props;
    return <PageContainer breadcrumb={breadcrumbList}>
      { (mode === 'deleteFromTopic' || mode === 'add2Topic') && <GroupLibrary libraryList={libraryList} pageInfo={pageInfo}
        selectable={selectable} selectedRowKeys={selectedRowKeys} dispatch={dispatch} mode={mode} topicId={topicId} /> }
      { (mode === 'related' || mode === 'search') && <LibraryHub libraryList={libraryList} pageInfo={pageInfo}
        dispatch={dispatch} mode={mode}/> }
      {
        (showAdd || showUpdate) && <Modal
          title={(showUpdate && '更新文献') || (showAdd && '添加文献')}
          visible={true}
          footer={null}
          onCancel={() => {
            dispatch('setData', { showUpdate: false, showAdd: false, tuple: null });
          }}>
          <DocForm dispatch={dispatch} tuple={tuple} />
        </Modal>
      }
      {
        <CommentList
          visible={ showComment }
          dispatch={dispatch}
          commentList={commentList}
          commentPageInfo={commentPageInfo}
          onCancel={() => {
            dispatch('setData', { showComment: false, commentDocId: -1, comment: '', commentPageInfo: { ...this.props.commentPageInfo, current: 1 } });
          }}
        />
      }
    </PageContainer>;
  }
}

export default Library;
