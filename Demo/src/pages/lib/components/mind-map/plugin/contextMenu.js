// import i18n from './i18n';

// const showMenuItem = {
//   root: [ 'add_child' ],
//   tag: [ 'add_child', 'paste_document', 'remove_child', 'focus', 'unfocus' ],
//   document: [ 'open_pdf', 'add_child', 'copy_document', 'remove_child' ],
//   comment: [ 'remove_child' ],
//   default: [],
// };
// // open_pdf, focus, unfocus,up, down, add_sibling, remove_child, add_child,

// export default function(mind, option) {
//   const createTips = words => {
//     const div = document.createElement('div');
//     div.innerHTML = words;
//     div.style.cssText = 'position:absolute;bottom:20px;left:50%;transform:translateX(-50%);';
//     return div;
//   };
//   const createLi = (id, name, keyname) => {
//     const li = document.createElement('li');
//     li.id = id;
//     li.innerHTML = `<span>${name}</span><span>${keyname}</span>`;
//     return li;
//   };
//   const locale = i18n[mind.locale] ? mind.locale : 'en';

//   const open_pdf = createLi('cm-add_pdf', i18n[locale].openPdf, '');
//   const add_child = createLi('cm-add_child', i18n[locale].addChild, '');
//   const add_sibling = createLi('cm-add_sibling', i18n[locale].addSibling, '');
//   const copy_document = createLi('cm-copy', i18n[locale].copy, '');
//   const paste_document = createLi('cm-paste', i18n[locale].paste, '');
//   const remove_child = createLi(
//     'cm-remove_child',
//     i18n[locale].removeNode,
//     ''
//   );
//   const focus = createLi('cm-fucus', i18n[locale].focus, '');
//   const unfocus = createLi('cm-unfucus', i18n[locale].cancelFocus, '');
//   const up = createLi('cm-up', i18n[locale].moveUp, '');
//   const down = createLi('cm-down', i18n[locale].moveDown, '');
//   const link = createLi('cm-down', i18n[locale].link, '');

//   const menuUl = document.createElement('ul');
//   menuUl.className = 'menu-list';
//   menuUl.appendChild(open_pdf);
//   menuUl.appendChild(add_child);
//   menuUl.appendChild(add_sibling);
//   menuUl.appendChild(copy_document);
//   menuUl.appendChild(paste_document);
//   menuUl.appendChild(remove_child);
//   if (!option || option.focus) {
//     menuUl.appendChild(focus);
//     menuUl.appendChild(unfocus);
//   }
//   menuUl.appendChild(up);
//   menuUl.appendChild(down);
//   if (!option || option.link) {
//     menuUl.appendChild(link);
//   }
//   if (option && option.extend) {
//     for (let i = 0; i < option.extend.length; i++) {
//       const item = option.extend[i];
//       const dom = createLi(item.name, item.name, '');
//       menuUl.appendChild(dom);
//       dom.onclick = e => {
//         item.onclick(e);
//       };
//     }
//   }
//   const menuContainer = document.createElement('cmenu');
//   menuContainer.appendChild(menuUl);
//   menuContainer.hidden = true;
//   mind.container.append(menuContainer);

//   const menuItemMap = {
//     open_pdf, focus, unfocus, up, down, add_sibling, remove_child, add_child, paste_document, copy_document,
//   };
//   const menuItems = Object.keys(menuItemMap);

//   const isRoot = false;
//   let haveFile = false;
//   mind.container.oncontextmenu = function(e) {
//     e.preventDefault();
//     console.log(e);
//     // const { haveFile = false } = option;
//     // console.log(e.pageY, e.screenY, e.clientY)
//     let target = e.target;
//     console.log(e.target);
//     if (target.className === 'tags') {
//       target = target.parentElement;
//     }
//     const nodeObj = target.nodeObj;
//     const TYPE = target?.nodeObj?.type || 'default';
//     if (target.tagName === 'TPC') {
//       menuItems.forEach(item => {
//         menuItemMap[item].style.display = 'none';
//       });
//       if (Object.keys(showMenuItem).includes(TYPE)) {
//         showMenuItem[TYPE].forEach(item => {
//           if (item in menuItemMap) {
//             console.log(menuItemMap[item]);
//             menuItemMap[item].style.display = 'block';
//           }
//           if (item === 'open_pdf') {
//             haveFile = nodeObj.data.fileUrl !== '';
//             menuItemMap[item].className = haveFile ? '' : 'disabled';
//           }
//         });
//       }

//       mind.selectNode(target);
//       menuContainer.hidden = false;
//       const height = menuUl.offsetHeight;
//       const width = menuUl.offsetWidth;
//       if (height + e.clientY > window.innerHeight) {
//         menuUl.style.top = '';
//         menuUl.style.bottom = '0px';
//       } else {
//         menuUl.style.bottom = '';
//         menuUl.style.top = e.clientY + 15 + 'px';
//       }
//       if (width + e.clientX > window.innerWidth) {
//         menuUl.style.left = '';
//         menuUl.style.right = '0px';
//       } else {
//         menuUl.style.right = '';
//         menuUl.style.left = e.clientX + 10 + 'px';
//       }
//     }
//   };

//   menuContainer.onclick = e => {
//     if (e.target === menuContainer) menuContainer.hidden = true;
//   };

//   open_pdf.onclick = () => {
//     if (haveFile) {
//       mind.openPdf();
//       menuContainer.hidden = true;
//     }
//   };
//   add_child.onclick = () => {
//     mind.addChild();
//     menuContainer.hidden = true;
//   };
//   copy_document.onclick = () => {
//     mind.bus.fire('operation', {
//       name: 'copyDocument',
//     });
//     menuContainer.hidden = true;
//   };
//   paste_document.onclick = () => {
//     mind.bus.fire('operation', {
//       name: 'pasteDocument',
//     });
//     menuContainer.hidden = true;
//   };
//   add_sibling.onclick = () => {
//     if (isRoot) return;
//     mind.insertSibling();
//     menuContainer.hidden = true;
//   };
//   remove_child.onclick = () => {
//     if (isRoot) return;
//     mind.removeNode();
//     menuContainer.hidden = true;
//   };
//   focus.onclick = () => {
//     console.log(6667777, isRoot);
//     if (isRoot) return;
//     mind.focusNode(mind.currentNode);
//     menuContainer.hidden = true;
//   };
//   unfocus.onclick = () => {
//     mind.cancelFocus();
//     menuContainer.hidden = true;
//   };
//   up.onclick = () => {
//     if (isRoot) return;
//     mind.moveUpNode();
//     menuContainer.hidden = true;
//   };
//   down.onclick = () => {
//     if (isRoot) return;
//     mind.moveDownNode();
//     menuContainer.hidden = true;
//   };
//   link.onclick = () => {
//     menuContainer.hidden = true;
//     const from = mind.currentNode;
//     const tips = createTips(i18n[locale].clickTips);
//     mind.container.appendChild(tips);
//     mind.map.addEventListener(
//       'click',
//       e => {
//         e.preventDefault();
//         tips.remove();
//         if (
//           e.target.parentElement.nodeName === 'T' ||
//           e.target.parentElement.nodeName === 'ROOT'
//         ) {
//           mind.createLink(from, mind.currentNode);
//         } else {
//           console.log('取消连接');
//         }
//       },
//       {
//         once: true,
//       }
//     );
//   };
// }
