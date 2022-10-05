import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Row, Col, Skeleton, Dropdown, Menu, Tooltip } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import TextAvatar from '../../../../components/textAvatar';

import './index.less';
const CONTENT_MAX_LENGTH = 3;

export default class CardItem extends PureComponent {
  extraMenu() {
    const { dispatch, source } = this.props;
    const { id } = source;
    return (
      <Menu onClick={item => {
        item.domEvent.stopPropagation();
        if (item.key === 'delete') {
          dispatch('deleteTopic', { id });
        }
        if (item.key === 'edit') {
          dispatch('setData', { topicFormVisible: true, formStatus: 'update', formData: source });
        }
      }}>
        <Menu.Item key={'delete'}>删除</Menu.Item>
        <Menu.Item key={'edit'}>编辑</Menu.Item>
      </Menu>);
  }
  render() {
    const { name = '', description, contentList = [], id } = this.props.source;
    const topicInfo = { topicId: id, name, description };
    return (<div className="container">
      <Skeleton avatar paragraph={{ rows: 3 }} loading={false}>
        <div className="head">
          <Row>
            <Col span={22} style={{ paddingTop: 10 }}>
              <Link to={{ pathname: '/topic/library', state: { topicInfo } }}>
                <Card.Meta
                  avatar={<TextAvatar size={44} name={name} style={{ marginTop: 3 }}/>}
                  title={name}
                  description={
                    <Tooltip placement="leftTop" title={description}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden',
                        textOverflow: 'ellipsis' }}>
                        {description}
                      </div>
                    </Tooltip>}
                />
              </Link>
            </Col>
            <Col span={2}>
              <Dropdown overlay={this.extraMenu()} trigger={[ 'click' ]} arrow>
                <Button size="small" onClick ={e => { e.stopPropagation(); }} icon={<EllipsisOutlined rotate={90}/>} style={{ marginTop: 0, border: 0 }}></Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <Divider className='divider'></Divider>
        <div className="body">
          <div className="inner">
            { contentList.slice(0, CONTENT_MAX_LENGTH).map((item, idx) => {
              return (<div className="row" key={idx}>
                <div className="left" style={{ whiteSpace: 'nowrap', overflow: 'hidden',
                  textOverflow: 'ellipsis' }}>
                  <span style={{ marginRight: 5 }}>•</span>
                  <span
                    style={{
                      fontSize: 14,
                    }}>{item.text}</span>
                </div>
                <div className='time-info'>
                  {/* 只显示y-d h-m */}
                  {item.editTime.slice(5, -3)}
                </div>
              </div>);
            })
            }
          </div>
        </div>
      </Skeleton>
    </div>);
  }
}
