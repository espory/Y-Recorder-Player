import { PureComponent } from 'react';
import { Form, Input, Button, notification, message } from 'antd';

class UpdatePwd extends PureComponent {
  onFinish = async values => {
    const { dispatch } = this.props;
    const res = await dispatch('updatePwd', values);
    if (res === '修改成功！') {
      notification.success({
        message: '成功',
      });
    } else {
      message.error(res);
    }
  }

  render() {
    return (
      <Form
        name = 'updatePwd'
        onFinish = { this.onFinish }>
        <Form.Item
          name = 'old_pwd'
          label = '旧密码'
          rules = {[
            {
              required: true,
              message: 'Please input old password!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name = 'new_pwd'
          label = '新密码'
          rules = {[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name = 'confirm'
          label = '确认新密码'
          dependencies = { [ 'new_pwd' ] }
          hasFeedback
          rules = {[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('new_pwd') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type = 'primary' htmlType = 'submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UpdatePwd;
