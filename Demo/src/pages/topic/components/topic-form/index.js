import React, { PureComponent } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import './index.less';


export default class TopicForm extends PureComponent {
  topicFormRef = React.createRef();

  onFinish = async values => {
    const { dispatch, formStatus } = this.props;
    if (formStatus === 'create') {
      dispatch('createTopic', { ...values });
    }
    if (formStatus === 'update') {
      dispatch('updateTopic', { ...values });
    }
    dispatch('setData', { topicFormVisible: false });
    this.resetData();
  }

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch('setData', { topicFormVisible: false });
    this.resetData();
  }

  resetData = () => {
    if (this.topicFormRef.current) {
      this.topicFormRef.current.resetFields();
    }
  };

  fillData = data => {
    if (this.topicFormRef.current) {
      this.topicFormRef.current.setFieldsValue(data);
    }
  };

  componentDidUpdate() {
    const { formData } = this.props;
    this.fillData(formData);
  }


  render() {
    const {
      visible,
      formStatus,
      formData,
    } = this.props;
    // const { id, title, description } = formData;
    const { onFinish, onCancel } = this;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    const buttonLayout = {
      wrapperCol: {
        sm: { offset: 4, span: 20 },
      },
    };
    // this.fillData(formData);
    return (
      <Modal
        title={ formStatus === 'create' ? '创建主题' : '编辑主题'}
        visible={visible}
        onCancel={onCancel}
        footer=''
      >
        <Form
          name="normal_login"
          className="login-form"
          ref={this.topicFormRef}
          initialValues={{ ...formData, remember: true }}
          onFinish={onFinish}
          {...formItemLayout}
        >
          {
            formStatus === 'update' && <Form.Item name="id" style={{ display: 'none' }}>
              <Input/>
            </Form.Item>
          }
          <Form.Item
            name="name"
            label="主题名"
            rules={[{ required: true, message: '主题名称' }]}
          >
            <Input size="large" placeholder="主题名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="主题描述"
            rules={[{ required: true, message: '简短的描述' }]}
          >
            <Input.TextArea autoSize={{ minRows: 3 }}
              size="large"
              placeholder="描述"
            />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button size="large" type="primary" htmlType="submit" className="topic-form-button">
              { formStatus === 'create' ? '创建主题' : '保存'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
