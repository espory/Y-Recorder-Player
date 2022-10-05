import { PureComponent } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default class IconToolTip extends PureComponent {
  render() {
    const { icon = <QuestionCircleOutlined />, info = '' } = this.props;
    return (
      <Tooltip title={info}>
        {icon}</Tooltip>
    );
  }
}
