// import fetch from '../../common/fetch';

// // 创建或更新个人主页设置
// export function postHomepageSetting(homepageData) {
//   const userId = localStorage.getItem('userId');
//   return fetch({
//     url: '/homepage/update',
//     method: 'post',
//     data: { ...homepageData, userId },
//   });
// }

// // 根据用户id获取个人主页信息
// export function getHomepageSetting() {
//   const userId = localStorage.getItem('userId');
//   return fetch({
//     url: '/homepage/info',
//     method: 'get',
//     params: {
//       userId,
//     },
//   });
// }
