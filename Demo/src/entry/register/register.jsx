// import ReactDOM from 'react-dom';
// import { PureComponent } from 'react';
// import { Form, Input, Button, notification } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import './register.less';
// import { register } from './service';

// class Register extends PureComponent {

//   onFinish = async values => {
//     try {
//       const result = await register(values);
//       if (result) {
//         notification.success({
//           message: '注册成功',
//           description: '恭喜您注册成功，将在2s后跳转到登录页！',
//           placement: 'topRight',
//         });
//         setTimeout(() => {
//           window.location.href = '/login.html';
//         }, 2200);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   render() {
//     const { onFinish } = this;
//     return <div className="login-container">
//       <div className="login-content">
//         <div className="login-title">注册</div>
//         <Form
//           name="normal_login"
//           className="login-form"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//         >
//           <Form.Item
//             name="name"
//             rules={[{ required: true, message: 'Please input your Username!' }]}
//           >
//             <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//           </Form.Item>
//           <Form.Item
//             name="mail"
//             rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
//           >
//             <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your Password!' }]}
//           >
//             <Input
//               size="large"
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               placeholder="Password"
//             />
//           </Form.Item>
//           <Form.Item
//             name="repassword"
//             dependencies={[ 'password' ]}
//             rules={[{ required: true, message: 'Please input your Password again!' },
//               ({ getFieldsValue }) => ({
//                 validator(rule, value) {
//                   if (!value || getFieldsValue('password').password === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('确认的密码不匹配'));
//                 },
//               }),
//             ]}
//             hasFeedback
//           >
//             <Input
//               size="large"
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               placeholder="Repeat Password"
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button size="large" type="primary" htmlType="submit" className="login-form-button">
//               注册
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>;
//   }
// }


// ReactDOM.render(<Register />, document.getElementById('root'));

import { Result, Button } from 'antd';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Result
    status="warning"
    title="暂停注册"
    extra={
      <Button type="primary" key="console" onClick={() => { window.location.href = '/login.html'; }}>
        回到登录页
      </Button>
    }
  />,
  document.getElementById('root')
);
