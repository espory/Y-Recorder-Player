import { PureComponent } from 'react';
import Breadcrumb from '../breadcrumb';
import './index.less';

export default class PageContainer extends PureComponent {

  render() {
    const { breadcrumb, children } = this.props;
    return <div className="page-content-container">
      <Breadcrumb list={breadcrumb} />
      <div className="page-content">
        {children}
      </div>
    </div>;
  }
}
