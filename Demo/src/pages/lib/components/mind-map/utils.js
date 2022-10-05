// /**
//  * @description: 提取 mindmap tag结构
//  * @param {*} origin mindmap nodeData
//  * @return {*} tag结构树
//  */
// export function copyMindmapStruct(origin) {
//   // 目标值先置为空
//   let target = null;
//   // 判断原始对象的数据类型
//   if (typeof origin === 'object' && origin !== null) {
//     // 判断拷贝的是数组还是对象
//     target = origin instanceof Array ? [] : {};
//     for (const key in origin) {
//       // 递归拷贝特定结构
//       if (Array.isArray(origin) && origin[key].type !== 'root' && origin[key].type !== 'tag') {
//         continue;
//       }
//       //   if(!Array.isArray(origin) && key !== 'topic'&&key !== 'children'&& key !== 'type'){
//       //     continue;
//       //   }

//       target[key] = copyMindmapStruct(origin[key], target[key]);
//     }
//   } else {
//     // 基本类型直接赋值
//     target = origin;
//   }
//   return target;
// }


// // /**
// //  * @description: 获得 tag list 防止添加tag时重名问题
// //  * @param {*} tagStruct tag结构树
// //  * @param {*} path  tag list
// //  * @param {*} tagsSet
// //  */
// // export function getTagSet(tagStruct, path, tagSet) {
// //   if (tagStruct) {
// //     if (path) {
// //       if (!tagSet.includes(path)) {
// //         tagSet.push(path);
// //       }
// //     }
// //     const children = tagStruct.children || [];
// //     for (let index = 0; index < children.length; index++) {
// //       const child = children[index];
// //       getTagSet(child, (path ? `${path}-` : '') + child.topic, tagSet);
// //     }
// //   }
// // }

// /**
//  * @description:
//  * @param {*} obj
//  * @param {*} tagsSet
//  */

// /**
//  * @description: 检查同级存在相似tag
//  * @param {*} obj 新建节点
//  * @return {*} 返回bool值
//  */
// export function checkPeerValid(obj) {
//   const peerNodes = obj.parent.children || [];
//   const peerTagNodes = peerNodes.filter(node => node.type === 'tag');
//   const peerTags = peerTagNodes.map(node => node.topic);
//   if (peerTags.includes(obj.topic)) {
//     return false;
//   }
//   return true;
// }

// /**
//  * @description: 检查祖先节点是否存在相似tag
//  * @param {*} obj 新建节点
//  * @return {*} 返回bool值
//  */
// export function checkAncestorValid(obj) {
//   let temp = obj.parent;
//   while (temp.type !== 'root') {
//     if (temp.topic === obj.topic) {
//       return false;
//     }
//     temp = temp.parent;
//   }
//   return true;
// }


// // /**
// //  * @description: 节点下的所有document添加新tag
// //  * @param {*} node 节点
// //  * @param {*} newTag  新标签
// //  * @param {*} toDispatch dispatch payload list
// //  */
// // export function changeTag(node, newTag = [], toDispatch = []) {
// //   if (node) {
// //     if (node.type === 'document') {
// //       console.log(node);
// //       const { fileId } = node;
// //       newTag.sort();
// //       toDispatch.push({ fileId, tags: newTag });
// //     }
// //     const children = node.children || [];
// //     for (let index = 0; index < children.length; index++) {
// //       const child = children[index];
// //       changeTag(child, child?.type === 'tag' ? Array.from(new Set([ ...newTag, child.topic ])) : newTag, toDispatch);
// //     }
// //   }
// // }

// // /**
// //  * @description: 更新节点下的所有document的tag
// //  * @param {*} node 节点
// //  * @param {*} toDispatch dispatch payload list
// //  */
// //  export function updateTag(node, toDispatch = []) {
// //   if (node) {
// //     if (node.type === 'document') {
// //       const { fileId } = node;
// //       let temp = node.parent;
// //       const newTag = [];
// //       while (temp.type !== 'root') {
// //         newTag.push(temp.topic);
// //         temp = temp.parent;
// //       }
// //       newTag.sort();
// //       toDispatch.push({ fileId, tags: newTag });
// //     }
// //     const children = node.children || [];
// //     for (let index = 0; index < children.length; index++) {
// //       const child = children[index];
// //       updateTag(child, toDispatch);
// //     }
// //   }
// // }


