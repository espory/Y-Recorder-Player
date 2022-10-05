import fetch from '../../common/fetch';

export function getTopic({ name }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/info/get',
    params: {
      userId,
      name,
    },
  });
}

export function postCreateTopic({ name, description }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/info/create',
    method: 'post',
    data: {
      userId,
      name,
      description,
    },
  });
}

export function postUpdateInfo({ name, description, topicId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/info/updateInfo',
    method: 'post',
    data: {
      userId,
      name,
      description,
      topicId,
    },
  });
}

export function postDeleteTopic({ topicIds }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/info/destroy',
    method: 'post',
    data: {
      userId,
      topicIds,
    },
  });
}
