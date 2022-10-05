import { PureComponent, createRef } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const selectOption = [ 'article', 'book', 'incollection', 'inproceedings', 'mastersthesis', 'phdthesis', 'proceedings', 'www' ];


class DocForm extends PureComponent {
  formRef = createRef();
  onFinish = async values => {
    const { dispatch, tuple } = this.props;
    const { authors = '', editors = '' } = values;
    values.authors = authors.split(' and ');
    values.editors = editors.split(' and ');
    if (tuple === null) {
      await dispatch('createDoc', { alias: '', ...values });
    } else {
      if (tuple.topicId) {
        await dispatch('createDoc', { alias: '', ...values, topicId: tuple.topicId });
      } else {
        await dispatch('updateDoc', values);
      }
    }
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      authors: '123',
    });
  };

  render() {
    const { tuple } = this.props;
    return <Form {...layout} ref={this.formRef} initialValues={tuple} onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}>
      <Form.Item name="id" hidden={true}>
        <Input/>
      </Form.Item>
      <Form.Item name="authors" label="作者">
        <Input/>
      </Form.Item>
      <Form.Item name="editors" label="编者">
        <Input/>
      </Form.Item>
      <Form.Item name="year" label="年份" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="type" label="文献类型" rules={[{ required: true }]}>

        <Select placeholder="选择文件类型" allowClear>
          { selectOption.map(item => {
            return (<Option value={item}>{item}</Option>);
          })}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>;
  }
}

export default DocForm;
