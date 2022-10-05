import fetch from '../../common/fetch';

export function login({ name, password }) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      name,
      password,
    },
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post',
  });
}
