// import React, { PureComponent } from 'react';
// import { Button, Form, Input, Modal } from 'antd';
// import './index.less';


// export default class PermissionForm extends PureComponent {
//   permissionFormRef = React.createRef();

//   onFinish = async values => {
//     const { dispatch } = this.props;
//     await dispatch('createPermission', { ...values });
//     dispatch('setData', { permissionFormVisible: false });
//     this.resetData();
//   }

//   onCancel = () => {
//     const { dispatch } = this.props;
//     dispatch('setData', { permissionFormVisible: false });
//     this.resetData();
//   }

//   resetData = () => {
//     if (this.permissionFormRef.current) {
//       this.permissionFormRef.current.resetFields();
//     }
//   };

//   fillData = data => {
//     if (this.permissionFormRef.current) {
//       this.permissionFormRef.current.setFieldsValue(data);
//     }
//   };

//   render() {
//     const {
//       visible,
//     } = this.props;
//     // const { id, title, description } = formData;
//     const { onFinish, onCancel } = this;
//     const formItemLayout = {
//       labelCol: {
//         sm: { span: 4 },
//       },
//       wrapperCol: {
//         sm: { span: 20 },
//       },
//     };
//     const buttonLayout = {
//       wrapperCol: {
//         sm: { offset: 4, span: 20 },
//       },
//     };
//     // this.fillData(formData);
//     return (
//       <Modal
//         title='创建权限'
//         visible={visible}
//         onCancel={onCancel}
//         footer=''
//       >
//         <Form
//           name="normal_login"
//           className="login-form"
//           ref={this.permissionFormRef}
//           onFinish={onFinish}
//           {...formItemLayout}
//         >
//           <Form.Item
//             name="name"
//             label="权限名"
//           >
//             <Input size="large" placeholder="权限码的名称(非必填)" />
//           </Form.Item>
//           <Form.Item {...buttonLayout}>
//             <Button size="large" type="primary" htmlType="submit" className="permission-form-button">
//               {'创建'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     );
//   }
// }
