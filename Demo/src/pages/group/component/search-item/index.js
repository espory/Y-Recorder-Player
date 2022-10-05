import { PureComponent } from 'react';
import './index.less';
import { Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

export default class SearchGroupItem extends PureComponent {
  onUnsubscribe = async e => {
    const { dispatch } = this.props;
    await dispatch('unsubscribeGroup', e);
    message.success('取消订阅成功');
  }

  onSubscribe = async e => {
    const { dispatch } = this.props;
    await dispatch('subscribeGroup', e);
    message.success('订阅成功');
  }

  render() {
    const { data = {} } = this.props;
    const { description, title, user = '', id, subbed } = data;

    return (<div className="my-group-item sub-item">
      <div className="my-group-item-left">
        <div className={`my-group-item-icon color${id % 3 + 1}`}/>
        <div className="my-group-item-header">
          <span className="my-group-item-title">{title}</span>
          <span className="my-group-item-desc">{description}</span>
        </div>
      </div>
      <div className="my-group-item-mid">
        创建人：{user.name}
      </div>
      <div className="my-group-item-right">
        <Link to={'/group/library/' + id}><Button type="ghost" className="my-group-item-button" disabled={!subbed}>详情</Button></Link>
        <Popconfirm
          title={subbed ? '确认取消订阅？' : '确认订阅？'}
          onConfirm={subbed ? this.onUnsubscribe.bind(null, id) : this.onSubscribe.bind(null, id)}
          okText="是"
          cancelText="否"
        >
          <Button type="ghost" className="my-group-item-button">{subbed ? '取消订阅' : '订阅'}</Button>
        </Popconfirm>
      </div>
    </div>);
  }
}
