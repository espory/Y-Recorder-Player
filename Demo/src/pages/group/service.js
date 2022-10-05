import fetch from '../../common/fetch';

export function getSubbedGroup({ current, pageSize }) {
  return fetch({
    url: '/group/getSubbedGroup',
    params: {
      current: current - 1,
      pageSize,
    },
  });
}

export function getCreatedGroup({ current, pageSize }) {
  return fetch({
    url: '/group/getCreatedGroup',
    params: {
      current: current - 1,
      pageSize,
    },
  });
}

export function getSearchGroup({ current, pageSize, groupTitle }) {
  return fetch({
    url: '/group/search',
    params: {
      current: current - 1,
      pageSize,
      groupTitle,
    },
  });
}

export function postCreateGroup(groupData) {
  return fetch({
    url: '/group/create',
    method: 'post',
    data: groupData,
  });
}

export function postUpdateGroup(groupData) {
  return fetch({
    url: '/group/updateInfo',
    method: 'post',
    data: groupData,
  });
}

export function postDeleteGroup(delGroupId) {
  return fetch({
    url: '/group/destroy',
    method: 'post',
    data: delGroupId,
  });
}

export function postSubscribeGroup(subGroupId) {
  return fetch({
    url: '/group/subscribe',
    method: 'post',
    data: subGroupId,
  });
}

export function postUnsubscribeGroup(unsubGroupId) {
  return fetch({
    url: '/group/unSubscribe',
    method: 'post',
    data: unsubGroupId,
  });
}
