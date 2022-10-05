// import React, { PureComponent } from 'react';

// import pageWrapper from '../../components/page-wrapper';
// import PageContainer from '../../components/page-container';
// import store from './store';
// import './index.less';
// import { Button, Form, Input, notification, Row, Col, Select } from 'antd';
// const { Option } = Select;
// import Editor from 'react-markdown-editor-lite';
// import ReactMarkdown from 'react-markdown';
// import { Prism } from 'react-syntax-highlighter';
// import { InlineMath, BlockMath } from 'react-katex';
// import math from 'remark-math';
// import gfm from 'remark-gfm';
// import 'react-markdown-editor-lite/lib/index.css';
// import './markdown-themes.css';
// import 'katex/dist/katex.min.css';

// const markdownStyles = [
//   'default',
//   'smart-blue',
//   'cyanosis',
//   'channing-cyan',
//   'fancy',
//   'hydrogen',
//   'condensed-night-purple',
//   'greenwillow',
//   'green',
//   'default',
//   'github',
// ];

// const codeStyles = [
//   'default',
//   'a11y-dark',
//   'atom-dark',
//   'base16-ateliersulphurpool.light',
//   'cb',
//   'coldark-cold',
//   'coldark-dark',
//   'coy-without-shadows',
//   'coy',
//   'darcula',
//   'dark',
//   'dracula',
//   'duotone-dark',
//   'duotone-earth',
//   'duotone-forest',
//   'duotone-light',
//   'duotone-sea',
//   'duotone-space',
//   'funky',
//   'ghcolors',
//   'hopscotch',
//   'index',
//   'material-dark',
//   'material-light',
//   'material-oceanic',
//   'nord',
//   'okaidia',
//   'pojoaque',
//   'prism',
//   'shades-of-purple',
//   'solarizedlight',
//   'synthwave84',
//   'tomorrow',
//   'twilight',
//   'vs-dark',
//   'vs',
//   'vsc-dark-plus',
//   'xonokai',
// ];

// @pageWrapper({ store })
// class HomepageSetting extends PureComponent {
//   settingFormRef = React.createRef();

