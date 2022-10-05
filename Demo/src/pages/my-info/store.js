import { getMyInfo, updateMyInfo, updatePwd } from './service';
import { getSystemAvatars, changeSystemAvatar, changeCustomAvatar } from './service';
import { FILES_HOST } from '../../common/fetch';

const breadcrumbLists = {
  showInfo: [
    {
      name: '个人信息管理',
      link: '/showInfo',
    },
    {
      name: '我的信息',
      link: '/showInfo',
    },
  ],
  updateInfo: [
    {
      name: '个人信息管理',
      link: '/showInfo',
    },
    {
      name: '修改个人信息',
      link: '/updateInfo',
    },
  ],
  customAvatar: [
    {
      name: '个人信息管理',
      link: '/showInfo',
    },
    {
      name: '自定义头像',
      link: '/customAvatar',
    },
  ],
  updatePwd: [
    {
      name: '个人信息管理',
      link: '/showInfo',
    },
    {
      name: '修改密码',
      link: '/updatePwd',
    },
  ],
};

export default {
  namespace: 'myInfo',
  initial: {
    loading: false,
    mode: 'showInfo',
    breadcrumbList: breadcrumbLists.showInfo,

    // show info
    avatarPopoverVisible: false,
    systemAvatars: [],
    myInfo: {
      name: '',
      avatar: { link: '' },
      password: '',
      mail: '',
      gender: '',
      birthday: '',
      intro: '',
      stu_num: '',
    },

    // custom avatar
    avatarSelected: false,
    customAvatarName: '',
    avatarPreview: '',
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setBreadcrumbList(state, payload) {
      return {
        ...state,
        breadcrumbList: breadcrumbLists[payload],
      };
    },
  },

  asyncs: {
    // show info
    async getData(dispatch) {
      try {
        dispatch('setData', { loading: true });
        const myInfo = await getMyInfo();
        dispatch('setData', {
          loading: false,
          avatarPreview: myInfo.avatar.link ? FILES_HOST + '/' + myInfo.avatar.link : '',
          myInfo,
        });
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
    async getSystemAvatarsData(dispatch) {
      try {
        const res = await getSystemAvatars();
        dispatch('setData', { systemAvatars: res });
      } catch (e) {
        console.error(e);
      }
    },
    async handleChangeSystemAvatar(dispatch, getState, payload) {
      try {
        const { myInfo } = getState();
        const { avatar } = myInfo;
        if (avatar.id !== payload.id) {
          const newAvatar = await changeSystemAvatar(payload.id);
          const oldUser = localStorage.getItem('user');
          localStorage.setItem('user', { ...oldUser, avatar: { ...newAvatar } });
          await dispatch('setData', {
            myInfo: { ...myInfo, avatar: { ...newAvatar } },
            avatarPopoverVisible: false,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },

    // update info
    async updateData(dispatch, getState, payload) {
      const { myInfo } = getState();
      try {
        dispatch('setData', { loading: true });
        await updateMyInfo(payload);
        await dispatch('setData', {
          loading: false,
          myInfo: { ...myInfo, ...payload },
          mode: 'showInfo',
        });
        await dispatch('setBreadcrumbList', 'showInfo');
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },

    // custom avatar
    async handleChangeCustomAvatar(dispatch, getState, payload) {
      try {
        const { myInfo } = getState();
        const newAvatar = await changeCustomAvatar(payload);
        if (newAvatar) {
          const oldUser = localStorage.getItem('user');
          localStorage.setItem('user', { ...oldUser, avatar: { ...newAvatar } });
          await dispatch('setData', {
            mode: 'showInfo',
            myInfo: { ...myInfo, avatar: { ...newAvatar } },
          });
          await dispatch('setBreadcrumbList', 'showInfo');
        }
      } catch (e) {
        console.error(e);
      }
    },

    // update pwd
    async updatePwd(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        const result = await updatePwd(payload);
        await dispatch('setData', { loading: false });
        return result;
      } catch (e) {
        console.error(e);
        dispatch('setData', { loading: false });
      }
    },
  },

  async setup(dispatch) {
    dispatch('getData');
  },
};
