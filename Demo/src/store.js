import { getMyInfo } from './pages/my-info/service';
import { FILES_HOST } from './common/fetch';
import { logout } from './entry/login/service';
export default {
  initial: {
    loading: false,
    notificationList: [{ name: '蓝翔技校', content: '周报勿忘周报勿忘周报勿忘周报勿忘周报勿忘', avatar: 'User' }, { name: '蓝翔技校', content: '周报勿忘1' }, { name: '蓝翔技校', content: '周报勿忘' }],
    notificationVisible: false,
    avatarPreview: null,
    name: '',
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
    async getUserInfo(dispatch) {
      try {
        dispatch('setData', { loading: true });
        const myInfo = await getMyInfo();
        dispatch('setData', {
          name: myInfo.name,
          loading: false,
          avatarPreview: myInfo.avatar.link ? FILES_HOST + '/' + myInfo.avatar.link : '',
        });
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      try {
        await logout();
      } catch (e) {
        console.log(e);
      } finally {
        console.log('change to /login');
        window.location.href = '/login.html';
      }
    },
    async toMyInfo(dispatch, getState, payload) {
      const { routeHistory } = payload;
      routeHistory.push('/showInfo');
    },

  },
  /**
   * 初始化请求
   * @param {Function} dispatch dispatch方法
   * @param {Function} getState 获取当前页面store
   * @param {Object} payload dispatch参数
   */
  async setup(dispatch, getState, payload) { // eslint-disable-line
    // dispatch('getUserInfo');
  },
};
