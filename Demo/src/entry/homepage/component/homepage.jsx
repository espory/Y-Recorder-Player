// import React, { PureComponent } from 'react';
// import pageWrapper from '../../../components/page-wrapper';
// import store from './store';
// const reactCreateElement = React.createElement;

// import { HomeFilled, MailTwoTone, PhoneTwoTone, DownOutlined, EnvironmentTwoTone } from '@ant-design/icons';
// import { Tree, Result, Divider } from 'antd';
// import './homepage.less';

// // import Editor from 'react-markdown-editor-lite';
// import ReactMarkdown from 'react-markdown';
// import 'react-markdown-editor-lite/lib/index.css';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { InlineMath, BlockMath } from 'react-katex';
// import math from 'remark-math';
// import gfm from 'remark-gfm';
// import '../../../pages/homepageSetting/markdown-themes.css';
// import 'katex/dist/katex.min.css';
// import { FILES_HOST } from '../../../common/fetch';

// @pageWrapper({ store })
// class Homepage extends PureComponent {

//   redirectHome() {
//     window.location.href = window.location.href.split('#')[0];
//   }
//   render() {
//     const { user, phone_number, email, work_place, content, is404, indexes, code_theme, markdown_theme, motto } = this.props;
//     const code_themeRender = code_theme === 'default' ? '' : require(`react-syntax-highlighter/dist/esm/styles/prism/${code_theme}`).default;
//     return <div>
//       {(is404 === false) && <div className='homepage-wrapper'>
//         <div className='homepage-header'>
//           <div className='homepage-logo'>
//             <HomeFilled/>
//             <span>{user.name.toUpperCase()} Studio</span>
//           </div>
//           <div className='homepage-nav'>
//             <span onClick={() => this.redirectHome()}> HOME </span>
//             {/* <span> CONTACT </span>*/}
//           </div>
//         </div>
//         <div className='homepage-topic'>
//           <p className='homepage-title'>{user.name.toUpperCase()} Studio</p>
//           <p className='homepage-subtitle'>All You Want to Know.</p>
//         </div>
//         <div className='homepage-container'>
//           <div className='homepage-sider'>
//             <p>目录</p>
//             <Tree
//               defaultExpandAll
//               switcherIcon={<DownOutlined/>}
//               treeData={indexes}
//               titleRender={nodeData => {
//                 console.log(nodeData);
//                 return <span className='homepage-sider-title'>{nodeData.title}</span>;
//               }}
//               onSelect={(selectedKeys, e) => {
//                 console.log(selectedKeys, e);
//                 window.location.hash = e.node.title;
//               }}
//             />
//           </div>
//           <div className='homepage-content'>
//             {/* custom-html-style 是react-markdown-editor-lite中的外层嵌套样式，添加这个可以保证编辑界面和展示页面样式相同*/}
//             <article className={markdown_theme === 'default' ? '' : `markdown-body-${markdown_theme}`}>
//               <ReactMarkdown
//                 className='homepage-content-md custom-html-style'
//                 plugins={[ math, gfm ]}
//                 children={content}
//                 renderers={{
//                   heading: value => {
//                     console.log(value);
//                     const text = value.children[0].props.value;
//                     return reactCreateElement(`h${value.level}`, { id: text }, text); // from source code
//                   },
//                   code: ({ language, value }) => {
//                     return (
//                       <SyntaxHighlighter
//                         language={language}
//                         style={code_themeRender}
//                         children={value}
//                       />
//                     );
//                   },
//                   inlineMath: ({ value }) => <InlineMath math={value}/>,
//                   math: ({ value }) => <BlockMath math={value}/>,
//                 }}
//               />
//             </article>
//           </div>
//           <div className='homepage-userinfo'>
//             <div style={{ color: 'grey', font: '16px bold' }}>ABOUT ME</div>
//             <div className="avatar">
//               <img src={FILES_HOST + user.avatar.link} />
//             </div>
//             <div className='homepage-userinfo-motto'>
//               <p>{motto}</p>
//             </div>
//             <div className='homepage-userinfo-contact'>
//               <EnvironmentTwoTone style={{ fontSize: '18px' }}/>{work_place}<br/>
//               <MailTwoTone style={{ fontSize: '18px' }}/>{email}<br/>
//               <PhoneTwoTone style={{ fontSize: '18px' }}/>{phone_number}<br/>
//             </div>
//             <Divider />
//           </div>
//         </div>
//         <div className='homepage-footer'>
//           <span>2020 Fudan y-droid | Thanks for visiting </span>
//         </div>
//       </div>
//       }
//       {(is404 === true) && <Result status='404' title='404' subTitle='Sorry, the page you visited does not exist.'/>}
//     </div>;
//   }
// }

// export default Homepage;
