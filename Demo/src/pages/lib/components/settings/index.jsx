import { PureComponent } from 'react';
// import { Row, Col, Timeline, Anchor, Radio, DatePicker, Result, notification, message } from 'antd';
import './index.less';
import Box from './box';
import { tableCol } from './items/col';
// import { switchButton } from './items/switch';


export default class Settings extends PureComponent {
  render() {
    const { settings, dispatch } = this.props;
    const { tableColIdx,
      //  autoParse
    } = settings;
    return <div className="out-of-drawer">
      <Box title = '表格展示项' child = {tableCol(tableColIdx, dispatch)}/>
      {/* <Box title = '自动解析文献' child = {switchButton(autoParse, dispatch, 'autoParseChange')}/> */}
    </div>;
  }
}
