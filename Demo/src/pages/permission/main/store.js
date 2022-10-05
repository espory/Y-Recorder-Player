// import { getAll } from './service';
// import { postCreatePermission } from './service';
// import { message } from 'antd';

// export default {
//   namespace: 'permission',
//   initial: {
//     loading: false,
//     breadcrumb: [
//       { name: '权限管理',
//         link: '/permission' },
//       { name: '我的权限',
//         link: '/permission' },
//     ],
//     pageInfo: {
//       current: 1,
//       pageSize: 10,
//     },
//     permissionList: [],
//     permissionFormVisible: false,
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
//         const mergedDic = await getAll();
//         dispatch('setData', {
//           loading: false,
//           permissionList: Object.keys(mergedDic).map(key => {
//             return {
//               ...mergedDic[key],
//               code: key,
//             };
//           }) });
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     async createPermission(dispatch, getState, payload) {
//       try {
//         const { name } = payload;
//         dispatch('setData', { loading: true });
//         const r = await postCreatePermission({ name });
//         message.success(r);
//         dispatch('getAllPermission');
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
