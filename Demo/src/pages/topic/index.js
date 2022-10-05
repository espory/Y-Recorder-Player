import { PureComponent } from 'react';
import { Row, Col, Empty, Button } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import TopicForm from './components/topic-form';
import CardItem from './components/crad-item';
import TitleBar from './components/title-bar';
import store from './store';
import { PlusOutlined } from '@ant-design/icons';

import './index.less';

@pageWrapper({ store })
class Topic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardHeight: 100,
    };
  }
  componentDidMount() {
  }

  render() {
    const { dispatch, breadcrumb } = this.props;
    const { topicList, topicFilted } = this.props;

    const { topicFormVisible, formData, formStatus } = this.props;


    return <PageContainer breadcrumb={breadcrumb}>
      <div className="topic-container">
        <div className="topic-header">
        </div>
        <div className="topic-content">
          <TitleBar dispatch={dispatch}></TitleBar>
          <div className={topicList.length === 0 ? 'body-center' : ''}>
            {
              (topicList.length === 0) &&
                <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={
                  <>
                    {
                      topicFilted && <div>无数据</div>
                    }
                    {
                      !topicFilted &&
                      <Button
                        type='primary'
                        onClick={() => {
                          dispatch('setData', { topicFormVisible: true, formStatus: 'create' });
                        }}>创建主题
                      </Button> }
                  </>
                }>
                </Empty>
            }
            <Row justify="start" gutter={[ 10, 10 ]}>
              {topicList.map((item, idx) => {
                return (<Col span={8} key={idx}>
                  <CardItem
                    ref = {this.cardRef}
                    dispatch={dispatch}
                    source={{ ...item, contentList: item.files.map(file => {
                      return { text: file.title, link: '', editTime: file.updated_at };
                    }) }}/></Col>);
              })
              }
              <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 219 }}>
                {/* <div
                  style={{
                    borderRadius: '50%',
                    border: '1.5px solid #e2e4e7',
                    padding: 10,
                    cursor: 'pointer' }}
                  onClick={() => {
                    dispatch('setData', { topicFormVisible: true, formStatus: 'create' });
                  }}>
                  <PlusOutlined style={{ fontSize: 28 }}/>
                </div> */}
                {(!!topicList.length && !topicFilted) && <Button
                  size="large"
                  icon={<PlusOutlined/>}
                  shape='circle'

                  onClick={() => {
                    dispatch('setData', { topicFormVisible: true, formStatus: 'create' });
                  }}/>
                }
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <TopicForm
        visible={topicFormVisible}
        dispatch={ dispatch }
        formData={ formData }
        formStatus={ formStatus }
      />
    </PageContainer>;
  }
}

export default Topic;
