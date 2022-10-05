import { getDocsBySearch, getDocsByTopicId, getCommentsByDocId, update, create, addDocs2Topic, addComment2Doc, removeDocsFromTopic, getRelated } from './service';
import { message } from 'antd';

const breadcrumbList = {
  related: [{
    name: '文献管理',
    link: '/library',
  }, {
    name: '我的文献',
    link: '/library',
  }],
  deleteFromTopic: [{
    name: '群组管理',
    link: '/topic',
  }, {
    name: '我的群组',
    link: '/topic',
  }, {
    name: '群组文献',
    link: '/topic/library/',
  }],
  search: [{
    name: '文献管理',
    link: '/library',
  }, {
    name: '文献库',
    link: '/library',
  }],
};
export default {
  namespace: 'library',
  initial: {
    loading: false,
    pageInfo: {
      current: 1,
      pageSize: 2,
    },
    commentPageInfo: {
      total: 0,
      current: 1,
      pageSize: 4,
    },
    libraryList: null,
    commentList: null,
    selectable: false,
    selectedRowKeys: [],
    mode: 'related', // related add2topic deleteFromtopic search,
    showUpdate: false,
    showAdd: false,
    showComment: false,
    tuple: {},
    docComment: '',
    topicId: -1,
    showComments: false,
    breadcrumbList: breadcrumbList.related,
    commentDocId: -1,
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setBreadcrumbList(state, payload) {
      console.log(breadcrumbList);
      return {
        ...state,
        breadcrumbList: breadcrumbList[payload],
      };
    },
  },

  // async action
  asyncs: {
    async searchDoc(dispatch, getState, payload) {
      const { pageInfo } = getState();
      const { title = '' } = payload || {};
      const { current, pageSize } = { ...pageInfo, ...payload };
      try {
        dispatch('setData', { loading: true });
        let { rows, total } = await getDocsBySearch({ current, pageSize, title });
        rows = rows.map(row => {
          return {
            ...row,
            key: row.id,
            commentLength: row.comment_list.split(',').length - 1,
          };
        });
        const { mode } = getState();
        if (mode === 'search' || mode === 'add2Topic') {
          dispatch('setData', { loading: false, pageInfo: { current, pageSize, total, title }, libraryList: rows });
        }
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async pageChange(dispatch, getState, payload) {
      if (typeof (payload.title) !== 'undefined') { dispatch('searchDoc', payload); }
      if (payload.topicId) { dispatch('topicDoc', payload); }
      if (payload.related) { dispatch('getRelated', payload); }
    },
    async commentPageChange(dispatch, getState) {
      const { commentDocId } = getState();
      dispatch('getCommentData', { commentDocId });
    },
    async topicDoc(dispatch, getState, payload) {
      const { topicId } = { ...getState(), ...payload };
      if (topicId === -1) {
        console.log('No topic Id');
        return;
      }
      const { pageInfo } = getState();
      const { current, pageSize } = { ...pageInfo, ...payload };
      try {
        dispatch('setData', { loading: true });
        let { rows, total } = await getDocsByTopicId({ topicId, ...pageInfo, ...payload });
        rows = rows.map(row => {
          return {
            key: row.id,
            ...row,
          };
        });
        const newBreadcrumbList = breadcrumbList.deleteFromTopic.map(item => { return { ...item }; });
        newBreadcrumbList[newBreadcrumbList.length - 1].link += topicId;
        if (getState().mode === 'deleteFromTopic') {
          dispatch('setData', {
            loading: false,
            pageInfo: { current, pageSize, total, topicId },
            libraryList: rows,
            breadcrumbList: newBreadcrumbList,
          });
        }
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getCommentData(dispatch, getState, payload) {
      const { commentDocId } = payload;
      dispatch('setData', { loading: true, commentDocId });
      const { commentPageInfo } = getState();
      const { current, pageSize } = { ...commentPageInfo };
      const { rows, total } = await getCommentsByDocId({ commentDocId, current, pageSize });
      dispatch('setData', { loading: false, showComment: true, commentPageInfo: { ...commentPageInfo, total }, commentList: rows });
    },
    async updateDoc(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        await update(payload);
        message.success('修改成功');
        const { libraryList } = getState();
        payload.authors = payload.authors.join(' and ');
        payload.editors = payload.editors.join(' and ');
        libraryList.forEach((item, index) => {
          if (item.id === payload.id) {
            payload.key = payload.id;
            libraryList[index] = payload;
          }
        });
        dispatch('setData', { loading: false, libraryList: libraryList.map(item => {
          return item;
        }), showUpdate: false, tuple: null });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async createDoc(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        await create(payload);
        message.success('创建成功');
        const { mode } = getState();
        if (mode === 'related') {
          await dispatch('getRelated');
        }
        dispatch('setData', { loading: false, showAdd: false, tuple: null });
        await dispatch('topicDoc');
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async createComment(dispatch, getState, payload) {
      try {
        const { commentDocId, docComment } = getState();
        const { resetField } = payload;
        await addComment2Doc({ commentDocId, docComment });
        message.success('创建评论成功');
        resetField();
        dispatch('getCommentData', { commentDocId });
      } catch (e) {
        console.error(e);
      }
    },
    async createAndAddDoc(dispatch, getState, payload) {
      try {
        const { libraryList } = getState();
        dispatch('setData', { loading: true });
        const response = await create(payload);
        message.success('创建成功');
        if (response.id) {
          await addDocs2Topic({ topicId: payload.topicId, docIds: [ response.id ] });
          message.success('添加成功');
        }
        const list = libraryList.slice();
        response.key = response.id;
        list.push(response);
        dispatch('setData', { loading: false, libraryList: list, showAdd: false, tuple: null });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async addDocs(dispatch, getState, payload) {
      try {
        const { topicId } = getState();
        dispatch('setData', { loading: true });
        await addDocs2Topic({ ...payload, topicId });
        message.success('添加成功');
        dispatch('setData', { loading: false, mode: 'deleteFromTopic', selectedRowKeys: [] });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async removeDocs(dispatch, getState, payload) {
      try {
        const { topicId, libraryList } = getState();
        dispatch('setData', { loading: true });
        await removeDocsFromTopic({ ...payload, topicId });
        message.success('移除成功');
        const list = [];
        libraryList.forEach(item => {
          if (payload.docIds.indexOf(item.id) === -1) { list.push(item); }
        });
        dispatch('setData', { loading: false, libraryList: list });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getRelated(dispatch, getState, payload) {
      const { pageInfo } = getState();
      const { current, pageSize } = { ...pageInfo, ...payload };
      try {
        dispatch('setData', { loading: true });
        let { rows, total } = await getRelated({ ...pageInfo, ...payload });
        rows = rows.map(row => {
          return {
            ...row,
            key: row.id,
            commentLength: row.comment_list.split(',').length - 1,
          };
        });
        if (getState().mode === 'related') {
          dispatch('setData', { loading: false, pageInfo: { current, pageSize, total, related: true }, libraryList: rows });
        }
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
  },

  /**
   * 初始化请求
   * @param {Function} dispatch dispatch方法
   * @param {Function} getState 获取当前页面store
   * @param {Object} payload dispatch参数
   */
  async setup(dispatch, getState, payload) { // eslint-disable-line
  },
};
