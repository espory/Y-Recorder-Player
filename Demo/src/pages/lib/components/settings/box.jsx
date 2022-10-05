import { PureComponent } from 'react';
// import { Row, Col, Timeline, Anchor, Radio, DatePicker, Result, notification, message } from 'antd';
import { Row, Col } from 'antd';
import './index.less';


export default class Box extends PureComponent {
  render() {
    const { title, child } = this.props;
    return <div className="settings-box">
      <div className="title">
        <h4>{title}</h4>
      </div>
      <Row>
        <Col flex="auto" className="settings-box-divider"></Col>
      </Row>
      <div className="content">
        {child}
      </div>
    </div>;
  }
}
