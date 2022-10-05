import { getSubbedGroup, getCreatedGroup, getSearchGroup } from './service';
import { postSubscribeGroup, postUnsubscribeGroup } from './service';
import { postDeleteGroup, postCreateGroup, postUpdateGroup } from './service';


export default {
  namespace: 'group',
  initial: {
    loading: false,
    type: 'search',
    searchGroupPageInfo: {
      groupTitle: '',
      current: 1,
      pageSize: 10,
    },
    subGroupPageInfo: {
      current: 1,
      pageSize: 10,
    },
    createdGroupPageInfo: {
      current: 1,
      pageSize: 10,
    },
    searchGroupList: [],
    subGroupList: [],
    createdGroupList: [],
    groupFormVisible: false,
    formData: {
      id: -1,
      title: '',
      description: '',
    },
    formStatus: 'create',
    breadcrumbList: [{
      name: '群组管理',
      link: '/group',
    }, {
      name: '我的群组',
      link: '/group',
    }],
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setFormData(state, payload) {
      return {
        ...state,
        formData: payload,
      };
    },
    setSearchGroup(state, payload) {
      return {
        ...state,
        searchGroupPageInfo: {
          ...state.searchGroupPageInfo,
          groupTitle: payload,
        },
      };
    },
    setType(state, payload) {
      return {
        ...state,
        type: payload,
      };
    },
    showGroupForm(state, payload) {
      const ret = {
        ...state,
        groupFormVisible: true,
        formStatus: payload,
        formData: {
          id: -1,
          title: '',
          description: '',
        },
      };
      return ret;
    },
    hideGroupForm(state) {
      return {
        ...state,
        groupFormVisible: false,
      };
    },
    addBreadcrumbList(state, payload) {
      state.breadcrumbList.push(payload);
      return {
        ...state,
        breadcrumbList: state.breadcrumbList.slice(),
      };
    },
  },

  // async action
  asyncs: {
    async getSubData(dispatch, getState) {
      const { subGroupPageInfo } = getState();
      const { current, pageSize } = subGroupPageInfo;
      try {
        dispatch('setData', { loading: true });
        const { rows, total } = await getSubbedGroup({ current, pageSize });

        dispatch('setData', { loading: false, subGroupPageInfo: { ...subGroupPageInfo, total },
          subGroupList: rows.map(item => {
            return { ...item,
              name: item.user.name,
            };
          }),
        });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getCreatedData(dispatch, getState) {
      const { createdGroupPageInfo } = getState();
      const { current, pageSize } = createdGroupPageInfo;
      try {
        dispatch('setData', { loading: true });
        const { rows, total } = await getCreatedGroup({ current, pageSize });
        dispatch('setData', { loading: false, createdGroupPageInfo: { ...createdGroupPageInfo, total },
          createdGroupList: rows.map(item => {
            return { ...item,
              name: item.user.name,
            };
          }),
        });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getSearchData(dispatch, getState) {
      const { searchGroupPageInfo } = getState();
      const { current, pageSize, groupTitle } = searchGroupPageInfo;
      try {
        dispatch('setData', { loading: true });
        const { rows, total } = await getSearchGroup({ current, pageSize, groupTitle });
        dispatch('setData', { loading: false, searchGroupPageInfo: { ...searchGroupPageInfo, total },
          searchGroupList: rows.map(item => {
            return { ...item,
              name: item.user.name,
            };
          }),
        });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getListData(dispatch, getState) {
      try {
        const { type } = getState();
        // eslint-disable-next-line default-case
        switch (type) {
          case 'search': {
            dispatch('getSearchData');
            break;
          }
          case 'sub': {
            dispatch('getSubData');
            break;
          }
          case 'created': {
            dispatch('getCreatedData');
            break;
          }
        }
      } catch (e) {
        console.table(e);
      }
    },
    async createGroup(dispatch, getState, payload) {
      try {
        const result = await postCreateGroup(payload);
        if (result) {
          dispatch('getListData');
        }
      } catch (e) {
        console.error(e);
      }
    },
    async updateGroup(dispatch, getState, payload) {
      try {
        const val = { ...payload, groupId: payload.id };
        await postUpdateGroup(val);
        dispatch('hideGroupForm');
        dispatch('getListData');
      } catch (e) {
        console.error(e);
      }
    },
    async deleteGroup(dispatch, getState, payload) {
      try {
        const val = { groupIds: [ payload ] };
        await postDeleteGroup(val);
        dispatch('getCreatedData');
      } catch (e) {
        console.error(e);
      }
    },
    async subscribeGroup(dispatch, getState, payload) {
      try {
        const val = { groupId: payload };
        await postSubscribeGroup(val);
        dispatch('getSearchData');
      } catch (e) {
        console.error(e);
      }
    },
    async unsubscribeGroup(dispatch, getState, payload) {
      try {
        const val = { groupId: payload };
        await postUnsubscribeGroup(val);
        dispatch('getSearchData');
        dispatch('getSubData');
      } catch (e) {
        console.error(e);
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
    dispatch('getSearchData');
    dispatch('getSubData');
    dispatch('getCreatedData');
  },
};
