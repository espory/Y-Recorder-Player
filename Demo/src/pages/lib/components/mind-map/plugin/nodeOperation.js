// function createExpander(expanded) {
//   const expander = document.createElement('epd');
//   // 包含未定义 expanded 的情况，未定义视为展开
//   expander.innerHTML = expanded !== false ? '-' : '+';
//   expander.expanded = expanded !== false;
//   expander.className = expanded !== false ? 'minus' : '';
//   return expander;
// }

// const E = (id, me) => {
//   const scope = me ? me.mindElixirBox : document;
//   return scope.querySelector(`[data-nodeid=me${id}]`);
// };


// function removeNodeObj(obj) {
//   const childrenList = obj.parent.children;
//   const index = childrenList.indexOf(obj);
//   childrenList.splice(index, 1);
//   return childrenList.length;
// }
// function moveNodeObj(from, to) {
//   removeNodeObj(from);
//   if (to.children) to.children.push(from);
//   else to.children = [ from ];
// }

// function checkMoveValid(from, to) {
//   let valid = false;
//   if (
//     from.type === 'tag' && to.type === 'root' // tag可以移动到root后
//   || from.type === to.type && to.type === 'tag' // tag可以移动到tag后
//   || from.type === 'document' && to.type === 'tag' // document可以移动到tag后
//   // || from.type === 'comment' && to.type === 'document'// comment可以移动到document后
//   ) {
//     valid = true;
//   }
//   if (from.parent === to) {
//     valid = false;
//   }
//   return valid;
// }

// function checkMoveBeforeValid() {
//   return false;

// }
// function checkMoveAfterValid() {
//   return false;
// }

// function addParentLink(data, parent) {
//   data.parent = parent;
//   if (data.children) {
//     for (let i = 0; i < data.children.length; i++) {
//       addParentLink(data.children[i], data);
//     }
//   }
// }


// export const moveNode = function(from, to) {
//   const fromObj = from.nodeObj;
//   const toObj = to.nodeObj;
//   if (!checkMoveValid(fromObj, toObj)) {
//     console.warn('Invalid move');
//     return;
//   }
//   const originParentId = fromObj.parent.id;
//   if (toObj.expanded === false) {
//     this.expandNode(to, true);
//     from = E(fromObj.id);
//     to = E(toObj.id);
//   }
//   console.time('moveNode');
//   moveNodeObj(fromObj, toObj);
//   addParentLink(this.nodeData); // update parent property
//   const fromTop = from.parentElement;
//   const fromChilren = fromTop.parentNode.parentNode;
//   const toTop = to.parentElement;
//   if (fromChilren.className === 'box') {
//     // clear svg group of primary node
//     fromTop.parentNode.lastChild.remove();
//   } else if (fromTop.parentNode.className === 'box') {
//     fromTop.style.cssText = ''; // clear style
//   }
//   if (toTop.tagName === 'T') {
//     if (fromChilren.className === 'box') {
//       // clear direaction class of primary node
//       fromTop.parentNode.className = '';
//     }
//     if (toTop.children[1]) {
//       // expander exist
//       toTop.nextSibling.appendChild(fromTop.parentNode);
//     } else {
//       // expander not exist, no child
//       const c = document.createElement('children');
//       c.appendChild(fromTop.parentNode);
//       toTop.appendChild(createExpander(true));
//       toTop.parentElement.insertBefore(c, toTop.nextSibling);
//     }
//   } else if (toTop.tagName === 'ROOT') {
//     this.processPrimaryNode(fromTop.parentNode, fromObj);
//     toTop.nextSibling.appendChild(fromTop.parentNode);
//   }
//   this.linkDiv();
//   this.bus.fire('operation', {
//     name: 'moveNode',
//     obj: { fromObj, toObj, originParentId },
//   });
//   console.timeEnd('moveNode');
// };

// export const moveNodeBefore = function(from, to) {
//   const fromObj = from.nodeObj;
//   const toObj = to.nodeObj;
//   if (!checkMoveBeforeValid(fromObj, toObj)) {
//     return;
//   }
//   this.bus.fire('moveNodeBeforeOrAfter', { fromObj, toObj });
// };

// export const moveNodeAfter = function(from, to) {
//   const fromObj = from.nodeObj;
//   const toObj = to.nodeObj;
//   if (!checkMoveAfterValid(fromObj, toObj)) {
//     console.warn('Invalid move');
//     return;
//   }
//   const toObjParent = toObj.parent;
//   moveNode(fromObj, toObjParent);
// };

// export const expandNode = function(el, isExpand) {
//   const node = el.nodeObj;
//   if (typeof isExpand === 'boolean') {
//     node.expanded = isExpand;
//   } else if (node.expanded !== false) {
//     node.expanded = false;
//   } else {
//     node.expanded = true;
//   }
//   // TODO 在此函数构造 html 结构，而非调用 layout
//   this.layout();
//   this.linkDiv();
//   this.addTagStyle();
// };
