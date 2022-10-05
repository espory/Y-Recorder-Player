import { PureComponent } from 'react';
import { Result } from 'antd';

export default class Error404 extends PureComponent {

  render() {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />;
  }
}
