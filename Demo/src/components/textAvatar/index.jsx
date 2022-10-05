import { PureComponent } from 'react';
import { Avatar } from 'antd';
import './index.less';
export default class TextAvatar extends PureComponent {
  render() {
    const { name, size, style, theme = false } = this.props;
    return (
      <Avatar size={size} style={{ ...style }} className={`color${theme ? 0 : name ? name.length % 5 : 0}`}>{name ? name[0].toUpperCase() : ''}</Avatar>
    );
  }
}
