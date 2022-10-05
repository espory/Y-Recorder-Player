import { PureComponent, createRef } from 'react';
import { Form, Input, Button, Row, Col, Typography,
  // Tooltip
} from 'antd';
// import { MinusCircleOutlined } from '@ant-design/icons';
import { formConfig } from './config';
import IconToolTip from '../../../../components/iconToolTip';
const { Item } = Form;
const { Title } = Typography;
const layout = {
  labelCol: {
    span: 2,
    offset: 1,
  },
  wrapperCol: {
    span: 19,
  },
};

const btLayout = {
  wrapperCol: { offset: 0, span: 24 },
};


export default class BibForm extends PureComponent {
  bibFormRef = createRef();

  onCancle = () => {
    const { dispatch } = this.props;
    dispatch('goBack');
  }

  onFinish = async values => {
    const { dispatch } = this.props;
    // const { data = {} } = this.props;
    // const { extraInfoVisible = [] } = data;
    const { extra } = values;
    // const newExtra = {};
    // Object.keys(extra).forEach((key, idx) => {
    //   if (extraInfoVisible[idx]) {
    //     newExtra[key] = extra[key];
    //   }
    // });
    dispatch('create', { ...values, extra: { ...extra, isComplete: true },
      // : newExtra
    });
  };

  // onClikeHideButton = async idx => {
  //   const { dispatch } = this.props;
  //   dispatch('setExtraInfoVisible', { idx, status: false });
  // }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  resetData = () => {
    if (this.bibFormRef.current) {
      this.bibFormRef.current.resetFields();
    }
  };

  onPrevious = async () => {
    const { dispatch } = this.props;
    dispatch('previousFile');
  };

  componentDidUpdate() {
    const { data, dispatch } = this.props;
    if (this.bibFormRef.current) {
      this.bibFormRef.current.setFieldsValue(data);
      dispatch('setData', { bibFormRef: this.bibFormRef.current });
    }
  }

  render() {
    const { visible, data = {}, showPrevious, allowSubmit } = this.props;

    const { extra = {},
    // extraInfoVisible = []
    } = data;

    // let allExtraInfoHidden = true;
    // for (const it of extraInfoVisible) {
    //   if (it === true) {
    //     allExtraInfoHidden = false;
    //     break;
    //   }
    // }
    return (
      visible && <div>

        <Form
          {...layout}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref = { this.bibFormRef}
        >
          <Row>
            <Col
              offset={layout.labelCol.offset }
              style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Title level={4}>基础信息</Title>
            </Col>
          </Row>
          {formConfig.map(it => {
            return (<Item
              key={it.name}
              name={it.name}
              label={it.label}
              extra={it.extra}
              rules={[{ ...it.rule, message: `请输入${it.label}` }]}
            >
              {it.child ? it.child : <Input size="large" placeholder={it.label} />}
            </Item>);
          })}

          {/* {!allExtraInfoHidden &&  */}
          <Row>
            <Col
              offset={layout.labelCol.offset}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Title level={4} style={{ margin: 0, marginRight: 5 }}>其他信息</Title>
              <IconToolTip info={'非必要的信息，可以移除'}></IconToolTip>
            </Col>
          </Row>
          {/* } */}

          { Object.keys(extra).map(key => {
            // if (key === 'type') {
            //   extraInfoVisible[idx] = false;
            // }
            return (<><Item
              name ={[ 'extra', key ]}
              label={key}
              key = { key}
              // hidden = {!extraInfoVisible[idx]}
            >
              <Input size="large"
                // addonAfter={
                //   <Tooltip title="移除此条目">
                //     <MinusCircleOutlined
                //       className="dynamic-delete-button"
                //       onClick={() => this.onClikeHideButton(idx)}
                //     />
                //   </Tooltip>}
              />
            </Item>

            </>);
          })}
          <Item {...btLayout}>
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
                  disabled ={!allowSubmit}
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}>
                    保存
                </Button>
              </Col>
            </Row>
          </Item>

        </Form>
      </div>
    );
  }
}
