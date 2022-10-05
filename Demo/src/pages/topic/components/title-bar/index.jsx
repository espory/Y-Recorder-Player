import { PureComponent } from 'react';
import { Button, Dropdown, Menu, Tooltip, Input, Popover } from 'antd';
import { Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, BarsOutlined, SwapOutlined } from '@ant-design/icons';
import './index.less';
const MenuItem = Menu.Item;

const buttonStyle = { width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const iconStyle = { fontSize: 16 };
const buttons = dispatch => {
  return [
    {
      name: 'search',
      component: (
        <Popover
          title={null}
          placement='left'
          trigger='click'
          content={
            <Input
              placeholder="搜索主题"
              allowClear
              bordered={false}
              style={{ width: 250, background: '#F1F3F4' }}
              prefix={<SearchOutlined />}
              onChange={e => {
                // 清空时触发一次getInitTopic
                if (e.target.value === '') {
                  dispatch('getInitTopic');
                }
              }}
              onPressEnter={e => { dispatch('getInitTopic', { name: e.target.value }); }}/>}
        >
          <Button
            style={buttonStyle}
            icon ={<SearchOutlined style={iconStyle}/>}/>
        </Popover>),
      toolTip: '搜索',
    },
    {
      name: 'addTopic',
      component: (
        <Button
          style={buttonStyle}
          onClick={() => { dispatch('setData', { topicFormVisible: true, formStatus: 'create' }); }}
          icon={<PlusOutlined style={iconStyle}/>}>
        </Button>),
      toolTip: '新增',
    },
    {
      name: 'sort',
      component: (
        <Dropdown
          overlay={
            <Menu
              onClick={key => { dispatch('sortTopic', { key }); }}>
              {[ '名称', ' 创建时间', '修改时间' ].map(item => {
                return (<MenuItem key={item}>{item}</MenuItem>);
              })}
            </Menu>}>
          <Button
            style={buttonStyle}
            icon={<SwapOutlined rotate={90} style={iconStyle} />}>
          </Button>
        </Dropdown>),
      toolTip: '排序',
    },
    {
      name: 'displayMode',
      component: (
        <Dropdown
          overlay={
            <Menu
              onClick={key => { dispatch('sortTopic', { key }); }}>
              {[ '卡片', ' 列表' ].map(item => {
                return (<MenuItem key={item}>{item}</MenuItem>);
              })}
            </Menu>}>
          <Button
            style={buttonStyle}
            icon={<BarsOutlined style={iconStyle}/>}>
          </Button>
        </Dropdown>),
      toolTip: '显示',
    },
  ];
};

export default class TitleBar extends PureComponent {
  render() {
    const { dispatch } = this.props;
    return (<>
      <div className="title-container">
        <Row style={{ width: '100%' }}>
          <Col flex='70px'>文献库</Col>
          <Col flex='auto' className='divider-container' >
            <div className="divider" ></div>
          </Col>
          <Col flex ='140px' className='buttons'>
            {buttons(dispatch).map((item, idx) => {
              return (<Tooltip key={idx} title={item.toolTip}>{item.component}</Tooltip>);
            })}
          </Col>
        </Row>
      </div>
    </>);
  }
}
