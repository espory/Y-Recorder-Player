import { getHeadData, postCreateFile } from './service';
import { postCreate } from './service';
import { postUploadPdf, postUploadBib, postUploadTxt } from './service';
import { postUpdateFile } from '../lib/service';
import { formatLibraryItem } from '../../pages/lib/utils';
import { message } from 'antd';
import { STEP_STATUS } from './const';

/**
   * 进入下个步骤
   * @param {Funtion} dispatch
   * @param {Function} getState
   * @param {string} currentStatus
   */
function toNextStep(dispatch, getState, currentStatus) {
  const { currentFileIndex, fileInfo } = getState();
  const { status } = fileInfo[currentFileIndex];
  let match = false;
  for (let i = 0; i < status.length; i++) {
    // 找到当前正在处理(process)的step
    if (status[i] === STEP_STATUS.process) {
      match = true;
      status[i] = currentStatus;
      //  出错的情况
      if (currentStatus === STEP_STATUS.error) {
        for (let j = i; j < status.length - 2; j++) {
          status[j] = STEP_STATUS.error;
        }
        status[status.length - 1] = STEP_STATUS.process;
      } else {
        // 处理完毕
        if (i === status.length - 1) {
          toNextFile(dispatch, getState);
        } else {
          status[i] = STEP_STATUS.finish;
          status[i + 1] = STEP_STATUS.process;
        }
      }
      break;
    }
  }
  if (!match) {
    message.error('当前无步骤');
  }
  dispatch('setCurrentFileInfo', { status });
}
/**
   * 进入下个文件
   * @param {Funtion} dispatch
   * @param {Function} getState
   */
function toNextFile(dispatch, getState) {
  const { currentFileIndex, fileInfo } = getState();
  if (currentFileIndex === fileInfo.length - 1) {
    // 回到父目录
    backToLibrary(getState);
  } else {
    dispatch('setData', {
      currentFileIndex: currentFileIndex + 1 });
  }
}

function backToLibrary(getState) {
  const { breadcrumb, topicInfo, routerHistory } = getState();
  const path = {
    pathname: breadcrumb[breadcrumb.length - 2].link,
    state: {
      topicInfo,
      breadcrumb: breadcrumb.slice(0, -1),
    },
  };
  routerHistory.push(path);
}

