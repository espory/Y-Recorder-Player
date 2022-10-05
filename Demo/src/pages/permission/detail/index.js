// import { PureComponent } from 'react';
// import { Row, Col, Table, Divider, Button, Tooltip, Space } from 'antd';
// import PageContainer from '../../../components/page-container';
// import pageWrapper from '../../../components/page-wrapper';
// import store from './store';
// import './index.less';

// const cols = [{
//   title: '用户',
//   dataIndex: 'name',
//   // ...this.getColumnSearchProps('title'),
//   ellipsis: {
//     showTitle: false,
//   },
//   render: name => (
//     <Tooltip placement="topLeft" title={name}>
//       {name}
//     </Tooltip>
//   ),
// }, {
//   title: '操作',
//   dataIndex: 'createrId',
//   render: () => {
//     return (<Space>
//       <Button size='small'>分配</Button><Button size='small'>修改</Button>
//       <Button size='small'>删除</Button></Space>);
//   },
// }];
// @pageWrapper({ store })
// class PermissionDetail extends PureComponent {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     const { state } = this.props.location;
//     const { code, level } = state;
//     dispatch('getAssigned', { code, level });
//   }

//   render() {
//     const { breadcrumb, permissionList, pageInfo, dispatch } = this.props;
//     return <PageContainer breadcrumb={breadcrumb}>
//       <Row className='head'>
//         <Col span ={3}>
//           <span style={{ fontSize: 20 }}>用户列表</span></Col>
//         <Col span ={18} >
//           <Divider className='divider'/>
//         </Col>
//         <Col span = {2} offset={1} >
//           <Button type='primary' onClick={() => { dispatch('setData', { permissionFormVisible: true }); }}>创建权限</Button></Col>
//       </Row>
//       <Table
//         columns={cols}
//         dataSource={permissionList}
//         bordered
//         pagination={{
//           ...pageInfo,
//           onChange: (current, pageSize) => {
//             dispatch('pageChange', { ...pageInfo, current, pageSize });
//           },
//         }}
//       />
//     </PageContainer>;
//   }
// }

// export default PermissionDetail;
