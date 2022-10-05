import { PureComponent } from 'react';
import HeadForm from '../head-form';
import BibForm from '../bib-form';
import { Steps, Typography } from 'antd';
import { STATUS_INFO_MAP } from '../../const';
import './index.less';
const { Step } = Steps;
const { Title } = Typography;

export default class ProcessPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(nextProps) {
    const { fileInfo = {}, dispatch, loading } = nextProps.dataSource;
    const { status = [] } = fileInfo;

    if (status.length && status[0] === 'process' && !loading) {
      dispatch('uploadFile');
    }
    return nextProps;
  }

  render() {
    const { dispatch } = this.props.dataSource;
    const { fileInfo = {}, currentFileIndex = 0 } = this.props.dataSource;
    const { status = [], pdfData, bibData, file = {} } = fileInfo;
    const { name = '', type = '' } = file;
    return <>
      <div className="navi-file-title">
        <Title level={4}>
          { `文件${currentFileIndex + 1}：${name}`}
        </Title>
      </div>
      <div className='navi-steps'>

        <Steps
          type="navigation"
          current={status.indexOf('process')}
          size='small'>
          {status.map((it, idx) => {
            return <Step status={it} title={STATUS_INFO_MAP[idx].title} description={STATUS_INFO_MAP[idx].description[it]}/>;

          })}
        </Steps>
      </div>

      <HeadForm
        visible = { name.split('.').pop() === 'pdf' }
        dispatch = { dispatch }
        showPrevious ={ !!currentFileIndex}
        allowSubmit = {status.indexOf('process') === status.length - 1}
        data = { pdfData }
      />
      <BibForm
        visible = { name.split('.').pop() === 'bib' || [ 'bibtxt', 'reftxt' ].indexOf(type) !== -1 }
        showPrevious ={ !!currentFileIndex}
        dispatch = { dispatch }
        data = { bibData }
        allowSubmit = {status.indexOf('process') === status.length - 1}
      />
    </>;
  }
}
