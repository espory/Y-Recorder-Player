import { PureComponent } from 'react';
import './index.less';
import { Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

export default class SubGroupItem extends PureComponent {
  onUnsubscribe = async e => {
    const { dispatch } = this.props;
    dispatch('unsubscribeGroup', e);
    message.success('取消订阅成功');
  }

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id } = data;

    return (<div className="my-group-item sub-item">
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
        <Popconfirm
          title="确认取消订阅？"
          onConfirm={this.onUnsubscribe.bind(null, id)}
          okText="是"
          cancelText="否"
        >
          <Button type="ghost" className="my-group-item-button">取消订阅</Button>
        </Popconfirm>
      </div>
    </div>);
  }
}
