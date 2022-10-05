// import dayjs from 'dayjs';
// import md5 from 'md5';
// const lightStarLogo = '<svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#fadb14" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>';
// const darkStarLogo = '<svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#c5c5c5" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>';
// const fileLogo = '<svg viewBox="64 64 896 896" focusable="false" data-icon="file-pdf" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M509.2 490.8c-.7-1.3-1.4-1.9-2.2-2-2.9 3.3-2.2 31.5 2.7 51.4 4-13.6 4.7-40.5-.5-49.4zm-1.6 120.5c-7.7 20-18.8 47.3-32.1 71.4 4-1.6 8.1-3.3 12.3-5 17.6-7.2 37.3-15.3 58.9-20.2-14.9-11.8-28.4-27.7-39.1-46.2z" fill="#e6f7ff"></path><path d="M534 352V136H232v752h560V394H576a42 42 0 01-42-42zm55 287.6c16.1-1.9 30.6-2.8 44.3-2.3 12.8.4 23.6 2 32 5.1.2.1.3.1.5.2.4.2.8.3 1.2.5.5.2 1.1.4 1.6.7.1.1.3.1.4.2 4.1 1.8 7.5 4 10.1 6.6 9.1 9.1 11.8 26.1 6.2 39.6-3.2 7.7-11.7 20.5-33.3 20.5-21.8 0-53.9-9.7-82.1-24.8-25.5 4.3-53.7 13.9-80.9 23.1-5.8 2-11.8 4-17.6 5.9-38 65.2-66.5 79.4-84.1 79.4-4.2 0-7.8-.9-10.8-2-6.9-2.6-12.8-8-16.5-15-.9-1.7-1.6-3.4-2.2-5.2-1.6-4.8-2.1-9.6-1.3-13.6l.6-2.7c.1-.2.1-.4.2-.6.2-.7.4-1.4.7-2.1 0-.1.1-.2.1-.3 4.1-11.9 13.6-23.4 27.7-34.6 12.3-9.8 27.1-18.7 45.9-28.4 15.9-28 37.6-75.1 51.2-107.4-10.8-41.8-16.7-74.6-10.1-98.6.9-3.3 2.5-6.4 4.6-9.1.2-.2.3-.4.5-.6.1-.1.1-.2.2-.2 6.3-7.5 16.9-11.9 28.1-11.5 16.6.7 29.7 11.5 33 30.1 1.7 8 2.2 16.5 1.9 25.7v.7c0 .5 0 1-.1 1.5-.7 13.3-3 26.6-7.3 44.7-.4 1.6-.8 3.2-1.2 5.2l-1 4.1-.1.3c.1.2.1.3.2.5l1.8 4.5c.1.3.3.7.4 1 .7 1.6 1.4 3.3 2.1 4.8v.1c8.7 18.8 19.7 33.4 33.9 45.1 4.3 3.5 8.9 6.7 13.9 9.8 1.8-.5 3.5-.7 5.3-.9z" fill="#e6f7ff"></path><path d="M391.5 761c5.7-4.4 16.2-14.5 30.1-34.7-10.3 9.4-23.4 22.4-30.1 34.7zm270.9-83l.2-.3h.2c.6-.4.5-.7.4-.9-.1-.1-4.5-9.3-45.1-7.4 35.3 13.9 43.5 9.1 44.3 8.6z" fill="#e6f7ff"></path><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" fill="#1890ff"></path><path d="M535.9 585.3c-.8-1.7-1.5-3.3-2.2-4.9-.1-.3-.3-.7-.4-1l-1.8-4.5c-.1-.2-.1-.3-.2-.5l.1-.3.2-1.1c4-16.3 8.6-35.3 9.4-54.4v-.7c.3-8.6-.2-17.2-2-25.6-3.8-21.3-19.5-29.6-32.9-30.2-11.3-.5-21.8 4-28.1 11.4-.1.1-.1.2-.2.2-.2.2-.4.4-.5.6-2.1 2.7-3.7 5.8-4.6 9.1-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.4-51.2 107.4v.1c-27.7 14.3-64.1 35.8-73.6 62.9 0 .1-.1.2-.1.3-.2.7-.5 1.4-.7 2.1-.1.2-.1.4-.2.6-.2.9-.5 1.8-.6 2.7-.9 4-.4 8.8 1.3 13.6.6 1.8 1.3 3.5 2.2 5.2 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-2.6-2.6-6-4.8-10.1-6.6-.1-.1-.3-.1-.4-.2-.5-.2-1.1-.4-1.6-.7-.4-.2-.8-.3-1.2-.5-.2-.1-.3-.1-.5-.2-16.2-5.8-41.7-6.7-76.3-2.8l-5.3.6c-5-3-9.6-6.3-13.9-9.8-14.2-11.3-25.1-25.8-33.8-44.7zM391.5 761c6.7-12.3 19.8-25.3 30.1-34.7-13.9 20.2-24.4 30.3-30.1 34.7zM507 488.8c.8.1 1.5.7 2.2 2 5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4zm-19.2 188.9c-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4 10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2zm175.4-.9c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4z" fill="#1890ff"></path></svg>';
// const newLogo = '<svg t="1620885089432" viewBox="0 0 1941 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11775" width="2em" height="1em"><path d="M0 0h1941.853659v1024H0z" fill="#FC444C" p-id="11776"></path><path d="M661.853659 774.243902h-151.93496l-193.560975-414.178861-2.081301 2.0813v410.016261h-99.902439V278.894309h158.178862l187.317073 391.284553 2.081301-2.081301V278.894309h99.902439v495.349593zM745.105691 774.243902V278.894309h333.00813v83.252032H853.333333v114.471545h208.130082v83.252033H853.333333v131.121951h233.105691v83.252032H745.105691zM1319.544715 651.447154L1415.284553 278.894309h120.715447l85.333333 372.552845h2.081301l81.170732-372.552845h99.902439l-126.95935 495.349593H1560.97561L1471.479675 395.447154l-95.739838 378.796748h-120.715447l-120.715447-495.349593h110.308943l74.926829 372.552845z" fill="#FFFFFF" p-id="11777"></path></svg>';

