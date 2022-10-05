import { getTopic } from './service';
import { postCreateTopic, postDeleteTopic, postUpdateInfo } from './service';
import { message } from 'antd';

export default {
  namespace: 'topic',
  initial: {
    loading: false,
    topicList: [],
    pageInfo: {
      current: 1,
      pageSize: 10,
    },
    topicFormVisible: false,
    topicFilted: false,
    formData: {
      id: null,
      title: '',
      description: '',
    },
    formStatus: 'create',
    breadcrumb: [
      { name: '主题管理',
        link: '/' },
      { name: '我的主题',
        link: '/topic' },
    ],
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  // async action
  asyncs: {
    async getInitTopic(dispatch, getState, payload) {
      const { pageInfo } = getState();
      const { current, pageSize } = pageInfo;
      let name = '';
      if (payload) {
        dispatch('setData', { topicFilted: true });
        name = payload.name || '';
      }
      try {
        dispatch('setData', { loading: true });
        const { rows, total } = await getTopic({ current, pageSize, name });
        dispatch('setData', { loading: false, pageInfo: { ...pageInfo, total },
          topicList: rows,
        });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async deleteTopic(dispatch, getState, payload) {
      const { id: topicId } = payload;
      try {
        dispatch('setData', { loading: true });
        const r = await postDeleteTopic({ topicIds: [ topicId ] });
        dispatch('setData', { loading: false });
        message.success(r);
        dispatch('getInitTopic');
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async createTopic(dispatch, getState, payload) {
      const { name, description } = payload;
      try {
        dispatch('setData', { loading: true });
        const r = await postCreateTopic({ name, description });
        dispatch('setData', { loading: false });
        message.success(r);
        dispatch('getInitTopic');
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async updateTopic(dispatch, getState, payload) {
      const { name, description, id: topicId } = payload;
      try {
        dispatch('setData', { loading: true });
        const r = await postUpdateInfo({ name, description, topicId });
        dispatch('setData', { loading: false });
        message.success(r);
        dispatch('getInitTopic');
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
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login.html';
    }
    dispatch('getInitTopic');
  },
};