// function changeTag(node, toDispatch = [], illegalTas = []) {
//   if (node) {
//     if (node.type === 'document') {
//       const { fileId } = node;
//       let { tags } = node.data;
//       let newTag = getParentTags(node.parent);
//       tags = tags.filter(t => !illegalTas.includes(t));
//       newTag = Array.from(new Set([ ...tags, ...newTag ]));
//       newTag.sort();
//       toDispatch.push({ fileId, tags: newTag });
//     }
//     const children = node.children || [];
//     for (let index = 0; index < children.length; index++) {
//       const child = children[index];
//       changeTag(child, toDispatch, illegalTas);
//     }
//   }
// }

// /**
//  * @description: 获取该节点，祖先所有tag
//  * @param {*} node 节点
//  * @return {*}
//  */
// export function getParentTags(node) {
//   let tempNode = node.type === 'document' ? node.parent : node;
//   const tags = [];
//   while (tempNode.type !== 'root') {
//     tags.push(tempNode.topic);
//     tempNode = tempNode.parent;
//   }
//   return tags;
// }

// /**
//  * @description: 更新tag拖拽到tag时document的tag
//  * @param {*} node 节点
//  * @param {*} dispatch
//  * @param {*} illegalTags
//  */
// export async function tagToTag(node, dispatch, illegalTags = []) {
//   const toDispatch = [];
//   changeTag(node, toDispatch, illegalTags);
//   await Promise.all(toDispatch.map(disp => dispatch('updateDocument', disp)));
// }

// /**
//  * @description: 更新tag
//  * @param {*} node 节点
//  * @param {*} dispatch
//  * @param {*} illegalTags
//  */
// export async function renameTag(node, dispatch, illegalTas = []) {
//   const toDispatch = [];
//   changeTag(node, toDispatch, illegalTas);
//   await Promise.all(toDispatch.map(disp => dispatch('updateDocument', disp)));
// }

// /**
//  * @description 更新tag拖拽到root时document的tag
//  * @param {*} node 节点
//  * @param {*} dispatch
//  */
// export async function tagToRoot(node, dispatch, illegalTas) {
//   const toDispatch = [];
//   changeTag(node, toDispatch, illegalTas);
//   await Promise.all(toDispatch.map(disp => dispatch('updateDocument', disp)));
// }

// /**
//  * @description 删除节点所有document 与"该节点所在树枝"有关联的的tag
//  * @param {*} node 节点
//  * @param {*} dispatch dispatch list
//  */
// export function removeTag(node, toDispatch = []) {
//   if (node) {
//     if (node.type === 'document') {
//       const { fileId, data } = node;
//       const removeTags = getParentTags(node.parent);
//       const tags = data?.tags;
//       data.tags = tags.filter(tag => !removeTags.includes(tag));
//       toDispatch.push({ fileId, tags: data.tags });
//     }
//     const children = node.children || [];
//     for (let index = 0; index < children.length; index++) {
//       const child = children[index];
//       removeTag(child, toDispatch);
//     }
//   }
// }

// export function addTagStyle(node, E) {
//   if (node) {
//     if (node.type === 'tag' && node?.parent?.type !== 'root') {
//       const setStyles = {
//         fontWeight: 'normal',
//         backgroundColor: '#ffffff',
//         border: '1px solid #444444',
//         borderRadius: '5px',
//         color: '#735c45',
//         padding: '5px 9px',
//         position: 'relative',
//         top: '14px',
//         left: '-5px' };
//       try {
//         const tpc = E(node.id);
//         for (const key in setStyles) {
//           tpc.style[key] = setStyles[key];
//         }
//       } catch (error) {
//         console.log(error);
//       }

//     }
//     const children = node.children || [];
//     for (let index = 0; index < children.length; index++) {
//       const child = children[index];
//       addTagStyle(child, E);
//     }
//   }
// }

// /**
//  * @description: 检查是否同级存在相同节点
//  * @param {*}
//  * @return {*}
//  */
// export function checkDuplicate(node) {
//   const rootNode = node.parent;
//   const children = rootNode.children.filter(child => child.id !== node.id);
//   const peerTags = children.map(child => child.topic);
//   return !peerTags.includes(node.topic);

// }