// export const spliteMark = '@#$';

// export function parseData({ libraryList = [], topicName = '未命名', mindmapStruct = {} }) {
//   // const colors = [ '#ff4d4f' ];
//   // const colorsLen = colors.length;

//   // mindmapStruct = mindmapStructMock;

//   const tagStruct = mindmapStruct.tagStruct;
//   // const tagStruct = copyMindmapStruct(obj.nodeData);
//   const tagsMap = {}; // 存储每个tag对应的所有文献
//   let nodeData = {};
//   if (tagStruct) {
//     getMapByStruct(tagStruct, tagsMap, libraryList); // 指定结构的tagsMap
//     nodeData = generateNodedataBystruct(tagStruct, tagsMap, topicName);

//     const tempMap = {}; // 同步主页表格新增文献的tag
//     const filLib = filterLib(libraryList, tagsMap); // 过滤Lib
//     getMapByLib(tempMap, filLib);
//     // const tagsKeys = Object.keys(tagsMap);
//     const tempKeys = Object.keys(tempMap);
//     for (const tag of tempKeys) {
//       // if (tagsKeys.some(t => t.includes(tag))) {
//       //   continue;
//       // }
//       // for (const tag of tempKeys) {
//       //   const re = new RegExp(`^${tag}`, 'g');
//       //   const filterRes = tagsKeys.filter(t => t.match(re));
//       //   if (filterRes.length === 0) {
//       //     continue;
//       //   }
//       //   for (let index = tempMap[tag].length - 1; index >= 0; index--) {
//       //     const docId = tempMap[tag][index].id;
//       //     for (const dcs of filterRes) {
//       //       if (tagsMap[dcs].some(t => t.id === docId)) {
//       //         tempMap[tag].splice(index, 1);
//       //         break;
//       //       }
//       //     }
//       //   }
//       //   if (tempKeys[tag].length === 0) {
//       //     continue;
//       //   }
//       nodeData.children.push(generateTagNode(tag, tempMap));
//     }
//   } else {
//     getMapByLib(tagsMap, libraryList); // 从libraryList生成tagsMap
//     nodeData = generateNodedataByLib(tagsMap, topicName);
//   }
//   addParentLink(nodeData);
//   dfsDelete(nodeData);
//   if (nodeData.children.length === 0) {
//     nodeData.topic = '尚无可分析 tag ，请为文献添加 tag 后使用';
//   }
//   return { nodeData, linkData: {} };
// }

// function filterLib(libraryList, tagsMap) {
//   const idTagMap = {};
//   for (const tags in tagsMap) {
//     const tags_ = tags.split(spliteMark);
//     const docList = tagsMap[tags] || [];
//     for (const tag of tags_) {
//       for (const doc of docList) {
//         const id = doc.id;
//         if (!(id in idTagMap)) {
//           idTagMap[id] = [];
//         }
//         idTagMap[id].push(tag);
//       }
//     }
//   }
//   const Lib = [];
//   for (const doc of libraryList) {
//     const id = doc.id;
//     if (!(id in idTagMap)) {
//       if (doc.tags.length > 0) {
//         Lib.push(doc);
//       }
//       continue;
//     }
//     const tags = doc.tags;
//     const tempDoc = { ...doc, tags: [] };
//     const tags_ = idTagMap[id];
//     for (const t of tags) {
//       if (tags_.includes(t)) {
//         continue;
//       }
//       tempDoc.tags.push(t);
//     }
//     if (tempDoc.tags.length > 0) {
//       Lib.push(tempDoc);
//     }
//   }
//   return Lib;
// }

