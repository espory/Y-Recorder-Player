import fetch from '../../common/fetch';

export function register({ name, mail, password }) {
  console.log({ name, mail, password });
  return fetch({
    url: '/user/register',
    method: 'post',
    data: {
      name,
      mail,
      password,
    },
  });
}
