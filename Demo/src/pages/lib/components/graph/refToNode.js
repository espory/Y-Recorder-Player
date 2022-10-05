// function blankSymbolFilter(s) {
//   return s.replace(/\s+/g, '').toLowerCase();
// }

// function maxMatchLength(s1, s2) {
//   if (typeof s1 !== 'string' || typeof s2 !== 'string') {
//     return 0;
//   }
//   const maxLength = Math.min(s1.length, s2.length);
//   let i = 0;
//   for (; i < maxLength; i++) {
//     if (s1[i] !== s2[i]) {
//       break;
//     }
//   }
//   return i;
// }
// function genNode(id, label, data, shape = 'CircleNode') {
//   if (typeof data !== 'object') {
//     console.log('data should be object!');
//     data = {};
//   }
//   return {
//     id: String(id),
//     label,
//     data,
//     shape,
//   };
// }
// function genEdge(source, target, label = '引用', data = {}) {
//   return {
//     source: String(source),
//     target: String(target),
//     label,
//     data,
//   };
// }

// function expand(currentId, path, unHandled, nodeSet) {
//   if (nodeSet[currentId]) {
//     return { id: currentId };
//   }
//   const { title, refs, authors, id } = unHandled[currentId];
//   if (path[id]) {
//     console.log('数据错误,出现回路');
//     throw { name: 'circleError' };
//   }
//   path[id] = true;
//   nodeSet[id] = true;
//   let inTopicNodes = {};
//   const notInTopicNodes = [];
//   refs.forEach(ref => {
//     const { inTopic, raw } = ref;
//     if (inTopic) {
//       const expandNode = unHandled[inTopic];
//       if (inTopicNodes[inTopic] && raw !== inTopicNodes[inTopic]) {
//         const matchLength1 = maxMatchLength(blankSymbolFilter(expandNode.authors), blankSymbolFilter(raw));
//         const matchLength2 = maxMatchLength(blankSymbolFilter(expandNode.authors), blankSymbolFilter(inTopicNodes[inTopic]));
//         if (matchLength1 > matchLength2) {
//           notInTopicNodes.push(inTopicNodes[inTopic]);
//           inTopicNodes[inTopic] = raw;
//         } else {
//           notInTopicNodes.push(raw);
//         }
//       } else {
//         inTopicNodes[inTopic] = raw;
//       }
//     } else {
//       notInTopicNodes.push(raw);
//     }
//   });
//   inTopicNodes = Object.keys(inTopicNodes).map(id => {
//     return expand(id, Object.assign({}, path), unHandled, nodeSet);
//   });
//   return {
//     id,
//     authors,
//     title,
//     children: inTopicNodes.concat(notInTopicNodes),
//   };

// }
// // 以node为起点构建引用树
// export function genTrees(nodeList) {
//   const unHandled = {};
//   nodeList.forEach(node => {
//     const { id } = node;
//     unHandled[id] = node;
//   });
//   const trees = [];
//   const nodeTraveled = {};
//   for (const keys = Object.keys(unHandled); keys.length;) {
//     trees.push(expand(keys[0], {}, unHandled, nodeTraveled));
//     Object.keys(nodeTraveled).forEach(id => {
//       const idx = keys.indexOf(id);
//       if (idx >= 0) {
//         keys.splice(keys.indexOf(id), 1);
//       }
//     });
//   }
//   return trees;
// }

// export function genGraph(trees) {
//   const graphData = {
//     topicNodes: [],
//     topicEdges: [],
//     hiddenNodesMap: {},
//   };
//   // 为每个节点（topic内节点和默认隐藏的引用节点）分配图中的id
//   const fileIdToUId = {};
//   let uId = 0;
//   for (const tree of trees) {
//     const { title, authors, id } = tree;
//     graphData.topicNodes.push(genNode(uId, title, { authors, fileId: id }));
//     fileIdToUId[id] = uId;
//     uId = walkTree(tree, uId, graphData, fileIdToUId);
//   }
//   return graphData;
// }
// /**
//    * 遍历引用树
//    * @param {Object} root 树的根节点
//    * @param {Number} uId 根节点在图中的id
//    * @param {Object} graphData 绘制图需要的数据，点和边
//    * @param {Object} fileIdToUId fileId转成uId的map
//    */
// function walkTree(root, uId, graphData, fileIdToUId) {
//   const { topicNodes, topicEdges, hiddenNodesMap } = graphData;
//   // children是root节点引用的文章
//   const { children } = root;
//   const currentId = uId;
//   uId += 1;
//   if (children) {
//     const hiddenNodes = [];
//     const hiddenEdges = [];
//     children.forEach(c => {
//       // 组内文献
//       if (typeof c === 'object') {
//         const { id, title, authors } = c;
//         // 已经存在的node，只创建边，不再递归
//         if (fileIdToUId[id]) {
//           // 增加引用计数
//           topicNodes.forEach(it => {
//             // typeof it.id === 'string'
//             if (it.id === String(fileIdToUId[id])) {
//               it.data.count++;
//             }
//           });
//           topicEdges.push(genEdge(currentId, fileIdToUId[id]));
//         } else {
//           // 创建node和边
//           topicNodes.push(genNode(uId, title, { authors, count: 1, fileId: id }));
//           topicEdges.push(genEdge(currentId, uId));
//           fileIdToUId[id] = uId;
//           uId = walkTree(c, uId, graphData, fileIdToUId);
//         }
//       } else {
//       // 隐藏文献
//         hiddenNodes.push(genNode(uId, c, {}, 'SimplicityNode'));
//         hiddenEdges.push(genEdge(currentId, uId));
//         uId += 1;
//       }
//     });
//     hiddenNodesMap[currentId] = { hiddenNodes, hiddenEdges };
//   }
//   return uId;
// }

