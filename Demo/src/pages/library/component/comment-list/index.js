import { PureComponent, createRef } from 'react';
import { Input, Button, Modal, List, Form, Row, Col, Skeleton, Avatar } from 'antd';


class CommentList extends PureComponent {
  commentFormRef = createRef();

  commentFormChange = async e => {
    const { dispatch } = this.props;
    dispatch('setData', { docComment: e.target.value });
  }

  onReset = () => {
    this.commentFormRef.current.resetFields();
  };

  render() {
    const { visible, commentList, commentPageInfo, dispatch, onCancel } = this.props;
    return <Modal
      title="评论"
      visible={visible}
      footer=''
      onCancel={ onCancel }
      confirmLoading={ false }>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        size="large"
        loading={ false }
        pagination={{
          onChange: (current, pageSize) => {
            dispatch('setData', { commentPageInfo: { ...commentPageInfo, current, pageSize } });
            dispatch('commentPageChange');
          },
          size: 'small',
          ...commentPageInfo,
        }}
        dataSource={commentList}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.user.avatar} />
                }
                title={<a>{item.user.name}</a>}
                description={item.content}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <span></span>
      <Form style={{ marginTop: 10 + 'px' }} ref={this.commentFormRef}>
        <Row>
          <Col span={20}>
            <Form.Item name="comment">
              <Input placeholder="请输入你的评论" onChange={this.commentFormChange}/>
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item>
              <Button type="primary" onClick={ () => { dispatch('createComment', { resetField: this.onReset }); } } className="comment-form-button">
                发送
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>;
  }
}

export default CommentList;

