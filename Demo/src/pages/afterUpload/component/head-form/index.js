import React, { PureComponent } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
// const { Option } = Select;
const { Title } = Typography;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: { span: 21 },
};

const btLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const selectOption = [ 'article', 'book', 'incollection', 'inproceedings', 'mastersthesis', 'phdthesis', 'proceedings', 'www' ];

export default class HeadForm extends PureComponent {
  headFormRef = React.createRef();
  onCancle = () => {
    const { dispatch } = this.props;
    dispatch('goBack');
  }
  onFinish = async values => {
    const { dispatch } = this.props;
    console.log('values: ', values);
    await dispatch('createOrUpdateFile', { ...values, resetForm: this.resetData });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  resetData = () => {
    if (this.headFormRef.current) {
      this.headFormRef.current.resetFields();
    }
  };

  onPrevious = async () => {
    const { dispatch } = this.props;
    dispatch('previousFile');
  };

  componentDidUpdate() {
    const { data, dispatch } = this.props;
    if (this.headFormRef.current) {
      this.headFormRef.current.setFieldsValue(data);
      dispatch('setData', { docFormRef: this.headFormRef.current });
    }
  }

  render() {
    // const { breadcrumbList } = this.props;
    const { visible, showPrevious, allowSubmit, data = {} } = this.props;
    const { extraInfo = {} } = data;
    const { title, authors } = extraInfo;
    return (
      <div>
        {
          visible && <>
            <Title level={4}>基础内容</Title>
            <Form
              {...layout}
              name="normal_login"
              className="doc-form"
              initialValues={{ type: selectOption[0] }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.headFormRef}
            >
              <Form.Item
                name="title"
                label="标题"
                extra={title && title}
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input size="large" placeholder="title" />
              </Form.Item>
              <Form.Item
                name="authors"
                label="作者"
                help="请用 and 分隔作者姓名"
                extra={authors && authors}
                rules={[{ required: false, message: '请输入作者姓名' }]}
              >
                <Input
                  size="large"
                  placeholder="authors"
                />
              </Form.Item>
              <Form.Item {...btLayout}>
                <Row>
                  <Col span={5} offset={6 + (showPrevious ? 0 : 4)}>
                    <Button style={{ width: '100%' }} onClick={this.onCancle}>
                    取消
                    </Button>
                  </Col>
                  {showPrevious && <Col span={5} offset={1}>
                    <Button style={{ width: '100%' }} onClick={this.onPrevious}>
                    上一篇
                    </Button>
                  </Col>
                  }
                  <Col span={5} offset={1}>
                    <Button
                      disabled = {!allowSubmit}
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%' }}>
                    保存
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </>
        }
      </div>
    );
  }
}
