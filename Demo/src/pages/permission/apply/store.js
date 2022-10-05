// import { getAll } from './service';

// export default {
//   namespace: 'apply_permission',
//   initial: {
//     loading: false,
//     breadcrumb: [
//       { name: '权限管理',
//         link: '/permission' },
//       { name: '申请权限',
//         link: '/permission/apply' },
//     ],
//     pageInfo: {
//       current: 1,
//       pageSize: 10,
//     },
//     permissionList: [],
//   },

//   reducers: {
//     setData(state, payload) {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },

//   // async action
//   asyncs: {
//     async getAllPermission(dispatch) {
//       try {
//         dispatch('setData', { loading: true });
//         const r = await getAll();
//         dispatch('setData', { loading: false, permissionList: r });
//       } catch (e) {
//         console.log(e);
//       }
//     },
//   },
//   /**
//    * 初始化请求
//    * @param {Function} dispatch dispatch方法
//    * @param {Function} getState 获取当前页面store
//    * @param {Object} payload dispatch参数
//    */
//   async setup(dispatch, getState, payload) { // eslint-disable-line
//     dispatch('getAllPermission');
//   },
// };
