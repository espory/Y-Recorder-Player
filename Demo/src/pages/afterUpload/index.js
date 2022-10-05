import { PureComponent } from 'react';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import { Progress, Row, Col, Typography } from 'antd';
import store from './store';
import './index.less';
import ProcessPage from './component/process-page';
import IconToolTip from '../../components/iconToolTip';
const { Title } = Typography;

const leftOffset = 4;
const centerSpan = 16;
@pageWrapper({ store })
class UploadPdf extends PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    try {
      // 此页面必须通过正常的逻辑访问，若直接输入url则返回主页
      const { topicInfo, breadcrumb, files } = this.props.location.state;
      dispatch('initFileInfo', { files });
      dispatch('setData', { topicInfo, breadcrumb, currentFileIndex: 0, routerHistory: this.props.history });
    } catch (e) {
      window.location.href = '/';
    }
  }
  render() {
    const { dispatch, loading } = this.props;
    const { breadcrumb, fileInfo, currentFileIndex } = this.props;

    return <PageContainer breadcrumb={breadcrumb}>
      <div
        className = 'process-bar'
      >
        <Row>
          <Col offset={leftOffset} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Title style={{ margin: 0, marginRight: 5 }} level={4}>总进度</Title>
              <IconToolTip info={`共上传${fileInfo.length}篇文献，当前为第${currentFileIndex + 1}篇`}></IconToolTip>
            </div>
          </Col>
        </Row>

        <Row>
          <Col offset={leftOffset} span={centerSpan}>
            <Progress
              percent={(currentFileIndex) * 100 / fileInfo.length }
              format={() => `${currentFileIndex}/${fileInfo.length} `}
            />
          </Col>
        </Row>
      </div>

      <div className='process-page-container'>
        <Row>
          <Col offset={leftOffset} span={centerSpan}>
            <ProcessPage dataSource={ {
              fileInfo: fileInfo[currentFileIndex],
              currentFileIndex,
              loading,
              dispatch }}/>
          </Col>
        </Row>
      </div>
    </PageContainer>;
  }
}

export default UploadPdf;
