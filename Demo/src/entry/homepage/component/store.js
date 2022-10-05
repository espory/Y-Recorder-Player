// import { getHomepageByHomepageId } from './service';
// import { getQueryVariable } from '../../../common/utils';
// import { message } from 'antd';

// /*
//   依据markdown标题内容解析目录结构，方便用户索引
//  */

// // 将标题插入目录树中
// function insertToIndexes(indexes, level, title) {
//   let current = indexes,
//     clvl = 1;
//   const lvlPath = [];
//   while (clvl < level) {
//     if (current.length === 0) {
//       lvlPath.push(0);
//       current.push({
//         title,
//         key: lvlPath.join('-'),
//         children: [],
//       });
//       return;
//     }
//     lvlPath.push(current.length - 1);
//     current = current[current.length - 1].children;
//     clvl += 1;
//   }
//   lvlPath.push(current.length);
//   current.push({
//     title,
//     key: lvlPath.join('-'),
//     children: [],
//   });
// }

// // 获取标题
// function getIndexes(content) {
//   const indexes = [];
//   try {
//     // 标题格式为[换行符][n个#][空格][标题名][换行符],所以需要预先将一个\n替换为\n\n
//     content = content.replace(/\n/g, '\n\n');
//     const pat = /\n#+ .*\n/g;
//     const res = ('\n' + content + '\n').match(pat);
//     if (res) {
//       for (let i = 0; i < res.length; i++) {
//         let str = res[i];
//         console.log(str);
//         str = str.trim();
//         let cnt = 0;
//         for (let i = 0; i < str.length; i++) {
//           const c = str[i];
//           if (c === '#') {
//             cnt += 1;
//           } else {
//             break;
//           }
//         }
//         insertToIndexes(indexes, cnt, str.substring(cnt + 1, str.length)
//           .trim());
//       }
//     }
//   } catch (err) {
//     console.log('When parsing markdown, some err happened', err);
//   }
//   return indexes;
// }

// export default {
//   namespace: 'homepage',
//   initial: {
//     loading: false,
//     user: {
//       name: 'Mr.',
//       avatar: {
//         link: '',
//       },
//     },
//     phone_number: '888-8888',
//     email: '3458179@fudan.edu.cn',
//     work_place: 'Fudan University',
//     content: '您还没有更新内容',
//     is404: false,
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
//     async initHomepage(dispatch, getState, payload) {
//       try {
//         dispatch('setData', { loading: true });
//         const resp = await getHomepageByHomepageId(payload);
//         if (resp) {
//           const { user, homepage } = resp;
//           const { phone_number, email, work_place, content, motto, code_theme, markdown_theme } = homepage;
//           // 通过markdown内容获取目录结构
//           const indexes = getIndexes(content);
//           dispatch('setData', { loading: false, user, phone_number, email, work_place, content, indexes, motto, code_theme, markdown_theme });
//         } else {
//           dispatch('setData', { loading: false, is404: true });
//         }
//       } catch (e) {
//         console.log(e);
//         dispatch('setData', { loading: false, is404: true });
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
//     const homepage_id = getQueryVariable().id;
//     // 如果不输入主页id则跳转到登陆页
//     if (!homepage_id) {
//       message.error('请输入跳转主页的id！');
//       message.error('2s后跳转到登陆页');
//       setTimeout(() => {
//         window.location.href = 'login.html';
//       }, 2000);
//     } else {
//       await dispatch('initHomepage', homepage_id);
//     }
//   },
// };
