import { getQueryVariable } from '../../../common/utils';
import { FILES_HOST } from '../../../common/fetch';

export default {
  namespace: 'pdfPreview',
  initial: {
    loading: false,
    // pdfInfo: {},
    blobUrl: '',
    is404: false,
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  asyncs: {
    async initPDFInfo(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        const { url } = payload;
        const data = await fetch(`${FILES_HOST}/${url}`); // 采用静态文件服务器获取pdf
        const bl = await data.blob();
        if (data) {
          const blobUrl = window.URL.createObjectURL(bl);
          await dispatch('setData', { blobUrl, loading: false });
        } else {
          dispatch('setData', { loading: false, is404: true });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  async setup(dispatch) {
    const { topicId, url } = getQueryVariable();
    if (!topicId || !url) {
      await dispatch('setData', { is404: true });
    } else {
      await dispatch('initPDFInfo', { topicId, url });
    }
  },
};
