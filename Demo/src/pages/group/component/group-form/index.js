import React, { PureComponent } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import './index.less';


class GroupForm extends PureComponent {
  groupFormRef = React.createRef();

  onFinish = async values => {
    const { dispatch, formStatus } = this.props;
    if (formStatus === 'create') {
      dispatch('createGroup', values);
    } else {
      dispatch('updateGroup', values);
    }
    dispatch('hideGroupForm');
    this.resetData();
  }

  onCancel = async () => {
    const { dispatch } = this.props;
    dispatch('hideGroupForm');
    this.resetData();
  }

  resetData = () => {
    if (this.groupFormRef.current !== undefined && this.groupFormRef.current !== null) {
      this.groupFormRef.current.resetFields();
    }
  };

  fillData = data => {
    if (this.groupFormRef.current !== undefined && this.groupFormRef.current !== null) {
      this.groupFormRef.current.setFieldsValue(data);
    }
  };

  componentDidUpdate() {
    const { formData } = this.props;
    this.fillData(formData);
  }


  render() {
    const {
      visible,
      confirmLoading,
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
        title={ formStatus === 'create' ? '创建群组' : '编辑群组'}
        visible={visible}
        onCancel={onCancel}
        footer=''
        confirmLoading={confirmLoading}
      >
        <Form
          name="normal_login"
          className="login-form"
          ref={this.groupFormRef}
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
            name="title"
            label="群组名"
            rules={[{ required: true, message: 'Please input your group name!' }]}
          >
            <Input size="large" placeholder="group name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="群组描述"
            rules={[{ required: true, message: 'Please input group description!' }]}
          >
            <Input
              size="large"
              placeholder="description"
            />
          </Form.Item>
          <Form.Item {...buttonLayout}>
            <Button size="large" type="primary" htmlType="submit" className="group-form-button">
              { formStatus === 'create' ? 'Create Group' : 'Update Group'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default GroupForm;
