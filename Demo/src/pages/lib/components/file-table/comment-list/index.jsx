import { PureComponent } from 'react';
import { Button, Row, Col, Avatar, Input, Tooltip, message, Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CommentText from '../comment-text';
import './index.less';
import { FILES_HOST } from '../../../../../common/fetch';


export default class CommentList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentInputValue: '',
      fetching: false,
      end: false,
      commentList: [],
      commentPageInfo: {
        current: 1,
        pageSize: 4,
      },
    };
  }

  async componentDidMount() {
    await this.updateComment();
  }

  updateComment = async () => {
    const { fileId, dispatch } = this.props;
    const { commentPageInfo, commentList } = this.state;
    this.setState(state => ({ ...state, fetching: true }));
    const res = await dispatch('getComment', { fileId, ...commentPageInfo });
    if (res !== 'error') {
      const { rows } = res;
      const newCommentList = commentList.concat(rows);
      this.setState({
        commentList: newCommentList,
        commentPageInfo: { ...commentPageInfo, current: commentPageInfo.current + 1 },
        end: newCommentList.length === res.total,
      });
    }
    this.setState({ fetching: false });
  }

  onTextAreaChange = e => {
    this.setState({ commentInputValue: e.target.value });
  }

  onSubmitBtnClick = async () => {
    const { fileId, dispatch } = this.props;
    const { commentInputValue, commentList } = this.state;
    const res = await dispatch('createComment', {
      comment: commentInputValue,
      fileId,
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const res_ = { ...res, user: { ...user, avatar: user.avatar.link } };
    if (typeof (res) === 'object') {
      this.setState({ commentList: [ ...commentList, res_ ], commentInputValue: '' });
      message.success('评论成功！');
    } else {
      message.error(res);
    }
  }

  onDeleteComment = (that, comment) => async () => {
    const { dispatch } = that.props;
    const { commentList } = that.state;
    const res = await dispatch('deleteComment', { fileId: comment.file_id, commentId: comment.id });
    if (res !== 'error' && res) {
      this.setState({ commentList: commentList.filter(item => item.id !== comment.id) });
      message.success('删除成功！');
    } else {
      message.error('删除失败，请重试！');
    }
  }

  render() {
    const { commentList, fetching, end, commentInputValue } = this.state;
    return (
      <div className="comments-container">
        {commentList.map(item => (
          <Row key={item.id} align="middle" gutter={4} className="comment-row">
            <Col span={1}>
              <Avatar src={FILES_HOST + '/' + item.user.avatar} />
            </Col>

            <Col span={item.user.name > 6 ? 2 : 1}>
              <Tooltip title={item.user.name}>
                <div className="one-text">{item.user.name}</div>
              </Tooltip>
            </Col>

            <Col span={2} className="comment-date">
              [{item.updated_at.slice(5, -3)}]
            </Col>

            <Col span={18}>
              <CommentText text={item.content} />
            </Col>

            <Col span={1}>
              <Popconfirm
                title="确定删除这条评论？"
                okText="确定"
                cancelText="取消"
                onConfirm={this.onDeleteComment(this, item)}>
                <Button type="link">删除</Button>
              </Popconfirm>
            </Col>
          </Row>
        ))}
        {/* {!end && <Row align="middle" className="load-more">
          <Col span={24}>
            {fetching ? <LoadingOutlined /> : <Button type="link" onClick={this.updateComment}>加载更多</Button>}
          </Col>
        </Row>} */}
        <Row align="middle" gutter={24} className="comment-input-row">
          <Col span={22}>
            <Input.TextArea value={commentInputValue} rows={1} allowClear placeholder="请输入你的评论" onChange={this.onTextAreaChange} />
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.onSubmitBtnClick}>提交评论</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