// function addParentLink(data, parent) {
//   data.parent = parent;
//   if (data.children) {
//     for (let i = 0; i < data.children.length; i++) {
//       addParentLink(data.children[i], data);
//     }
//   }
// }

// /**
//  * @description: 删除没有document的tag
//  * @param {*} node
//  * @return {*}
//  */
// function dfsDelete(node) {
//   if (node) {
//     if (node.type === 'tag' && node.children.length === 0) {
//       let temp = node.parent;
//       let topic = node.topic;
//       while (temp.type !== 'root' && temp.children.length <= 1) {
//         topic = temp.topic;
//         temp = temp.parent;
//       }
//       const delInx = temp.children.findIndex(e => e.topic === topic);
//       temp.children.splice(delInx, 1);
//     }
//     const children = node.children || [];
//     // 从后往前扫，删除数组某个子项时，其他子项顺序index不发生改变
//     for (let index = children.length - 1; index >= 0; index--) {
//       const child = children[index];
//       dfsDelete(child);
//     }
//   }
// }

// // function addTagStyle(node) {


// //   if (node) {
// //     const type = node.type;
// //     if (type === 'tag') {
// //       if (node.parent && node.parent.type !== 'root') {
// //         node.style = {};
// //       } else {
// //         node.style = { fontSize: '32', color: 'red', background: '#ecf0f1' };
// //       }
// //     }
// //     node.children = node.children || [];
// //     node.children = node.children.filter(child => Boolean(child));
// //     const children = node.children;
// //     for (let index = 0; index < children.length; index++) {
// //       const child = children[index];
// //       addTagStyle(child);
// //     }
// //   }
// // }

// function dfsGenerate(node, tagsMap, topicName, path) {
//   if (node) {
//     const type = node.type;
//     if (type === 'root') {
//       node.topic = topicName;
//     } else if (type === 'tag') {
//       node.path = path;
//       node.id = `-tag-${md5(path)}`;
//       const key = node.path;
//       const children = node.children;
//       const docs = tagsMap[key] || [];
//       docs.forEach(doc => {
//         const docNode = generateDocNode(doc);
//         children.unshift(docNode);
//       });
//     }
//     node.children = node.children || [];
//     node.children = node.children.filter(child => Boolean(child));
//     const children = node.children;
//     for (let index = 0; index < children.length; index++) {
//       const child = children[index];
//       dfsGenerate(child, tagsMap, topicName, (path ? `${path}${spliteMark}` : '') + child?.topic);
//     }
//   }
// }
// function generateNodedataBystruct(tagStruct, tagsMap, topicName) {
//   dfsGenerate(tagStruct, tagsMap, topicName, '');
//   return tagStruct;
// }

// function generateNodedataByLib(tagsMap, topicName) {
//   const nodeData = {
//     id: 'root',
//     type: 'root',
//     topic: topicName,
//     root: true,
//     data: { },
//     children: [],
//     expanded: true,
//   };
//   for (const tag in tagsMap) {
//     const tagSplite = tag.split(spliteMark).reverse();
//     if (tagSplite.length > 1) { // 复合多层tag
//       const tagNodes = [];
//       tagSplite.forEach((tag, index) => {
//         const genTag = generateTagNode(tag, tagsMap);
//         if (index > 0) {
//           genTag.push(tagNodes[index - 1]);
//         }
//         tagNodes.push(genTag);
//       });
//       nodeData.children;
//     } else { // 单层tag
//       const res = generateTagNode(tag, tagsMap);
//       nodeData.children.push(res);
//     }
//   }
//   return nodeData;
// }

// function dfsMindmapStruct(node, path, tagsMap) {
//   if (node) {
//     // node.path = path;
//     if (path) {
//       tagsMap[path] = [];
//     }
//     const children = node.children || [];
//     for (let index = 0; index < children.length; index++) {
//       const child = children[index];
//       dfsMindmapStruct(child, (path ? `${path}${spliteMark}` : '') + child?.topic, tagsMap);
//     }
//   }
// }

// function getMapByStruct(tagStruct, tagsMap, libraryList) {
//   // for (let index = 0; index < tagStruct.length; index++) {
//   //   const tag = tagStruct[index];
//   //   if (tag in tagsMap) {
//   //     continue;
//   //   }
//   //   if (typeof tag === 'array') {
//   //     const tagSplite = tag.map((element, index) => (tag.slice(0, index + 1).join(spliteMark))); // 将 ['a','b','c'] 转换成['a','a-b','a-b-c']; '-'为分隔符
//   //     tagSplite.forEach(element => {
//   //       if (!(element in tagsMap)) {
//   //         tagsMap[element] = [];
//   //       }
//   //     });
//   //   } else {
//   //     tagsMap[tag] = [];
//   //   }
//   // }
//   dfsMindmapStruct(tagStruct, '', tagsMap); // 深度遍历mindmap struct tree ， 对每一条”树枝“创建数组

