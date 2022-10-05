import { PureComponent } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

export default class GroupItem extends PureComponent {
  onUpdate = async e => {
    const { dispatch } = this.props;
    dispatch('showGroupForm', 'update');
    dispatch('setFormData', e);
  }

  onDelete = async e => {
    const { dispatch } = this.props;
    await dispatch('deleteGroup', e);
    message.success('删除成功');
  }

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id } = data;
    return (<div className="my-group-item own-item">
      <div className="my-group-item-left">
        <div className={`my-group-item-icon color${id % 3 + 1}`} />
        <div className="my-group-item-header">
          <span className="my-group-item-title">{title}</span>
          <span className="my-group-item-desc">{description}</span>
        </div>
      </div>
      <div className="my-group-item-mid">
        创建人：{user.name}
      </div>
      <div className="my-group-item-right">
        <Link to={'/group/library/' + id}><Button type="ghost" className="my-group-item-button">详情</Button></Link>
        <Button type="ghost" className="my-group-item-button" onClick={this.onUpdate.bind(null, { id, description, title })}>编辑</Button>
        <Popconfirm
          title="确认删除这个小组吗？"
          onConfirm={this.onDelete.bind(null, id)}
          okText="是"
          cancelText="否"
        >
          <Button type="ghost" className="my-group-item-button">删除</Button>
        </Popconfirm>
      </div>
    </div>);
  }
}
