import fetch from '../../common/fetch';
import { FILES_HOST } from '../../common/fetch';
export function getLib({ topicId, deleted }) {
  return fetch({
    url: '/topic/library/getDocsByTopicId',
    params: {
      topicId,
      deleted: deleted ? 1 : 0,
    },
  });
}

// // 获取思维导图tag层次结构
// export function getMindmapStruct({ topicId }) {
//   return fetch({
//     url: '/topic/mindmap/get',
//     params: {
//       topicId,
//     },
//   });
// }
// export function updateMindmap({ topicId, mindmap }) {
//   return fetch({
//     url: '/topic/mindmap/update',
//     method: 'post',
//     data: {
//       topicId,
//       mindmap,
//     },
//   });
// }


export function completeBasicInfo({ fileIds }) {
  return fetch({
    url: '/paper/create/completeBasicInfo',
    method: 'post',
    data: {
      fileIds,
    },
    timeout: 20000,
  });
}

export function completeInfo({ fileId, title, topicId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/completeInfo',
    method: 'post',
    data: {
      userId,
      topicId,
      fileId,
      title,
    },
    timeout: 20000,
  });
}

export function completeFileUrl({ fileIds, topicId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/completeFileUrl',
    method: 'post',
    data: {
      fileIds,
      topicId,
      userId,
    },
    timeout: 70000,
  });
}

export function getDownLoadAttachmentFile(attachment_url) {
  window.location.href = `${FILES_HOST}/file/download?url=${attachment_url}`;
}
export function postCreateFile({ topicId, title, alias, authors, extra = { isComplete: false } }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/add',
    method: 'post',
    data: {
      userId,
      topicId,
      title,
      alias,
      authors,
      extra,
    },
  });
}
export function postDeleteFiles({ topicId, ids }) {
  return fetch({
    url: '/topic/trash/delete',
    method: 'post',
    data: {
      topicId,
      fileIds: ids,
    },
  });
}

export function postClearAll({ topicId }) {
  return fetch({
    url: '/topic/trash/clearAll',
    method: 'post',
    data: {
      topicId,
    },
  });
}
export function postMoveFiles({ topicId, ids, deleted }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/trash/move',
    method: 'post',
    data: {
      userId,
      topicId,
      fileIds: ids,
      deleted: deleted ? 1 : 0,
    },
  });
}

export function postUploadAttachment({ files, fileId, topicId }) {
  const userId = localStorage.getItem('userId');
  const formData = new FormData();
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    formData.append('file', file);
  }
  formData.append('fileId', fileId);
  formData.append('topicId', topicId);
  formData.append('userId', userId);
  return fetch({
    url: '/paper/info/attachment/create',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    } });
}

export function postUpdateFile({ fileId, topicId, title, alias, authors, fileUrl, tags, mark, extra }) {
  if (Array.isArray(tags)) {
    tags = JSON.stringify(tags);
  }
  if (typeof authors === 'string') {
    authors = authors.split(' and ');
  }
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/update',
    method: 'post',
    data: {
      userId,
      topicId,
      fileId,
      title,
      authors,
      alias,
      fileUrl,
      tags,
      mark,
      extra,
    },
  });
}

export function postGetBibTexAndMla({ fileId, fileIds = [] }) {
  if (fileId) {
    fileIds.push(fileId);
  }
  return fetch({
    url: '/paper/info/reference/getBibTexAndMla',
    method: 'post',
    data: {
      fileIds,
    },
  });
}
// export function postGetFileStatus(targets) {
//   return fetch({
//     url: '/topic/library/getFileStatus',
//     method: 'post',
//     data: {
//       targets,
//     },
//   });
// }
export function postCreateComment({ fileId, comment }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/create',
    method: 'post',
    data: {
      userId,
      fileId,
      comment,
    },
  });
}
export function postUpdateComment({ commentId, comment }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/update',
    method: 'post',
    data: {
      userId,
      commentId,
      comment,
    },
  });
}
export function postUpdateCommentFileId({ fileId, commentId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/updateFileId',
    method: 'POST',
    data: {
      userId,
      fileId,
      commentId,
    },
  });
}
export function getGetComment({ topicId, fileId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/info/comment/get',
    params: {
      userId,
      topicId,
      fileId,
    },
  });
}
export function deleteCommentById({ topicId, fileId, commentId }) {
  return fetch({
    url: '/paper/info/comment/delete',
    params: {
      topicId,
      fileId,
      commentId,
    },
  });
}
// export function getGetTimeline({ topicId, from, to, field }) {
//   const userId = localStorage.getItem('userId');
//   return fetch({
//     url: '/topic/timeline/get',
//     params: {
//       userId,
//       topicId,
//       from,
//       to,
//       field,
//     },
//   });
// }

export function postClearFileUrl({ topicId, fileId }) {
  return fetch({
    url: '/paper/info/clearFile',
    method: 'post',
    data: {
      topicId,
      fileId,
    },
  });
}

export function postClearAttachment({ file_id, attachment_url }) {
  return fetch({
    url: '/paper/info/attachment/delete',
    method: 'post',
    data: {
      fileId: file_id,
      attachmentUrl: attachment_url,
    },
  });
}

// 个人设置
export function getGetSettings({ topicId }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/settings/get',
    params: {
      userId,
      topicId,
    },
  });
}
export function postUpdateSettings({ topicId, settings }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/topic/settings/update',
    method: 'post',
    data: {
      userId,
      topicId,
      settings,
    },
  });
}

// 预检测bib文件格式是否有问题，返回符合规范的文件列表
export function postfilePreDetection({ bibEntry }) {
  return fetch({
    url: '/paper/create/bibPreDetection',
    method: 'post',
    data: {
      bibEntry,
    },
  });
}
