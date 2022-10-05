import { Breadcrumb } from 'antd';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
const { Item } = Breadcrumb;
export default class MyBreadcrumb extends PureComponent {
  render() {
    const { list } = this.props;
    return (<Breadcrumb>
      {list.map((item, index) => {
        const { name, link, state = {} } = item;
        return <Item key={index}>{(index === list.length - 1)
          ? <span style={{ fontWeight: 'bold' }}>{`${name}`}</span>
          : <Link key={index} to={{ pathname: link, state }}>{`${name}`}</Link>}
        </Item>;
      })}
    </Breadcrumb>);
  }
}
