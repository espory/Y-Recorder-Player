import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../components/app';
import { getStore } from '../../model';
const store = getStore();
store.start();
export default class Container extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store.redux}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
