
// const E = (id, me) => {
//   const scope = me ? me.mindElixirBox : document;
//   return scope.querySelector(`[data-nodeid=me${id}]`);
// };

// const dragMoveHelper = {
//   afterMoving: false, // 区别click事件
//   mousedown: false,
//   lastX: null,
//   lastY: null,
//   onMove(e, container) {
//     if (this.mousedown) {
//       this.afterMoving = true;
//       if (!this.lastX) {
//         this.lastX = e.pageX;
//         this.lastY = e.pageY;
//         return;
//       }
//       const deltaX = this.lastX - e.pageX;
//       const deltaY = this.lastY - e.pageY;
//       container.scrollTo(
//         container.scrollLeft + deltaX,
//         container.scrollTop + deltaY
//       );
//       this.lastX = e.pageX;
//       this.lastY = e.pageY;
//     }
//   },
//   clear() {
//     this.afterMoving = false;
//     this.mousedown = false;
//     this.lastX = null;
//     this.lastY = null;
//   },
// };

// const throttle = (fn, wait) => {
//   let pre = Date.now();
//   return function() {
//     const context = this;
//     const args = arguments;
//     const now = Date.now();
//     if (now - pre >= wait) {
//       fn.apply(context, args);
//       pre = Date.now();
//     }
//   };
// };

// const $d = document;
// let meet;

// export const clearPreview = function(el) {
//   if (!el) {
//     return el;
//   }
//   const query = el.getElementsByClassName('insert-preview');
//   for (const queryElement of query || []) {
//     queryElement.remove();
//   }
// };

// export const insertPreview = function(el, insertLocation) {
//   if (!insertLocation) {
//     clearPreview(el);
//     return el;
//   }
//   const query = el.getElementsByClassName('insert-preview');
//   const className = `insert-preview ${insertLocation} show`;
//   if (query.length > 0) {
//     query[0].className = className;
//   } else {
//     const insertPreviewEL = $d.createElement('div');
//     insertPreviewEL.className = className;
//     el.appendChild(insertPreviewEL);
//   }
//   return el;
// };


// export const canPreview = function(el, dragged) {
//   const isContain = dragged.parentNode.parentNode.contains(el);
//   return (
//     el &&
//     el.tagName === 'TPC' &&
//     el !== dragged &&
//     !isContain
//     // && el.nodeObj.root !== true
//   );
// };

// export default function(mind) {
//   let dragged;
//   let insertLocation;
//   const threshold = 12;
//   /* events fired on the draggable target */
//   mind.map.addEventListener(
//     'drag',
//     throttle(function(event) {
//       console.log(event.clientX, event.clientY - threshold);
//       const topMeet = $d.elementFromPoint(
//         event.clientX,
//         event.clientY - threshold
//       );
//       if (canPreview(topMeet, dragged)) {
//         meet = topMeet;
//         const y = topMeet.getBoundingClientRect().y;
//         if (event.clientY > y + topMeet.clientHeight) {
//           insertLocation = 'after';
//         } else if (event.clientY > y + topMeet.clientHeight / 2) {
//           insertLocation = 'in';
//         }
//       } else {
//         const bottomMeet = $d.elementFromPoint(
//           event.clientX,
//           event.clientY + threshold
//         );
//         if (canPreview(bottomMeet, dragged)) {
//           meet = bottomMeet;
//           const y = bottomMeet.getBoundingClientRect().y;
//           if (event.clientY < y) {
//             insertLocation = 'before';
//           } else if (event.clientY < y + bottomMeet.clientHeight / 2) {
//             insertLocation = 'in';
//           }
//         } else {
//           insertLocation = meet = null;
//         }
//       }
//       if (meet) insertPreview(meet, insertLocation);
//     }, 100)
//   );

//   mind.map.addEventListener('dragstart', function(event) {
//     // store a ref. on the dragged elem
//     dragged = event.target;
//     dragged.parentNode.parentNode.style.opacity = 0.5;
//     dragMoveHelper.clear();
//   });

//   mind.map.addEventListener('dragend', async function(event) {
//     // reset the transparency
//     console.log(123, event);
//     event.target.style.opacity = '';
//     clearPreview(meet);
//     const obj = dragged.nodeObj;
//     switch (insertLocation) {
//       case 'before':
//         mind.moveNodeBefore(dragged, meet);
//         mind.selectNode(E(obj.id));
//         break;
//       case 'after':
//         mind.moveNodeAfter(dragged, meet);
//         mind.selectNode(E(obj.id));
//         break;
//       case 'in':
//         mind.moveNode(dragged, meet);
//         break;
//       default:
//         break;
//     }
//     dragged.parentNode.parentNode.style.opacity = 1;
//     dragged = null;
//   });

//   /* events fired on the drop targets */
//   mind.map.addEventListener('dragover', function(event) {
//     // prevent default to allow drop
//     event.preventDefault();
//   });

//   mind.map.addEventListener('dragenter', function() {
//     // if (event.target.tagName == 'TPC' && event.target !== dragged) {
//     //   event.target.style.opacity = 0.5
//     // }
//   });

//   mind.map.addEventListener('dragleave', function() {
//     // if (event.target.tagName == 'TPC' && event.target !== dragged) {
//     //   event.target.style.opacity = 1
//     // }
//   });

//   mind.map.addEventListener('drop', event => {
//     event.preventDefault();
//     console.log('ybw drop');
//     // if (event.target.tagName === 'TPC' && event.target !== dragged) {
//     event.target.style.opacity = 1;
//     clearPreview(meet);
//     // }
//   });
// }
