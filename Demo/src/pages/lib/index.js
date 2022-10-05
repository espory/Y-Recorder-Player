import { PureComponent, createRef } from 'react';
import pageWrapper from '../../components/page-wrapper';
import Breadcrumb from '../../components/breadcrumb';
// import PageContainer from '../../components/page-container';
import FileForm from './components/file-form';
import FileTable from './components/file-table';
import LibHeader from './components/lib-header';
// import Timeline from './components/timeline';
// import MindMap from './components/mind-map';
import store from './store';
// import Graph from './components/graph';
// import RefForm from './components/ref-form';
import Settings from './components/settings';
import { Modal } from 'antd';
import './index.less';


@pageWrapper({ store })
class Lib extends PureComponent {
  containerRef = createRef()
  componentWillMount() {
    const { dispatch, breadcrumb, papersTimelineFilter } = this.props;
    // 此页面必须通过正常的逻辑访问，若直接输入url则返回主页
    try {
      const { topicInfo } = this.props.location.state;
      const { topicId, name } = topicInfo;
      dispatch('setData', {
        papersTimelineFilter: { ...papersTimelineFilter, topicId },
        topicInfo,
        topicId,
        breadcrumb: breadcrumb.concat([{ name, link: '/topic/library', state: { topicInfo } }]) });
      // dispatch('getRefGraph');
      dispatch('getLibrary', { topicId });
      dispatch('getLibrary', { topicId, deleted: true });
      // dispatch('getMindmap', { topicId });
      dispatch('getSettings', { topicId });
    } catch (e) {
      window.location.href = '/';
    }
  }

  render() {
    const { breadcrumb, topicInfo, dispatch, libHeaderTab } = this.props;
    const { fileFormVisible, formData, createType } = this.props;
    // const { refFormVisible, references } = this.props;
    const { libraryListInfo, deletedLibraryListInfo } = this.props;
    // const { mindmapStruct } = this.props;
    // const { papersTimeline, papersTimelineFilter } = this.props;
    const { bibErrorVisible, bibErrorInfo, filesList } = this.props;
    const { showCommentRows } = this.props;
    // const { refGraph } = this.props;
    const { history } = this.props;
    const { settings } = this.props;
    const { topicId, name, description } = topicInfo;
    return <>
      <div className='lib-container'>
        <div className='lib-breadcrumb'>
          <Breadcrumb list={breadcrumb}/>
        </div>
        <div className='lib-header'>
          <LibHeader dataSource={{ name, description, dispatch }}/>
        </div>
        <div className='lib-body' ref={this.containerRef}>
          { libHeaderTab === 'homepage' && <>
            <FileTable
              dispatch ={dispatch}
              history ={history}
              dataSource={{ ...libraryListInfo, deleted: false, showCommentRows, fileFormVisible }}
              tableColIdx = {settings.tableColIdx}
              tableColIdxOrigin={settings.tableColIdxOrigin}
            />
          </>}
          {/* { libHeaderTab === 'mindmap' && <>
            <MindMap
              dispatch ={dispatch}
              history ={history}
              dataSource={{ ...libraryListInfo }}
              topicInfo = {{ topicId, topicName: name }}
              mindmapStruct = {mindmapStruct}
            />
          </>} */}
          {/* { libHeaderTab === 'timeline' && <Timeline dataSource={{ papersTimeline, papersTimelineFilter, dispatch }} /> } */}
          { libHeaderTab === 'trash' && <><FileTable
            dispatch ={dispatch}
            history ={history}
            dataSource={{ ...deletedLibraryListInfo, deleted: true }}
            tableColIdx = {[ 0, 1, 2, 3, 4, 9 ]} // 控制回收站显示哪列
          />
          </> }
          { libHeaderTab === 'settings' && <Settings settings={settings} dispatch={dispatch} /> }

        </div>
      </div>
      {fileFormVisible && <FileForm
        formData={formData}
        createType={createType}
        dispatch={dispatch}
        history ={history}
        topicId={topicId}/>
      }
      {<Modal
        title="解析bib文件遇到问题"
        visible={bibErrorVisible}
        onOk={() => {
          dispatch('setData', { bibErrorVisible: false });
          dispatch('toAfterUpload', { files: filesList, history });
        }}
        onCancel={() => {
          dispatch('setData', { bibErrorVisible: false });
          location.reload();
        }}
        okText="跳过错误"
        cancelText="放弃提交"
      >
        { bibErrorInfo.map(info => {
          const { title, content } = info;
          return <>
            <h4>{title.replace('input.bib文件', '用户输入的内容')}</h4>
            <div style={{ whiteSpace: 'pre-line', color: 'red' }}>
              {content}
            </div>
            <br/>
          </>;
        }) }
      </Modal>}
      {/* { refFormVisible &&
      <RefForm
        dispatch={dispatch}
        references={references}
      />} */}
    </>;
  }
}

export default Lib;
