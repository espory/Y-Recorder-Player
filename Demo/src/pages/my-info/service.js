import fetch from '../../common/fetch';

export function getMyInfo() {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/user/info/myInfo',
    method: 'POST',
    data: {
      userId,
    },
  });
}

export function updateMyInfo(values) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/user/info/updateMyInfo',
    method: 'POST',
    data: {
      ...values,
      userId,
    },
  });
}

export function updatePwd(values) {
  return fetch({
    url: '/user/info/updatePwd',
    method: 'POST',
    data: {
      ...values,
    },
  });
}

export function getSystemAvatars() {
  return fetch({
    url: '/user/avatar/system',
  });
}

export function changeSystemAvatar(avatarId) {
  const user = JSON.parse(localStorage.getItem('user'));
  return fetch({
    url: '/user/avatar/systemUpdate',
    method: 'POST',
    data: {
      avatarId,
      user,
    },
  });
}

export function changeCustomAvatar(payload) {
  return fetch({
    url: '/user/avatar/customUpdate',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload,
  });
}
