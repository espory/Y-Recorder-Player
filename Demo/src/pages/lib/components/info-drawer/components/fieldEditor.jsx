import { PureComponent, Children } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;
class FieldEditor extends PureComponent {
  warpper = (content, warp = true) => {
    return <div className={`field-edit-block${warp ? '' : ' nowarp'}`} >{typeof (content) === 'function' ? content() : content}</div>;
  }
  render() {
    const { children, name, displayContent, onClick, style, warp = true, editing = false } = this.props;
    let display;
    if (Array.isArray(displayContent)) {
      display = displayContent.filter(item => item.visible).map((item, idx) => {
        const { name, content, warp } = item;
        return <div key={name}>
          <Title level={5} style={{ marginBottom: 0, marginTop: idx ? '0.5em' : 0 }}>{name.toUpperCase()}</Title>
          {this.warpper(content, warp)}
        </div>;
      });
    } else {
      display = this.warpper(displayContent, warp);
    }
    const multiChild = (Children.count(children) > 1);
    if (Array.isArray(display) && display.length === 0) {
      const { name, content, warp } = displayContent[0];
      display = <>
        <Title level={5} style={{ marginBottom: 0 }}>{name.toUpperCase()}</Title>
        {this.warpper(content, warp)}
      </>;
    }
    return <>
      <Title level={4} style={{ color: 'grey' }} >{name.toUpperCase()}</Title>
      <div
        className={multiChild ? `field-edit-block-multi${editing ? '-in' : ''}` : ''}
        onClick={e => {
          e.stopPropagation();
          onClick();
        }} style={style}>
        {/* 编辑状态 */}
        {(editing) &&
        <div >
          {(multiChild ? Children.map(children,
            (child, idx) => {
              return <>
                <Title level={5}>{displayContent[idx].name.toUpperCase()}</Title>
                {child}
              </>;
            }) : children)}
        </div> }
        {/* 非编辑,展示状态 */}
        {!editing && display}
      </div>
    </>;
  }
}

export default FieldEditor;
