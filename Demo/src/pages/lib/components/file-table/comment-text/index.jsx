import { PureComponent } from 'react';
import { Tooltip } from 'antd';
import './index.less';


export default class CommentText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  render() {
    const { text } = this.props;
    const { hidden } = this.state;
    return (
      <Tooltip title="双击文献行展开或隐藏评论">
        <div
          className={hidden ? 'one-text' : ''}
          onDoubleClick={() => { this.setState({ hidden: !hidden }); }}>
          {text}
        </div>
      </Tooltip>);
  }
}
