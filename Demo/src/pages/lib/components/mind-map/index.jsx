// import { PureComponent } from 'react';
// import { Modal } from 'antd';
// const { confirm } = Modal;
// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import MindElixir from 'mind-elixir';
// import { deepCopy } from '../../../../common/utils';

// import { parseData, spliteMark } from './parseData';
// import contextMenu from './plugin/contextMenu';
// import { moveNode, moveNodeBefore, moveNodeAfter, expandNode,
// // createInputDiv
// } from './plugin/nodeOperation';
// import { copyMindmapStruct, removeTag, tagToTag, getParentTags,
//   renameTag, tagToRoot, checkPeerValid, checkAncestorValid,
//   addTagStyle, checkDuplicate,
// } from './utils';
// import nodeDraggable from './plugin/nodeDraggable';

// import './index.less';
// import { message } from 'antd';
// export default class MindMap extends PureComponent {
//   constructor(props) {
//     super(props);
//     const { dataSource, topicInfo } = props;
//     const { topicName } = topicInfo;
//     const { libraryList } = dataSource;
//     this.state = {
//       selectNodeData: {},
//       copyNode: [],
//       topicName,
//       libraryList,
//     };
//   }

//   // }

//   componentDidMount() {

//     const { props } = this;
//     const { dispatch } = props;
//     const { topicInfo } = props;
//     const { topicId } = topicInfo;
//     const { mindmapStruct } = props;
//     const { libraryList, topicName } = this.state;
//     const { E } = MindElixir;
//     const self = this;
//     let tagStruct = {};

//     const mind = new MindElixir({
//       locale: 'cn',
//       el: '#map',
//       direction: MindElixir.RIGHT,
//       // 创建新数据
//       // data: MindElixir.new('new topic'),
//       // 也使用 getDataAll 得到的数据
//       data: parseData({ libraryList, topicName, mindmapStruct: deepCopy(mindmapStruct) }),
//       draggable: true, // 启用拖动 default true
//       contextMenu: false, // 启用右键菜单 default true
//       toolBar: true, // 启用工具栏 default true
//       nodeMenu: false, // 启用节点菜单 default true
//       keypress: false, // 启用快捷键 default true
//       before: {
//         async addChild() {
//           await new Promise(res => {
//             setTimeout(() => res(), 100);
//           });
//           return true;
//         },
//       },
//     });
//     this.mind = mind;
//     mind.toCenter = function() { // 将会在init内执行，可以把它看作hook做些初始化操作
//       this.container.scrollTo(
//         10000 - this.container.offsetWidth / 4,
//         10000 - this.container.offsetHeight / 2
//       );
//       contextMenu(mind, { link: false, focus: true });
//       nodeDraggable(mind);
//       tagStruct = copyMindmapStruct(mind.getAllData().nodeData);
//     };
//     mind.init();

//     // 改变tag style
//     addTagStyle(E('root').nodeObj, E);


//     mind.openPdf = () => {
//       const { selectNodeData } = this.state;
//       const { fileUrl = '' } = selectNodeData;
//       if (fileUrl) {
//         window.open(window.location.origin + `/pdfPreview.html?topicId=${topicId}&url=${fileUrl}`, '_blank');
//       } else {
//         message.warning('该文献尚未上传 pdf');
//       }
//       console.log(selectNodeData);
//     };

//     const refreshMind = expandId => {
//       const { dataSource, topicInfo, mindmapStruct } = self.props;
//       const { topicName } = topicInfo;
//       const { libraryList } = dataSource;
//       const { nodeData, linkData } = parseData({ libraryList, topicName, mindmapStruct: deepCopy(mindmapStruct) });
//       mind.nodeData = nodeData;
//       mind.linkData = linkData;
//       mind.refresh();
//       if (expandId) {
//         const element = E(expandId);
//         element.nodeObj.expanded = true;
//         console.log(E(expandId));
//         mind.refresh();
//       }
//       // 改变tag style
//       addTagStyle(E('root').nodeObj, E);
//     };
//     const updateTagStruct = async () => {
//       // 重新生成新的结构和tagset
//       tagStruct = copyMindmapStruct(mind.getAllData().nodeData);
//       await dispatch('updateMindmap', { mindmap: { tagStruct } });
//     };

//     mind.addTagStyle = () => {
//       addTagStyle(E('root').nodeObj, E);
//     };
//     mind.expandNode = expandNode;

//     const addChildStrategy = {
//       async document(obj) {
//         const { parent = {}, topic: childName } = obj;
//         const { fileId } = parent;
//         await dispatch('createComment', { fileId, comment: childName });
//         const updataNode = libraryList.find(model => (model.id === parent.fileId));
//         const updataComments = updataNode.comments;
//         obj.commentId = updataComments[updataComments.length - 1].id;
//         obj.id = '-comment-' + obj.commentId;
//         obj.type = 'comment';
//         refreshMind(parent.id);
//         mind.beginEdit(E(obj.id));
//       },
//       async root(obj) {
//         this.tag(obj); // 在root上添加新标签和在tag上添加新标签逻辑一致
//       },
//       async tag(obj) {

