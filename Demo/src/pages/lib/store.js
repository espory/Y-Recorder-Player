import { getLib } from './service';
import { postCreateFile, postDeleteFiles, postMoveFiles, postClearAll, postUpdateFile, postUploadAttachment } from './service';
import { postGetBibTexAndMla, getDownLoadAttachmentFile, postClearAttachment, completeInfo } from './service';
import { postCreateComment, postUpdateComment, postUpdateCommentFileId, getGetComment, deleteCommentById,
  // getMindmapStruct, updateMindmap
} from './service';
// import { getGetTimeline } from './service';
// import { postGetReferences, postGetReferencesWithFormat } from './service';
// import { postGetRefGraph } from './service';
import { getGetSettings, postUpdateSettings } from './service';
import { postClearFileUrl } from './service';
import { postUpdateFileUrl } from '../afterUpload/service';
import { getMyInfo } from '../../pages/my-info/service';
import FILES_HOST from '../../common/fetch';

import { message } from 'antd';
import moment from 'dayjs';
import { saveDataToFile, deepCopy } from '../../common/utils';
import { genDocModel } from '../../pages/lib/docTypeModels';
import { colAddField } from './utils';

const dateFormat = 'YYYY-MM-DD';
const defaultLibraryInfo = {
  libraryList: [],
  flag: { fetching: false,
    end: false,
    multiChoose: false,
  },
  cite: {
    bibtex: '',
    mla: '',
  },
  attachment: [],
};
export default {
  namespace: 'lib',
  initial: {
    loading: false,
    topicInfo: {}, // topicInfo = { topicId, name, description },由topic构造传入
    userInfo: {
      name: '', // 用户名
      avatarPreview: '', // 头像
    },
    breadcrumb: [
      { name: '主题管理',
        link: '/topic' },
      { name: '我的主题',
        link: '/topic' },
    ],
    libraryListInfo: deepCopy(defaultLibraryInfo),
    deletedLibraryListInfo: deepCopy(defaultLibraryInfo),
    mindmapStruct: {}, // 记录思维导图结构
    interval: null,
    fileFormVisible: false,
    formData: {},
    createType: 'document', // 共有两个取值【'document'】和【'attachment'】用于file-form判断是添加文献，还是添加附件
    createAttachmentDocId: 0, // 记录哪个文档要创建的附件
    refFormVisible: false,
    references: {
      loading: false,
      rows: [],
      format: 'txt',
    },
    showCommentRows: [],
    libHeaderTab: 'homepage',
    papersTimeline: [],
    papersTimelineFilter: {
      field: 'createAt',
      from: moment().subtract(6, 'days').format(dateFormat),
      to: moment().add(1, 'days').format(dateFormat),
    },
    // refGraph: [],
    settings: {
      tableColIdx: [ 0 ],
      tableColIdxOrigin: [ 0 ], // 保存设置里原始表格显示项，弹出drawer修改显示列数，关闭drawer恢复原状会用到
    },
    bibErrorVisible: false, // 控制解析bib文件出错时弹窗
    bibErrorInfo: [], // bib文件出错信息提醒
    filesList: [], // bib文件出错，信息传递
  },

  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    setLibraryListInfo(state, payload) {
      const { libraryListInfo } = state;
      return {
        ...state,
        libraryListInfo: {
          ...libraryListInfo,
          ...payload,
        },
      };
    },
    setDeletedLibraryListInfo(state, payload) {
      const { deletedLibraryListInfo } = state;
      return {
        ...state,
        deletedLibraryListInfo: {
          ...deletedLibraryListInfo,
          ...payload,
        },
      };
    },
    setLibraryList(state, payload) {
      const { libraryListInfo, deletedLibraryListInfo } = state;
      const { deleted, idx, row } = payload;
      let target = libraryListInfo.libraryList;
      if (deleted) {
        target = deletedLibraryListInfo.libraryList;
        target[idx] = row;
        return {
          ...state,
          deletedLibraryListInfo: {
            ...deletedLibraryListInfo,
            libraryList: [].concat(target),
          },
        };
      }
      target[idx] = row;
      return {
        ...state,
        libraryListInfo: {
          ...libraryListInfo,
          libraryList: [].concat(target),
        },
      };
    },
    initLibraryList(state, payload = {}) {
      const { deleted = false } = payload;
      if (deleted) {
        return {
          ...state,
          deletedLibraryListInfo: deepCopy(defaultLibraryInfo),
        };
      }
      return {
        ...state,
        libraryListInfo: deepCopy(defaultLibraryInfo),
      };
    },
    setSettings(state, payload) {
      const { settings } = state;
      return {
        ...state,
        settings: { ...settings, ...payload },
      };
    },
    setExpandRows(state, payload) {
      const { showCommentRows } = state;
      return ({
        ...state,
        showCommentRows: showCommentRows.indexOf(payload) === -1 ?
          [ ...showCommentRows, payload ] :
          showCommentRows.filter(row => row !== payload),
      });
    },
    createAttachment(state, payload) {
      const { id } = payload;
      console.log(id);
      return ({
        ...state,
        createAttachmentDocId: id,
        fileFormVisible: true,
        createType: 'attachment',
      });
    },
  },

  // async action
  asyncs: {
    async getLibrary(dispatch, getState, payload = {}) {
      const { libraryListInfo, deletedLibraryListInfo, topicId } = getState();
      const { deleted = false } = payload;
      let target = libraryListInfo;
      if (deleted) {
        target = deletedLibraryListInfo;
      }
      const { libraryList, flag } = target;
      if (flag.fetching || flag.end) {
        return;
      }
      const actionName = deleted ? 'setDeletedLibraryListInfo' : 'setLibraryListInfo';

      try {
        dispatch('setData', { loading: true });
        dispatch(actionName, { flag: { ...flag, fetching: true } });
        const data = {
          topicId,
          ...payload };
        // 接收数据
        const { rows, count } = await getLib(data);
        // key = id
        const newInfo = {
          flag: { ...flag, fetching: false },
          libraryList: libraryList.concat((rows).map(row => genDocModel(row))),
        };


        // TODO：websocket
        await dispatch(actionName, newInfo);
        if ((libraryList.length + rows.length) === count) {
          await dispatch(actionName, { flag: { ...flag, fetching: false, end: true } });
        }

        if (!deleted) {
          dispatch('completeInfo');
        }

      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    // Object.keys(a).length ===0

    async completeInfo(dispatch, getState) {
      try {
        const { libraryListInfo, topicId } = getState();
        const { libraryList } = libraryListInfo;
        // 筛选出未补充过的paper
        const libraryListFilter = libraryList.filter(item => {
          if (!item.extra) return false;
          const { isComplete } = item.extra;
          return !isComplete;
        });
        const libraryListFilterIds = libraryListFilter.map(item => ({ fileId: item.id, title: item.title, topicId }));
        await Promise.all(libraryListFilterIds.map(async item => {
          const { fileId } = item;
          const { basicInfo, fileUrl } = await completeInfo(item);
          const { extra, authors } = basicInfo;
          const docInx = libraryList.findIndex(item => (item.id === fileId));
          const { title: row_title, extra: row_extra, authors: row_authors } = libraryList[docInx];
          const tempDoc = genDocModel({ title: row_title, extra: { ...row_extra, ...extra }, authors: authors.length ? authors : row_authors });
          tempDoc.fileUrl = fileUrl ? fileUrl : '';
          const attr = [ 'id', 'fileUrl', 'alias', 'comments', 'commentLength', 'file_attachments', 'mark', 'tags', 'updated_at', 'user_create', 'user_modify' ];
          for (const key of attr) {
            if (key in libraryList[docInx]) {
              tempDoc[key] = libraryList[docInx][key];
            }
          }
          libraryList[docInx] = tempDoc;
        }));
        await dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });

      } catch (error) {
        console.error(error);
      }
    },

    async getUserInfo(dispatch) {
      try {
        const myInfo = await getMyInfo();
        dispatch('setData', {
          userInfo: {
            name: myInfo.name,
            avatarPreview: myInfo.avatar.link ? FILES_HOST + '/' + myInfo.avatar.link : '',
          },
        });
      } catch (error) {
        console.error(error);
      }
    },

    // // 获取mindmap结构
    // async getMindmap(dispatch, getState, payload) {
    //   const { topicId } = payload;
    //   try {
    //     const res = await getMindmapStruct({ topicId });
    //     let { mindmap } = res;
    //     mindmap = mindmap ? JSON.parse(mindmap) : {};
    //     mindmap = typeof mindmap === 'object' ? mindmap : {};
    //     await dispatch('setData', { mindmapStruct: mindmap });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async updateMindmap(dispatch, getState, payload) {
    //   const { topicId } = getState();
    //   const { mindmap } = payload;
    //   try {
    //     await updateMindmap({ topicId, mindmap: JSON.stringify(mindmap) });
    //     await dispatch('setData', { mindmapStruct: { ...mindmap } });
    //     // let { mindmap } = res;
    //     // mindmap = mindmap ? JSON.parse(mindmap) : {};
    //     // dispatch('setData', { mindmapStruct: mindmap });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // 转换表格多选状态
    multiChooseRevert(dispatch, getState, payload) {
      try {
        const { libraryListInfo, deletedLibraryListInfo } = getState();
        const { deleted = false } = payload;
        let target = libraryListInfo.flag;
        let actionName = 'setLibraryListInfo';
        if (deleted) {
          target = deletedLibraryListInfo.flag;
          actionName = 'setDeletedLibraryListInfo';
        }
        dispatch(actionName, { flag: { ...target, multiChoose: !target.multiChoose } });
      } catch (error) {
        console.error(error);
      }

    },
    async createFile(dispatch, getState, payload) {
      const topicId = payload.topicId || getState().topicId;
      try {
        dispatch('setData', { loading: true });
        const { fileId } = await postCreateFile({ alias: '', ...payload, topicId });
        dispatch('complete', { fileId });

        message.success('创建成功');
        dispatch('setData', { fileFormVisible: false });
        dispatch('initLibraryList');
        dispatch('getLibrary');
        // dispatch('getRefGraph');
        return true;
      } catch (e) {
        console.error(e.message);
        return false;
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async toAfterUpload(dispatch, getState, payload) {
      try {
        const { topicInfo, breadcrumb } = getState();
        const { files, history } = payload;
        const path = {
          pathname: '/afterUpload',
          state: {
            topicInfo,
            breadcrumb: breadcrumb.concat([{ name: '上传文献', link: '/aferUpload' }]),
            files },
        };
        history.push(path);
      } catch (e) {
        console.error(e.message);
      }
    },
    async downloadFile(dispatch, getState, payload) {
      try {
        const { topicId } = getState();
        // const { title } = payload;
        const { url } = payload;
        dispatch('setData', { loading: true });
        window.open(window.location.origin + `/pdfPreview.html?topicId=${topicId}&url=${url}`, '_blank');
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async downloadAttachmentFile(dispatch, getState, payload) {
      try {
        const { attachment_url } = payload;
        getDownLoadAttachmentFile(attachment_url);
      } catch (e) {
        console.error(e.message);
      }
    },
    // async downloadRefs(dispatch, getState) {
    //   try {
    //     const { references, topicId, currentFileId } = getState();
    //     const result = await postGetReferencesWithFormat({ topicId, fileId: currentFileId, format: references.format });
    //     saveDataToFile(result, 'result.txt');
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // 根据payload下载索引文件
    async downloadCite(dispatch, getState, payload) {
      try {
        const { libraryListInfo } = getState();
        const { cite } = libraryListInfo;
        dispatch('setData', { loading: true });
        if (payload === 'bibtex') {
          saveDataToFile(cite.bibtex, `${'export'}.bib`);
        } else if (payload === 'mla') {
          saveDataToFile(cite.mla, `${'export'}.txt`);
        }
      // message.success(r);
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    // 获取索引信息
    async getBibTexAndMla(dispatch, getState, payload) {
      try {
        dispatch('setData', { loading: true });
        const res = await postGetBibTexAndMla({ ...payload });
        // res.reverse();
        let bibTexStr = '';
        let mlaStr = '';
        const resLen = res.length;
        res.forEach((item, index) => {
          const { bibTex, mla } = item;
          if (bibTex) {
            bibTexStr += bibTex.trim() + (index === resLen - 1 ? '' : '\n');
          }
          if (mla) {
            mlaStr += `[${index + 1}] ${mla.trim()}${index === resLen - 1 ? '' : '\n'}`;
          }
        });
        dispatch('setLibraryListInfo', { cite: { bibtex: bibTexStr, mla: mlaStr } });
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async updateDocument(dispatch, getState, payload) {
      const { topicId, libraryListInfo } = getState();
      const { libraryList } = libraryListInfo;
      const { fileId, title, alias, authors, fileUrl, tags, mark, extra } = payload;
      if (fileId === undefined) {
        return;
      }
      try {
        const newRow = await postUpdateFile({ fileId, title, authors, fileUrl, alias, tags, mark, extra, topicId });
        const idx = libraryList.findIndex(ele => ele.id === newRow.id);
        libraryList[idx] = genDocModel({ ...libraryList[idx], ...newRow });
        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
      } catch (e) {
        console.log(e);
      } finally {
        // dispatch('setData', { loading: false });
      }
    },
    async moveFiles(dispatch, getState, payload) {
      const { topicId, libraryListInfo, deletedLibraryListInfo } = getState();
      const { libraryList } = libraryListInfo;
      const { libraryList: deletedLibraryList } = deletedLibraryListInfo;
      const { deleted = true, ids } = payload;
      try {
        dispatch('setData', { loading: true });
        await postMoveFiles({ ...payload, topicId, deleted });
        const restLibraryList = [];
        const movedLibraryList = [];
        let moveFrom;
        let moveTo;
        let setRestction;
        let addMovedAction;
        if (deleted) {
          message.success('移除成功');
          moveFrom = libraryList;
          moveTo = deletedLibraryList;
          setRestction = 'setLibraryListInfo';
          addMovedAction = 'setDeletedLibraryListInfo';

        } else {
          message.success('恢复成功');
          moveFrom = deletedLibraryList;
          moveTo = libraryList;
          setRestction = 'setDeletedLibraryListInfo';
          addMovedAction = 'setLibraryListInfo';
        }
        for (const row of moveFrom) {
          if (ids.indexOf(row.id) === -1) {
            restLibraryList.push(row);
          } else {
            movedLibraryList.push(row);
          }
        }
        dispatch(setRestction, { libraryList: [].concat(restLibraryList) });
        dispatch(addMovedAction, { libraryList: movedLibraryList.concat(moveTo) });
        // dispatch('getRefGraph');
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async deleteFiles(dispatch, getState, payload) {
      const { topicId } = getState();
      try {
        dispatch('setData', { loading: true });
        const r = await postDeleteFiles({ ...payload, topicId });
        message.success(r);
        dispatch('initLibraryList', { deleted: true });
        dispatch('getLibrary', { deleted: true });
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    async clearAll(dispatch, getState, payload) {
      const { topicId } = getState();
      try {
        dispatch('setData', { loading: true });
        const r = await postClearAll({ ...payload, topicId });
        message.success(r);
        dispatch('initLibraryList', { deleted: true });
        dispatch('getLibrary', { deleted: true });
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch('setData', { loading: false });
      }
    },
    // async updateStatus(dispatch, getState) {
    //   // const { title, fileId, index } = payload;
    //   const { libraryListInfo } = getState();
    //   const { libraryList } = libraryListInfo;
    //   try {
    //     const unReadyFileList = [];
    //     for (let i = 0; i < libraryList.length; i++) {
    //       const { status, id, title } = libraryList[i];
    //       if (status < 2) {
    //         unReadyFileList.push({ fileId: id, title, index: i });
    //       }
    //     }
    //     if (!unReadyFileList.length) {
    //       return;
    //     }
    //     const infoList = await postGetFileStatus(unReadyFileList);

    //     for (let i = 0; i < unReadyFileList.length; i++) {
    //       const tempInx = unReadyFileList[i].index;
    //       libraryList[tempInx] = genDocModel({ ...libraryList[tempInx], ...infoList[i] });
    //     }
    //     dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    async createComment(dispatch, getState, payload) {
      const { topicId, libraryListInfo, userInfo } = getState();
      console.log(userInfo);
      const { name } = userInfo;
      const { libraryList } = libraryListInfo;
      try {
        const res = await postCreateComment({ topicId, ...payload });
        const { id: newId } = res;
        const { fileId, comment } = payload;
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === fileId) {
            libraryList[i].comments.push({ id: newId, content: comment, userName: name });
            break;
          }
        }
        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });

        return res;
      } catch (e) {
        console.error(e.message);
        return 'error';
      }
    },
    async updateComment(dispatch, getState, payload) {
      const { libraryListInfo } = getState();
      const { libraryList } = libraryListInfo;
      try {
        const { fileId, commentId, comment } = payload;
        const res = await postUpdateComment({ commentId, comment });
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === fileId) {
            const temp = libraryList[i].comments.find(elem => elem.id === commentId);
            temp.content = comment;
            break;
          }
        }
        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });

        return res;
      } catch (e) {
        console.error(e.message);
        return 'error';
      }
    },
    async updateCommentFileId(dispatch, getState, payload) {
      const { libraryListInfo } = getState();
      const { libraryList } = libraryListInfo;
      try {
        const { fileId, commentId, originFileId } = payload;
        // 对libraryList进行更新操作
        let comment;
        for (let i = 0; i < libraryList.length; i++) {
          const lib = libraryList[i];
          const id = lib.id;
          if (id === originFileId) {
            comment = lib.comments.find(ele => (ele.id === commentId));
            lib.comments = lib.comments.filter(ele => (ele.id !== commentId));
            break;
          }
        }
        const libTem = libraryList.find(ele => ele.id === fileId);
        libTem.comments.push(comment);

        const res = await postUpdateCommentFileId({ fileId, commentId });

        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });

        return res;
      } catch (e) {
        console.error(e.message);
        return 'error';
      }
    },
    async getComment(dispatch, getState, payload) {
      const { topicId } = getState();
      try {
        const result = await getGetComment({ topicId, ...payload });
        return result;
      } catch (e) {
        console.error(e.message);
        return 'error';
      }
    },
    async deleteComment(dispatch, getState, payload) {
      const { topicId } = getState();
      try {
        const { libraryListInfo } = getState();
        const { libraryList } = libraryListInfo;
        const { fileId, commentId } = payload;
        const res = await deleteCommentById({ topicId, fileId, commentId });
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === fileId) {
            libraryList[i].comments = libraryList[i].comments.filter(comment => (comment.id !== commentId));
            break;
          }
        }
        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });

        return res;
      } catch (e) {
        console.error(e.message);
        return 'error';
      }
    },
    // async getTimeline(dispatch, getState) {
    //   try {
    //     dispatch('setData', { loading: true });
    //     const r = await getGetTimeline(getState().papersTimelineFilter);
    //     await dispatch('setData', { papersTimeline: r.rows });
    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //     dispatch('setData', { loading: false });
    //   }
    // },
    // async getReferences(dispatch, getState, payload) {
    //   try {
    //     dispatch('setData', { references: { loading: true } });
    //     const { topicId } = getState();
    //     const { fileId } = payload;
    //     const r = await postGetReferences({ topicId, fileId });
    //     dispatch('setData', { references: { loading: false, rows: r, format: 'txt' } });
    //   } catch (e) {
    //     console.log(e);
    //     dispatch('setData', { references: { loading: false, rows: [] } });
    //   }
    // },
    // async getRefGraph(dispatch, getState) {
    //   try {
    //     const { topicId } = getState();
    //     const r = await postGetRefGraph({ topicId });
    //     dispatch('setData', { refGraph: r });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    async updateFileUrl(dispatch, getState, payload) {
      try {
        const { topicId, libraryListInfo } = getState();
        const { fileId, file } = payload;
        const { libraryList } = libraryListInfo;
        const newFile = await postUpdateFileUrl({ file, extraData: { topicId, fileId } });
        message.success('上传成功');
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === fileId) {
            libraryList[i] = genDocModel({ ...libraryList[i], ...newFile });
            break;
          }
        }
        dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
      } catch (e) {
        console.error(e.message);
      }
    },

    async uploadAttachment(dispatch, getState, payload) {
      try {
        const { libraryListInfo } = getState();
        const { libraryList } = libraryListInfo;
        const { createAttachmentDocId, topicInfo } = getState();
        const { topicId } = topicInfo;
        console.log(createAttachmentDocId);

        const { files } = payload;
        const res = await postUploadAttachment({ files, fileId: createAttachmentDocId, topicId });
        message.success('附件添加成功');
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === createAttachmentDocId) {
            libraryList[i].file_attachments = res;
            break;
          }
        }
        await dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
        await dispatch('setData', { fileFormVisible: false });
      } catch (e) {
        console.error(e.message);
      }
    },
    async clearFileUrl(dispatch, getState, payload) {
      try {
        const { topicId, libraryListInfo } = getState();
        const { fileId } = payload;
        const { libraryList } = libraryListInfo;
        const newFile = await postClearFileUrl({ topicId, fileId });
        message.success('删除成功');
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === fileId) {
            libraryList[i] = genDocModel({ ...libraryList[i], ...newFile });
            break;
          }
        }
        await dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
      } catch (e) {
        console.error(e.message);
      }
    },

    async clearAttachmentFile(dispatch, getState, payload) {
      try {
        const { libraryListInfo } = getState();
        const { libraryList } = libraryListInfo;
        const { file_id, attachment_url } = payload;
        const res = await postClearAttachment({ file_id, attachment_url });
        message.success('删除成功');
        for (let i = 0; i < libraryList.length; i++) {
          if (libraryList[i].id === file_id) {
            libraryList[i].file_attachments = res;
            break;
          }
        }
        await dispatch('setLibraryListInfo', { libraryList: [].concat(libraryList) });
      } catch (e) {
        message.error('删除失败');
        console.error(e.message);
      }
    },

    //   个人设置
    async getSettings(dispatch, getState, payload) {
      try {
        const topicId = payload.topicId || getState().topicId;
        const r = await getGetSettings({ topicId });
        const { tableColIdx = [], tableColIdxOrigin = [] } = r;
        // 添加设置表项
        colAddField(tableColIdx, 'operation');
        colAddField(tableColIdxOrigin, 'operation');
        dispatch('setData', { settings: r });
      } catch (error) {
        console.error(error);
      }
    },
    async updateCol(dispatch, getState, payload) {
      try {
        if (payload && payload.tableColIdx && payload.tableColIdxOrigin) {
          colAddField(payload.tableColIdx, 'operation');
          colAddField(payload.tableColIdxOrigin, 'operation');
          dispatch('updateSettings', payload);
        } else if (Array.isArray(payload)) {
          colAddField(payload, 'operation');
          dispatch('updateSettings', { tableColIdx: payload });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async autoParseChange(dispatch, getState, payload) {
      try {
        if (payload && payload.autoParse) {
          dispatch('updateSettings', payload);
        } else {
          dispatch('updateSettings', { autoParse: payload });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateSettings(dispatch, getState, payload = {}) {
      try {
        const topicId = payload.topicId || getState().topicId;
        const settings = { ...getState().settings, ...payload };
        const r = await postUpdateSettings({ topicId, settings });
        dispatch('setData', { settings: r });
      } catch (error) {
        console.error(error);
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
    await dispatch('getUserInfo');
  },
};
