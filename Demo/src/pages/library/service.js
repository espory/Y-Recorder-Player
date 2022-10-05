import fetch from '../../common/fetch';


export function getDocsBySearch({ title = '', current, pageSize }) {
  let url = '/topic/library/getDocsByFullTextSearch';
  if (title.length < 3) {
    url = '/topic/library/getDocsBySearch';
  }
  return fetch({
    url,
    params: {
      title,
      current: current - 1,
      pageSize,
    },
  });
}

export function getDocsByTopicId(params) {
  return fetch({
    url: '/topic/library/getDocsByTopicId',
    params: {
      ...params,
      current: params.current - 1,
    },
  });
}

export function getCommentsByDocId({ commentDocId, current, pageSize }) {
  return fetch({
    url: '/paper/info/comment/getComment',
    params: {
      docId: commentDocId,
      current: current - 1,
      pageSize,
    },
  });
}

export function addDocs2Group({ groupId, docIds }) {
  return fetch({
    url: '/Topic/addDocs2Group',
    method: 'POST',
    data: {
      groupId,
      docIds,
    },
  });
}

export function addComment2Doc({ commentDocId, docComment }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/create',
    method: 'POST',
    data: {
      userId,
      fileId: commentDocId,
      comment: docComment,
    },
  });
}

export function removeDocsFromGroup({ groupId, docIds }) {
  return fetch({
    url: '/Topic/removeDocsFromGroup',
    method: 'POST',
    data: {
      groupId,
      docIds,
    },
  });
}

export function update({ id, authors, editors, type, year, title }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/update',
    method: 'POST',
    data: {
      userId,
      docId: id,
      authors,
      editors,
      type,
      year,
      title,
    },
  });
}

export function create({ authors, editors, type, year, title, alias, topicId, extra = { isComplete: false } }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/add',
    method: 'POST',
    data: {
      userId,
      authors,
      editors,
      type,
      year,
      title,
      alias,
      topicId,
      extra,
    },
  });
}
export function getRelated(params) {
  return fetch({
    url: '/topic/library/getRelated',
    params: {
      ...params,
      current: params.current - 1,
    },
  });
}

export function getComment({ docId, current, pageSize }) {
  return fetch({
    url: '/paper/info/comment/getComment',
    params: {
      docId,
      current: current - 1,
      pageSize,
    },
  });
}

export function updateComment({ commentId, comment }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/update',
    method: 'POST',
    data: {
      userId,
      commentId,
      comment,
    },
  });
}