//         if (!(checkPeerValid(obj) && checkAncestorValid(obj))) {
//           message.warning(`重复标签: ${obj.topic}`);
//           refreshMind();
//           return;
//         }
//         // 初始化属性
//         obj.type = 'tag';
//         obj.selected = true;
//         obj.new = true;
//         obj.direction = 0;
//         obj.expanded = true;
//         obj.children = [];

//         await updateTagStruct();
//         if (obj.topic !== 'new node') {
//           refreshMind();
//         }
//         // 改变tag style
//         addTagStyle(E('root').nodeObj, E);

//         mind.selectNode(E(obj.id));
//       },
//     };

//     const finishEditStrategy = {
//       async document(obj) {
//         console.log(obj);
//         const { fileId, topic } = obj;
//         await dispatch('updateDocument', { fileId, alias: topic });
//         refreshMind();

//       },
//       async comment(obj) {
//         if (obj.topic !== 'new node') {
//           const { topic, commentId, parent } = obj;
//           const { fileId } = parent;
//           // const { fileId } = parent;
//           await dispatch('updateComment', { fileId, commentId, comment: topic });
//           refreshMind(parent.id);
//         }
//       },
//       async tag(obj) {
//         if (obj?.parent?.type === 'root' && !checkDuplicate(obj)) {
//           message.warning(`存在同级标签：${obj.topic}`);
//           refreshMind();
//           return;
//         }
//         if (!obj?.id?.includes('-tag-')) {
//           obj.id = '-tag-' + obj.topic;
//           return;
//         }

//         const oldTag = obj.path.split(spliteMark).pop();
//         await renameTag(obj, dispatch, [ oldTag ]);
//         await updateTagStruct();
//         refreshMind();
//         mind.selectNode(E(obj.id));
//       },
//     };
//     function showConfirm(okFunc, cancelFunc) {
//       confirm({
//         title: '确认删除',
//         icon: <ExclamationCircleOutlined />,
//         content: '',
//         okText: '确认',
//         cancelText: '撤回',
//         style: { top: '9700px',
//           left: '10150px',
//           position: 'absolute' },
//         getContainer: document.getElementsByClassName('map-canvas')[0],
//         onOk() {
//           okFunc();
//           message.success('删除成功');
//         },
//         onCancel() {
//           cancelFunc();
//         },
//       });
//     }
//     const removeNodeStrategy = {
//       async comment(obj) {
//         const { commentId, parent = {} } = obj;
//         const { fileId } = parent;
//         const parentId = obj.parent?.id;
//         showConfirm(async () => {
//           await dispatch('deleteComment', { fileId, commentId });
//           refreshMind(parentId);
//         }, () => {
//           refreshMind(parentId);
//         });
//         mind.toCenter();

//         // const { commentId, parent = {} } = obj;
//         // const { fileId } = parent;
//         // const parentId = obj.parent?.id;
//         // await dispatch('deleteComment', { fileId, commentId });
//         // refreshMind(parentId);
//       },
//       async document(obj) {
//         showConfirm(async () => {
//           const { fileId, data } = obj;
//           const removeTag = getParentTags(obj.parent);
//           const tags = data?.tags;
//           data.tags = tags.filter(tag => !removeTag.includes(tag));
//           await dispatch('updateDocument', { fileId, tags: data.tags });
//           refreshMind();
//         }, () => {
//           refreshMind();
//         });
//       },
//       async tag(obj) {
//         showConfirm(async () => {
//           const toDispatch = [];
//           removeTag(obj, toDispatch);
//           await Promise.all(toDispatch.map(disp => dispatch('updateDocument', disp)));
//           await updateTagStruct();
//           refreshMind();
//         }, () => {
//           refreshMind();
//         });
//       },
//     };
//     const moveNodeStrategy = {

//       async comment_document(fromObj, toObj, originParentId) {
//         const originFileId = Number(originParentId.split('-document-').pop());
//         const { fileId } = toObj;
//         const { commentId } = fromObj;
//         // const parentFileId = fromObj.parent.children;
//         // fromObj.parent.children = fromObj.parent.children.filter(elem => (elem.commentId!==fromObj.commentId));
//         await dispatch('updateCommentFileId', { fileId, commentId, originFileId });
//       },

//       async document_tag(fromObj, toObj, originParentId) {
//         let removeTag = getParentTags(E(originParentId).nodeObj);
//         const { fileId } = fromObj;
//         const { tags: oldTag } = fromObj.data;
//         let newTag = getParentTags(fromObj.parent);
//         removeTag = removeTag.filter(t => !newTag.includes(t));
//         newTag = Array.from(new Set([ ...oldTag, ...newTag ]));
//         newTag = newTag.filter(t => (!removeTag.includes(t))); // 过滤需要删除的节点
//         newTag.sort();
//         await dispatch('updateDocument', { fileId, tags: newTag });

//         await updateTagStruct();
//         refreshMind();
//         mind.selectNode(E(fromObj.id));
//         // children 去重防止单标签下有重复文献
//         // toObj.children = children.filter((child, index) => children.findIndex((obj => (obj.fileId === child.fileId)) === index));
//       },


