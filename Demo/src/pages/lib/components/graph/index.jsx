// import { useState, useRef, useEffect } from 'react';
// import { message } from 'antd';
// // import { DeleteOutlined, SelectOutlined,PlusSquareOutlined } from '@ant-design/icons';
// import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
// import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
// import Graphin from '@antv/graphin';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
// import { Toolbar, ContextMenu } from '@antv/graphin-components';
// import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSSconst data_1 = Utils.mock(10).random().graphin();
// import { genGraph, genTrees } from './refToNode';

// const getLibBodyStyle = key => {
//   const libBody = document.getElementsByClassName('lib-body')[0];
//   return window.getComputedStyle(libBody)[key];
// };
// export default props => {
//   // const [ data, setdata ] = useState(data_);
//   let graphEl = useRef(null);
//   const mounted = useRef();

//   const { dataSource } = props;
//   const { refGraph } = dataSource;
//   const setCanvas = () => {
//     const directions = [ 'Top', 'Right', 'Bottom', 'Left' ];
//     const paddings = directions.map(d => {
//       return Number(getLibBodyStyle(`padding${d}`).slice(0, -2));
//     });
//     const containerHeight = Number(getLibBodyStyle('height').slice(0, -2));
//     const containerWidth = Number(getLibBodyStyle('width').slice(0, -2));
//     graphEl.graph.changeSize(containerWidth - paddings[1] - paddings[3], containerHeight - paddings[0] - paddings[2]);
//   };
//   // mounted willReceive
//   useEffect(() => {
//     if (!mounted.current) {
//       console.log('mounted');
//       mounted.current = true;
//       setCanvas();
//       // dispatch('getFullLibrary');
//     } else {
//       console.log('I am didUpdate');
//     }
//   });
//   // will unmount
//   useEffect(() => {
//     return () => {
//       console.log('will unmount');
//     };
//   }, []);

//   useEffect(() => {
//     console.log(graphEl);
//   }, [ graphEl ]);


//   const trees = genTrees(refGraph);
//   const { topicEdges, topicNodes, hiddenNodesMap } = genGraph(trees);

//   const data_ = { nodes: topicNodes, edges: topicEdges };
//   const [ data, setdata ] = useState(data_);
//   // 右键操作
//   const options = [
//     {
//       key: 'AddHideNodes',
//       title: '展开节点',
//       visible: true,
//       iconType: <PlusSquareOutlined />,
//       onClick: e => {
//         const nodes = e.graph.findAllByState('node', 'selected');
//         const nodeIds = nodes.map(node => node.get('id'));
//         if (nodeIds.length === 0) {
//           message.info('oh,你好像没有选中节点...');
//         } else {
//           const selectNodeId = nodeIds[0];
//           const { nodes, edges } = data;
//           setdata({ nodes: nodes.concat(hiddenNodesMap[Number(selectNodeId)].hiddenNodes), edges: edges.concat(hiddenNodesMap[Number(selectNodeId)].hiddenEdges) });
//         }
//       },
//     },
//     {
//       key: 'DelHideNodes',
//       title: '隐藏节点',
//       iconType: <MinusSquareOutlined />,
//       visible: true,
//       onClick: e => {
//         const nodes = e.graph.findAllByState('node', 'selected');
//         const nodeIds = nodes.map(node => node.get('id'));
//         if (nodeIds.length === 0) {
//           message.info('oh,你好像没有选中节点...');
//         } else {
//           const selectNode = nodeIds[0];
//           // let new
//           const { nodes, edges } = data;
//           const { hiddenNodes, hiddenEdges } = hiddenNodesMap[selectNode];
//           const newNodes = [];
//           const newEdges = [];
//           nodes.forEach(it => {
//             let f = false;
//             for (let i = 0; i < hiddenNodes.length; i++) {
//               if (it.id === hiddenNodes[i].id) {
//                 f = true;
//                 break;
//               }
//             }
//             if (!f) {
//               newNodes.push(it);
//             }
//           });
//           edges.forEach(it => {
//             let f = false;
//             for (let i = 0; i < hiddenEdges.length; i++) {
//               if (it.source === hiddenEdges[i].source && it.target === hiddenEdges[i].target) {
//                 f = true;
//                 break;
//               }
//             }
//             if (!f) {
//               newEdges.push(it);
//             }
//           });
//           setdata({ nodes: newNodes, edges: newEdges });
//         }
//       },
//     },
//   ];
//   const transNodes = nodes => {
//     const ratio = 2;
//     return nodes.map(node => {
//       const { data } = node;
//       const { count = 0 } = data;
//       return {
//         ...node,
//         style: {
//           icon: 'file-text',

//           nodeSize: 40 + count * ratio,
//           fontSize: 24 + count * ratio,
//         },
//       };
//     });
//     // return nodes;
//   };
//   const transEdges = edges => {
//     return edges.map(edge => {
//       return {
//         ...edge,
//         style: {
//           line: {
//             width: 3,
//           },
//         },
//       };
//     });
//   };
//   const transform = data => {
//     console.log('transform:', data);
//     return {
//       nodes: transNodes(data.nodes),
//       edges: transEdges(data.edges),
//     };
//   };
//   return (
//     <div >
//       <Graphin
//         ref={ref => {
//           graphEl = ref;
//         }}
//         data={transform(data)}
//         layout={{ name: 'force', options: { repulsion: 100.0 * 5 } }}
//         register= {{
//           behavior: G6 => [{
//             mode: 'default', // 详见 G6 的 mode 文档
//             options: {},
//             name: 'popUpOnClick',
//             register: () => {
//               G6.registerBehavior('popUpOnClick', {}); // 详见 G6 registerBehavior 文档
//             },
//           }] }
//         }
//       >
//         <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} />
//         <ContextMenu options={options} />
//       </Graphin>
//     </div>
//   );
// };
