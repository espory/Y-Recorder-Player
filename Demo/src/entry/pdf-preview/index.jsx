import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from '../../model';

import PDFPreview from './component/pdfPreview.jsx';

const store = getStore();
store.start();

export default class Container extends PureComponent {
  render() {
    return (
      <Provider store={store.redux}>
        <PDFPreview />
      </Provider>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));