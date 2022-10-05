import fetch from '../../common/fetch';

export function getHeadData(filename, topicId, crypted) {
  return fetch({
    url: '/paper/create/parsePdf',
    params: {
      filename,
      topicId,
      crypted,
    },
  });
}

export function postCreateFile({ topicId, title, alias, authors, extra = { isComplete: false }, crypted }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/add',
    method: 'post',
    data: {
      topicId, title, alias, authors, crypted, extra, userId,
    },
  });
}

export function postCreate({ topicId, title, alias, authors, extra = { isComplete: false } }) {
  const userId = localStorage.getItem('userId');
  return fetch({
    url: '/paper/create/add',
    method: 'post',
    data: {
      topicId, title, alias, authors, extra, userId,
    },
  });
}

export function postUploadPdf({ file, extraData = {} }) {


  const formData = new FormData();
  const { topicId, fileId } = extraData;
  const { name = '' } = file;
  const type = name.split('.').pop();
  formData.append('file', file);
  formData.append('fileId', fileId);
  formData.append('topicId', topicId);
  const userId = localStorage.getItem('userId');
  formData.append('userId', userId);
  formData.append('type', type);
  return fetch({
    url: '/paper/create/processFile',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    } });
}
export function postUploadBib({ file, extraData = {} }) {
  const { name = '' } = file;
  const type = name.split('.').pop();
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = async e => {
      const binary = e.target.result;
      const formData = new FormData();
      formData.append('file', new Blob([ binary ], { type: 'application/pdf' }), name);
      formData.append('type', type);
      Object.keys(extraData).map(key =>
        formData.append(key, extraData[key])
      );
      const userId = localStorage.getItem('userId');
      formData.append('userId', userId);
      fetch({
        method: 'post',
        url: '/paper/create/processFile',
        data: formData,
      }).then(res => resolve(res))
        .catch(e => reject(e));
    };
  });
}


export function postUpdateFileUrl({ file, extraData }) {

  const formData = new FormData();
  const { topicId, fileId } = extraData;
  const userId = localStorage.getItem('userId');
  formData.append('file', file);
  formData.append('fileId', fileId);
  formData.append('userId', userId);
  formData.append('topicId', topicId);
  return fetch({
    url: '/paper/info/updateFile',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    } });
}

export function postUploadTxt({ type, text }) {
  return fetch({
    url: '/pdf/parseTxt',
    method: 'post',
    data: {
      type, text,
    },
  });
}
