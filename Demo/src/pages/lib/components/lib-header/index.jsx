import { PureComponent } from 'react';
import { Row, Col, Menu, Typography } from 'antd';
import { HomeOutlined, SettingOutlined, RestOutlined } from '@ant-design/icons';
// 思维导图图标
// import { HistoryOutlined, PartitionOutlined } from '@ant-design/icons';

import IconToolTip from '../../../../components/iconToolTip';

// import SearchInput from '../search-input';
import TextAvatar from '../../../../components/textAvatar';
import './index.less';
const { Title } = Typography;
const { Item: MenuItem } = Menu;

const libHeaderMenu = [
  {
    name: 'homepage',
    icon: HomeOutlined,
    text: '主页',
  },
  // {
  //   name: 'timeline',
  //   icon: HistoryOutlined,
  //   text: '时间线',
  // },
  // {
  //   name: 'mindmap',
  //   icon: PartitionOutlined,
  //   text: '思维导图',
  // },
  // {
  //   name: 'mindMap',
  //   icon: PartitionOutlined,
  //   text: '思维导图',
  // },
  {
    name: 'trash',
    icon: RestOutlined,
    text: '回收站',
  },
  {
    name: 'settings',
    icon: SettingOutlined,
    text: '设置',
  },
];
export default class LibHeader extends PureComponent {
  componentDidMount() {
  }

  handleClickMenuItem = async event => {
    const { dispatch } = this.props.dataSource;
    await dispatch('setData', { libHeaderTab: event.key });
    // if (event.key === 'timeline') {
    //   await dispatch('getTimeline');
    // }
  }

  render() {
    const { name, description } = this.props.dataSource;
    return (
      <div className='lib-header-container'>
        <Row className='title'>
          <Col>
            <TextAvatar size={56} style={{ fontSize: 28, marginRight: 15 }} name={name} theme/>
          </Col>
          <Col>
            <Row>
              <Col >
                <Title level={4} style={{ margin: 0 }}>{name}</Title>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                <IconToolTip info={'你可以在主题内添加文献，Aplus将会自动获取文献的元信息'}></IconToolTip>
              </Col>
            </Row>
            {description}
          </Col>
        </Row>
        <div >
          <Menu className='menu' mode={'horizontal'} defaultSelectedKeys={[ 'homepage' ]} onClick={this.handleClickMenuItem}>
            {libHeaderMenu.map(it => {
              return (<MenuItem
                key={it.name}
                icon={<it.icon/>}
              >{it.text}</MenuItem>);
            })}
          </Menu>
        </div>
      </div>
    );
  }
}
