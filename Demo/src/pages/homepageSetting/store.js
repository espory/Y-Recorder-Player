// import { getHomepageSetting, postHomepageSetting } from './service';

// export default {
//   namespace: 'homepageSetting',
//   initial: {
//     loading: false,
//     phone_number: '',
//     email: '',
//     work_place: '',
//     content: '',
//     homepage_id: '-1',
//     markdown_theme: 'default',
//     code_theme: 'default',
//     motto: '',
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
//     async initHomepageSetting(dispatch) {
//       try {
//         dispatch('setData', { loading: true });
//         const resp = await getHomepageSetting();
//         if (!resp) {
//           console.log('该用户还未创建个人主页');
//         } else {
//           const { homepage } = resp;
//           const { id, phone_number, email, work_place, content, motto, code_theme, markdown_theme } = homepage;
//           dispatch('setData', { phone_number, email, work_place, content, motto, code_theme, markdown_theme, homepage_id: id });
//         }
//       } catch (e) {
//         console.log(e);
//       } finally {
//         dispatch('setData', { loading: false });
//       }
//     },
//     async postHomepageSetting(dispatch, getState, payload) {
//       let ok = false;
//       try {
//         dispatch('setData', { loading: true });
//         console.log(payload);
//         const resp = await postHomepageSetting(payload);
//         if (resp.hasOwnProperty('homepage_id')) {
//           console.log('个人主页更新成功');
//           dispatch('setData', { homepage_id: resp.homepage_id, ...payload });
//           ok = true;
//         } else {
//           console.log('个人主页更新失败');
//         }
//       } catch (e) {
//         console.log(e);
//       } finally {
//         dispatch('setData', { loading: false });
//       }
//       return ok;
//     },
//   },
//   /**
//    * 初始化请求
//    * @param {Function} dispatch dispatch方法
//    * @param {Function} getState 获取当前页面store
//    * @param {Object} payload dispatch参数
//    */
//   async setup(dispatch, getState, payload) { // eslint-disable-line
//     await dispatch('initHomepageSetting');
//   },
// };
