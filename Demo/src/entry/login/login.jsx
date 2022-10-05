import ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './service';
import './login.less';

class Login extends PureComponent {

  onFinish = async values => {
    try {
      const result = await login(values);
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('userId', JSON.stringify(result.id));
      if (result) {
        window.location.href = '/';
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { onFinish } = this;
    return <div className="login-container">
      <div className="login-content">
        <div className="login-title">登录</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register.html">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>;
  }
}

ReactDOM.render(<Login />, document.getElementById('root'));