export default {
  namespace: 'uploadpdf',
  initial: {
    loading: false,
    // fileInfo = {file,status,pdfData,bibData, fileId?} fileId为后端数据返回的file唯一ID
    // => status like ['finish','error','process']
    // => see initial in initFileInfo
    fileInfo: [],
    currentFileIndex: null,
    topicInfo: {},
    breadcrumb: [],
    routerHistory: null,
    docFormRef: {},
    bibFormRef: {},
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setFormData(state, payload) {
      return {
        ...state,
        formData: payload,
      };
    },
    setType(state, payload) {
      return {
        ...state,
        type: payload,
      };
    },
    initFileInfo(state, payload) {
      const { files } = payload;
      const { length } = files;
      const fileInfo = [];
      for (let i = 0; i < length; i++) {
        fileInfo.push({
          file: files[i],
          status: [ STEP_STATUS.process, STEP_STATUS.wait, STEP_STATUS.wait ],
          pdfData: {
            crypted: '',
            title: '',
            authors: '' },
          bibData: {},
        });
      }
      return {
        ...state,
        fileInfo,
      };

    },
    setCurrentFileInfo(state, payload) {
      const { fileInfo, currentFileIndex } = state;
      fileInfo[currentFileIndex] = { ...fileInfo[currentFileIndex], ...payload };
      return {
        ...state,
        fileInfo: [ ...fileInfo ],
      };
    },
    previousFile(state) {
      const { currentFileIndex } = state;
      return {
        ...state,
        currentFileIndex: currentFileIndex ? currentFileIndex - 1 : 0,
      };
    },
    // setRestInfoVisible(state, payload) {
    //   const { idx, status } = payload;
    //   const { currentFileIndex, fileInfo } = state;
    //   const { bibData } = fileInfo[currentFileIndex];
    //   const { extraInfoVisible } = bibData;
    //   extraInfoVisible[idx] = status;
    //   // 对象的每一层child必须都有更新（某个child的地址变化-array/object或者值变化number，string等类型），否则即使extraInfoVisible的地址已经更新，也不会触发componentUpdate
    //   fileInfo[currentFileIndex].bibData = { ...bibData };
    //   fileInfo[currentFileIndex].bibData.extraInfoVisible = extraInfoVisible.slice();
    //   return {
    //     ...state,
    //     fileInfo: [ ...fileInfo ],
    //   };
    // },
    addBreadcrumbList(state, payload) {
      state.breadcrumbList.push(payload);
      return {
        ...state,
        breadcrumbList: state.breadcrumbList.slice(),
      };
    },
  },

  // async action
  asyncs: {

    /**
     * @description: 第一步将文件上传至服务器
     * @param {*} dispatch
     * @param {*} getState
     * @return {*}
     */
    async uploadFile(dispatch, getState) {
      try {
        const { topicInfo, currentFileIndex, fileInfo } = getState();
        const { topicId } = topicInfo;
        const { file: currentFile, pdfData, bibData } = fileInfo[currentFileIndex];

        const extendName = currentFile?.name?.split('.').pop();
        if (extendName === 'pdf') {
          dispatch('setData', { loading: true });
          const r = await postUploadPdf({ file: currentFile, extraData: { topicId } });
          dispatch('setCurrentFileInfo', { pdfData: { ...pdfData, crypted: r } });
          // 处理step用到的标志信息
          toNextStep(dispatch, getState, STEP_STATUS.finish);
          // 下个步骤
          dispatch('getHeadData');
        }
        if (extendName === 'bib' || [ 'bibtxt', 'reftxt' ].indexOf(currentFile?.type) !== -1) {
          dispatch('setData', { loading: true });
          const res = extendName === 'bib' ? postUploadBib({ file: currentFile, extraData: { topicId } }) :
            postUploadTxt(currentFile);
          const r = formatLibraryItem(await res);

          // 此文件在服务器上已保存,返回的authors是数组,转成string方便用户编辑
          const { authors = [] } = r;
          await dispatch('setCurrentFileInfo', {
            bibData: {
              ...bibData,
              ...r,
              authors: authors.join(' and '),
              // extraInfoVisible: Object.keys(extra).map(() => true)
            },
          });
          // 不存在解析title和authors步骤，所以直接跳到第三步
          await toNextStep(dispatch, getState, STEP_STATUS.finish);
          await toNextStep(dispatch, getState, STEP_STATUS.finish);
          const { bibFormRef } = getState();
          await bibFormRef.submit();
        }
      } catch (e) {
        toNextStep(dispatch, getState, STEP_STATUS.error);
        toNextStep(dispatch, getState, STEP_STATUS.error);
        toNextFile(dispatch, getState); // 跳过错误处理
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async goBack(dispatch, getState) {
      backToLibrary(getState);
    },
    async getHeadData(dispatch, getState) {
      const { topicInfo, currentFileIndex, fileInfo, docFormRef } = getState();
      const { pdfData } = fileInfo[currentFileIndex];
      const { topicId } = topicInfo;
      try {
        const res = await getHeadData(fileInfo[currentFileIndex].file.name, topicId, pdfData.crypted);
        const { title, authors } = res;
        // const head_arr = head.replace(/^(\s|\[)+|(\s|\])+$/g, '').split('$$\',');
        await dispatch('setCurrentFileInfo', { pdfData: { ...pdfData, title, authors: authors.join(' and ') } });
        await toNextStep(dispatch, getState, STEP_STATUS.finish);
        await docFormRef.submit();
      } catch (e) {
        toNextStep(dispatch, getState, STEP_STATUS.error);
      }
    },

    /**
     * @description: 第二步（bib没有此步骤，提交表单会直接跳到第三步）
     * @param {*} dispatch
     * @param {*} getState
     * @param {*} payload
     * @return {*}
     */
    async createOrUpdateFile(dispatch, getState, payload) {
      try {
        const { topicInfo, currentFileIndex, fileInfo } = getState();
        const { pdfData } = fileInfo[currentFileIndex];
        const { topicId } = topicInfo;
        const { resetForm, ...rest } = payload;
        const { authors = '' } = rest;
        // 更新本地fileInfo
        // 发送服务器请求，createOrUpdate
        const file = await postCreateFile({
          alias: '',
          ...payload,
          authors: authors.split(' and '),
          topicId,
          crypted: pdfData.crypted,
        });
        const { id } = file;
        await dispatch('setCurrentFileInfo', { pdfData: { ...pdfData, ...rest }, fileId: id });
        await resetForm();
        message.destroy();
        message.success('文献上传成功');
        toNextFile(dispatch, getState);
      } catch (e) {
        // 跳过错误
        message.destroy();
        toNextFile(dispatch, getState);
        console.log(e);
      }
    },

    /**
     * @description: 第三步
     * @param {*} dispatch
     * @param {*} getState
     * @param {*} payload
     * @return {*}
     */
    async create(dispatch, getState, payload) {
      try {
        const { topicId } = getState().topicInfo;
        const { authors } = payload;
        // 更新本地的fileInfo
        dispatch('setCurrentFileInfo', { bibData: { ...payload,
          // extraInfoVisible: Object.keys(extra).map(() => true)
        } });
        const { fileInfo, currentFileIndex } = getState();
        const { fileId } = fileInfo[currentFileIndex];
        if (fileId) {
          const r = await postUpdateFile({ topicId, fileId, ...payload, authors: authors.split(' and ') });
          message.success(r);
        } else {
          const file = await postCreate({ alias: '', ...payload, authors: authors.split(' and '), topicId });
          dispatch('setCurrentFileInfo', { fileId: file.id });
          message.destroy();
          message.success('文献上传成功');
        }
        toNextFile(dispatch, getState);
      } catch (e) {
        // 跳过错误
        toNextFile(dispatch, getState);
        console.log(e);
      }
    },
  },
  /**
   * 初始化请求
   * @param {Function} dispatch dispatch方法
   * @param {Function} getState 获取当前页面store
   * @param {Object} payload dispatch参数
   */
  async setup(dispatch, getState, payload) { // eslint-disable-line
  },
};