//       async tag_tag(fromObj, toObj, originParentId) {
//         if (!checkAncestorValid(fromObj)) {
//           message.warning('重复标签');
//           refreshMind();
//           return;
//         }
//         let removeTag = getParentTags(E(originParentId).nodeObj);
//         const newTag = getParentTags(fromObj.parent);
//         removeTag = removeTag.filter(t => !newTag.includes(t));
//         await tagToTag(fromObj, dispatch, removeTag);
//         await updateTagStruct();
//         refreshMind();
//         mind.selectNode(E(fromObj.id));
//       },

//       async tag_root(fromObj, toObj, originParentId) {
//         console.log(toObj, originParentId);
//         const removeTag = getParentTags(E(originParentId).nodeObj);
//         await tagToRoot(fromObj, dispatch, removeTag);
//         await updateTagStruct();
//         refreshMind();
//         mind.selectNode(E(fromObj.id));
//       },
//     };

//     const beginEditStrategy = {
//       async root() {
//         refreshMind();
//       },
//     };
//     const operationStrategy = {
//       moveNode(obj) {
//         console.log(obj);
//         const { fromObj, toObj, originParentId } = obj;
//         const key = `${fromObj.type}_${toObj.type}`;
//         if (key in moveNodeStrategy) {
//           moveNodeStrategy[key](fromObj, toObj, originParentId);
//           mind.selectNode(E(fromObj.id));
//         } else {
//           // message.warning('无此操作');
//         }
//       },
//       addChild(obj) {
//         const { parent = {} } = obj;
//         const { type = '' } = parent;
//         if (type in addChildStrategy) {
//           addChildStrategy[type](obj);
//         } else {
//           // message.warning('无此操作');
//         }
//       },
//       removeNode(obj) {
//         const { type } = obj;
//         if (type in removeNodeStrategy) {
//           removeNodeStrategy[type](obj);
//         } else {
//           // message.warning('无此操作');
//         }
//       },
//       beginEdit(obj) {
//         const { type } = obj;
//         if (type in beginEditStrategy) {
//           beginEditStrategy[type](obj);
//         } else {
//           // message.warning('无此操作');
//         }
//       },
//       finishEdit(obj) {
//         const { type } = obj;
//         if (type in finishEditStrategy) {
//           finishEditStrategy[type](obj);
//         } else {
//           // message.warning('无此操作');
//         }
//       },
//       copyDocument() {
//         const { selectNodeData } = self.state;
//         self.setState({ copyNode: [ deepCopy(selectNodeData) ] });
//         console.log(selectNodeData);
//       },
//       async pasteDocument() {
//         const { selectNodeData, copyNode } = self.state;
//         const copyDocument = copyNode[0];
//         if (copyDocument.length === 0) {
//           message.warning('请先复制文献');
//           return;
//         }

//         const temp = selectNodeData;
//         const { id: fileId } = copyDocument;
//         const tags = [ ...copyDocument.tags ];
//         const tagsTemp = getParentTags(temp);
//         // const tagsTemp = [];
//         // while (temp.type !== 'root') {
//         //   tagsTemp.push(temp.topic);
//         //   temp = temp.parent;
//         // }

//         let flag = false;
//         tagsTemp.forEach(tag => {
//           if (!tags.includes(tag)) {
//             tags.push(tag);
//             flag = true;
//           }
//         });
//         if (flag) {
//           tags.sort();
//           await dispatch('updateDocument', { fileId, tags });
//           self.setState({ copyNode: [] });
//           await updateTagStruct();
//           refreshMind();
//         } else {
//           message.warning('该文献已存在tag');
//         }
//       },
//     };
//     // 进行完操作后的回调
//     mind.bus.addListener('operation', operation => {
//       const { name, obj } = operation;
//       console.log(operation);
//       if (name in operationStrategy) {
//         operationStrategy[name](obj);
//       }
//     });
//     mind.bus.addListener('moveNodeBeforeOrAfter', () => {
//     });
//     mind.bus.addListener('selectNode', node => {
//       this.setState({ selectNodeData: node.data || node });
//     });

//     mind.moveNode = async function(...args) {
//       if (
//         !this.before.moveNode ||
//         (await this.before.moveNode.apply(this, args))
//       ) {
//         moveNode.apply(this, args);
//       }
//     };
//     mind.moveNodeBefore = async function(...args) {
//       if (
//         !this.before.moveNodeBefore ||
//         (await this.before.moveNodeBefore.apply(this, args))
//       ) {
//         moveNodeBefore.apply(this, args);
//       }
//     };
//     mind.moveNodeAfter = async function(...args) {
//       if (
//         !this.before.moveNodeAfter ||
//         (await this.before.moveNodeAfter.apply(this, args))
//       ) {
//         moveNodeAfter.apply(this, args);
//       }
//     };
//   }

//   render() {
//     return (
//       <>
//         <div className="outer">
//           <div id="map"></div>
//         </div>
//       </>
//     );
//   }
// }

