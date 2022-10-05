import { PureComponent } from 'react';

import pageWrapper from '../../../components/page-wrapper';
import store from './store';

import { Result } from 'antd';
import './pdfPreview.less';


@pageWrapper({ store })
class PDFPreview extends PureComponent {
  render() {
    const { blobUrl, is404 } = this.props;

    return (
      <div>
        { is404 ? <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." /> :
          <div>
            <iframe src={blobUrl} type="application/pdf" className="ifc" />
          </div>}
      </div>
    );
  }
}

export default PDFPreview;
