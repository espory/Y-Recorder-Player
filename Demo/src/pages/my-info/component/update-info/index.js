import React, { PureComponent } from 'react';
import { Form, Input, Radio, DatePicker, Button, message } from 'antd';
import moment from 'dayjs';

class UpdateInfo extends PureComponent {
  updateInfoForm = React.createRef()
  dateFormat = 'YYYY-MM-DD'

  componentDidUpdate() {
    const { myInfo } = this.props;
    this.updateInfoForm.current.setFieldsValue({ ...myInfo, birthday: moment(myInfo.birthday, this.dateFormat) });
  }

  onFinish = async values => {
    const { dispatch } = this.props;
    await dispatch('updateData', {
      ...values,
      intro: values.intro || '这个人很懒，什么都没写',
      stu_num: values.stu_num || '00000000000',
      birthday: values.birthday.format(this.dateFormat),
    });
    message.success('修改成功');
  }

  render() {
    return (
      <Form
        name = 'updateInfo'
        ref={this.updateInfoForm}
        onFinish = {this.onFinish}
        scrollToFirstError>
        <Form.Item
          name = 'name'
          label = '昵称'
          rules = {[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name = 'gender'
          label = '性别'>
          <Radio.Group>
            <Radio value = 'male'>男</Radio>
            <Radio value = 'female'>女</Radio>
            <Radio value = '未知'>未知</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name = 'birthday'
          label = '出生日期'>
          <DatePicker />
        </Form.Item>

        <Form.Item
          name = 'intro'
          label = '简介'>
          <Input />
        </Form.Item>

        <Form.Item
          name = 'stu_num'
          label = '学/工号'>
          <Input />
        </Form.Item>

        <Form.Item
          name = 'mail'
          label = '电子邮箱'
          rules = {[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input />
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

export default UpdateInfo;