//   onFinish = async values => {
//     const { dispatch } = this.props;
//     try {
//       const content = this.mdEditor.getMdValue();
//       Object.assign(values, { content });
//       const ok = await dispatch('postHomepageSetting', values);
//       const { homepage_id } = this.props;
//       if (ok) {
//         notification.success({
//           message: '个人主页设置更新成功',
//           description: '2s后跳转到个人主页',
//           placement: 'topRight',
//         });
//         setTimeout(() => {
//           window.location.href = `/homepage.html?id=${homepage_id}`;
//         }, 2000);
//       } else {
//         notification.error({
//           message: '个人主页设置更新失败',
//           placement: 'topRight',
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   redirectToHomepage = () => {
//     const { homepage_id } = this.props;
//     window.location.href = `/homepage.html?id=${homepage_id}`;
//   }

//   componentWillUpdate(nextProps) {
//     const { phone_number, email, work_place, content, markdown_theme, code_theme, motto } = nextProps;
//     this.settingFormRef.current.setFieldsValue({ phone_number, email, work_place, markdown_theme, code_theme, motto });
//     this.mdEditor.setText(content);
//     // 更新 preview 的样式
//     this.mdEditor.renderHTML(content);
//   }

//   render() {
//     const breadcrumbList = [{
//       name: '个人主页设置',
//     }];

//     const layout = {
//       labelCol: { span: 5, offset: 1 },
//       wrapperCol: { span: 16 },
//     };

//     return <PageContainer breadcrumb={breadcrumbList}>
//       <div className="homepage-setting-content">
//         {/* 这里表单的初始化好像没有办法使用initialValue，因为antd的initialValue只有在第一次Form被加载的时候才会生效
//             ，但我们的state是在setup之后才有初始化的值的，所以我们现在其实是希望Form的值可以跟随state进行动态更改*/ }
//         <Form className="homepage-setting-form" name="homepage-setting-form"
//           onFinish={this.onFinish} ref={this.settingFormRef} {...layout}
//           initialValues={this.props} labelAlign='left'
//           onValuesChange={async changedValues => { // 实时更新样式数据
//             const { dispatch } = this.props;
//             if (changedValues.hasOwnProperty('markdown_theme') || changedValues.hasOwnProperty('code_theme')) {
//               // 改变选项的时候暂存markdown和fields里面的值，防止丢失
//               const content = this.mdEditor.getMdValue();
//               const value = this.settingFormRef.current.getFieldsValue();
//               await dispatch('setData', { ...changedValues, content, ...value });
//               // 更新 preview 的样式
//               this.mdEditor.renderHTML(content);
//             }
//           }}
//         >
//           <Row style={{ margin: '30px 0' }}>
//             <Col span={2} offset={1}>
//               <Button type="primary" onClick={this.redirectToHomepage}>
//                 跳转到个人主页
//               </Button>
//             </Col>
//             <Col span={2} offset={1}>
//               <Button type="primary" htmlType="submit">
//                 提交更新
//               </Button>
//             </Col>
//           </Row>

//           <Row>
//             <Col span={10} offset={1}>
//               <Form.Item label="联系电话" name="phone_number"
//                 rules={[{ required: true, message: 'Please input your working phone number for connecting.', type: 'string', pattern: /^([0-9]+-)?[0-9]+$/ }]}
//               >
//                 <Input placeholder='请输入您的联系电话'/>
//               </Form.Item>
//             </Col>

//             <Col span={10} offset={1}>
//               <Form.Item
//                 label="工作邮箱" name="email"
//                 rules={[{ required: true, message: 'Please input your working email for connecting.', type: 'email' }]}
//               >
//                 <Input placeholder='请输入您的工作邮箱'/>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row>
//             <Col span={10} offset={1}>
//               <Form.Item
//                 label="所在单位" name="work_place"
//                 rules={[{ required: true, message: 'Please input your working place!', type: 'string' }]}
//               >
//                 <Input placeholder='请输入您当前的工作单位'/>
//               </Form.Item>
//             </Col>
//             <Col span={10} offset={1}>
//               <Form.Item
//                 label="个人签名" name="motto"
//               >
//                 <Input placeholder='请输入您的个人签名'/>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row>
//             <Col span={10} offset={1}>
//               <Form.Item label="页面样式" name="markdown_theme">
//                 <Select>
//                   {markdownStyles.map((markdownStyle, index) => (
//                     <Option key={index} value={markdownStyle}>{markdownStyle}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={10} offset={1}>
//               <Form.Item label="代码样式" name="code_theme">
//                 <Select>
//                   {codeStyles.map((codeStyle, index) => (
//                     <Option key={index} value={codeStyle}>{codeStyle}</Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Editor
//             ref={node => (this.mdEditor = node || undefined)}
//             style={{
//               height: '500px',
//               margin: '20px 5%',
//             }}
//             renderHTML= { text => {
//               const { code_theme, markdown_theme } = this.props;
//               const code_themeRender = code_theme === 'default' ? '' : require(`react-syntax-highlighter/dist/esm/styles/prism/${code_theme}`).default;
//               return <article className={markdown_theme === 'default' ? '' : `markdown-body-${markdown_theme}`}>
//                 <ReactMarkdown
//                   sourcePos
//                   rawSourcePos
//                   plugins={[ math, gfm ]}
//                   children={text}
//                   renderers={{
//                     code: ({ language, value }) => {
//                       return (
//                         <Prism
//                           language={language}
//                           style={code_themeRender}
//                           children={value}
//                         />
//                       );
//                     },
//                     inlineMath: ({ value }) => {
//                       console.log(value);
//                       return <InlineMath math={value}/>;
//                     },
//                     math: ({ value }) => {
//                       console.log(value);
//                       return <BlockMath math={value}/>;
//                     },
//                   }}
//                 />
//               </article>;
//             }
//             }
//           />
//         </Form>
//       </div>
//     </PageContainer>;
//   }
// }

// export default HomepageSetting;