//   for (const doc of libraryList) {
//     const tags = doc.tags || [];
//     if (tags.length === 0) {
//       continue;
//     }
//     const tag = tags.join(spliteMark);
//     if (tag in tagsMap) {
//       tagsMap[tag].push(doc);
//     } else {
//       // 解决文献有多个tag，因为tag与保存struct顺序不一致导致问题，比如 A文献有 t1、t2两个标签，但保存结构时是按照t2、t1保存的，显然t1、t2和t2、t1是一致的
//       const keys = Object.keys(tagsMap);
//       keys.sort((a, b) => String(a).length < String(b).length); // 排序为删除同分支doc作准备
//       for (const key of keys) {
//         let flag = true;
//         const keyArray = key.split(spliteMark);
//         for (const k of keyArray) {
//           if (!tag.split(spliteMark).some(e => e === k)) {
//             flag = false;
//           }
//         }
//         if (flag) {
//           tagsMap[key].push(doc);

//           // 这里需要删除同分支doc，比如 doc1 同时拥有 A、B标签，也存在 A-B节点树，此时如果不做删除处理，A、和A-B会同时拥有doc1，但我们只想A-B拥有doc1
//           for (let index = 0; index < keys.length && keys[index] !== key; index++) {
//             const k = keys[index];
//             if (key.includes(k)) {
//               const delInx = tagsMap[k].findIndex(e => e.id === doc.id);
//               if (delInx > -1) {
//                 tagsMap[k].splice(delInx, 1);
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

// function getMapByLib(tagsMap, libraryList) {
//   for (let index = 0; index < libraryList.length; index++) {
//     const doc = libraryList[index];
//     if ('tags' in doc && doc.tags.length > 0) {
//       const tags = doc.tags;
//       tags.forEach(tag => {
//         if (!(tag in tagsMap)) {
//           tagsMap[tag] = [];
//         }
//         tagsMap[tag].push(doc);
//       });
//     }
//   }
// }

// function generateTagNode(key, tagsMap) {
//   const key_format = key.trim();
//   const tagNode = {
//     topic: key_format,
//     id: `-tag-${md5(key_format)}`,
//     type: 'tag',
//     selected: true,
//     new: true,
//     direction: 0,
//     expanded: true,
//     children: [],
//   };

//   const children = tagNode.children;
//   const docs = tagsMap[key];
//   docs.forEach(doc => {
//     const docNode = generateDocNode(doc);
//     children.push(docNode);
//   });

//   return tagNode;
// }

// function generateDocNode(doc) {

//   const { id, title, alias, authors, extra, updated_at } = doc;
//   const { year, journal, booktitle, venue } = extra;
//   const { fileUrl = '', comments, mark } = doc;
//   const markMax = 5;
//   const markdis = markMax - mark;
//   const showMark = [];
//   for (let index = 0; index < mark; index++) {
//     showMark.push(lightStarLogo);
//   }
//   for (let index = 0; index < markdis; index++) {
//     showMark.push(darkStarLogo);
//   }

//   const showAuthor = authors[0]?.split(' ').pop() || '';
//   const showTitle = title.split(' ')[0];
//   let pub = [ venue, booktitle, journal ];
//   pub = pub.filter(item => Boolean(item));
//   pub.sort((a, b) => a.length - b.length);
//   const docNode = {
//     topic: alias ? alias : title,
//     id: '-document-' + id,
//     fileId: id,
//     // style: { color: updated_at.indexOf('分钟') !== -1 ? colors[index % colorsLen] : '#666666' },
//     tags: [ `[${showAuthor ? showAuthor : ''}${year ? year : ''}${showTitle ? showTitle : ''}]`, showMark.join(''), pub.length ? pub[0] : '' ],
//     // 判断是否添加文件logo 和 NEW logo
//     icons: [ fileUrl === '' ? '' : `  ${fileLogo}`,
//       updated_at.indexOf('分钟') === -1 ? '' : `  ${newLogo}`,
//     ],

//     type: 'document',
//     data: doc,
//     selected: true,
//     expanded: false,
//     new: false,
//     children: [],
//   };

//   docNode.children = comments.map(generateCommentNode);
//   return docNode;
// }

// function generateCommentNode(comment) {
//   const { id, content, created_at, userName } = comment;
//   const time = dayjs(created_at).format('MM-DD hh:mm');
//   return {
//     topic: content,
//     tags: [ `${userName}`, `${time}` ],
//     id: '-comment-' + id,
//     commentId: id,
//     type: 'comment',
//     expanded: false,
//     new: false,
//   };
// }
