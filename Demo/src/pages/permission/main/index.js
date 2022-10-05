// import { PureComponent } from 'react';
// import { Row, Col, Table, Divider, Button, Tooltip, Space, Tag } from 'antd';
// import { Link } from 'react-router-dom';
// import pageWrapper from '../../../components/page-wrapper';
// import PageContainer from '../../../components/page-container';
// import store from './store';
// import './index.less';
// import PermissionForm from '../components/permission-form';

// const OWNER = 1;
// const MEMBER = 0;

// const cols = [{
//   title: '权限名',
//   dataIndex: 'name',
//   // ...this.getColumnSearchProps('title'),
//   ellipsis: {
//     showTitle: false,
//   },
//   render: text => (
//     <Tooltip placement="topLeft" title={text}>
//       {text}
//     </Tooltip>
//   ),
// },
// {
//   title: '权限码',
//   dataIndex: 'code',
//   ellipsis: {
//     showTitle: false,
//   },
//   render: text => (
//     <Tooltip placement="topLeft" title={text}>
//       {text}
//     </Tooltip>
//   ),
// },
// {
//   title: '权限',
//   dataIndex: 'level',
//   ellipsis: {
//     showTitle: false,
//   },
//   render: text => {
//     if (text === OWNER) {
//       return (<Tooltip title='可编辑分配此权限'><Tag color="processing">拥有者</Tag></Tooltip>);
//     }
//     if (text === MEMBER) {
//       return (<Tooltip title='仅可使用此权限'><Tag color="default">成员</Tag></Tooltip>);
//     }
//   },
//   width: 100,
// },
// {
//   title: '创建者',
//   dataIndex: 'createrId',
//   ellipsis: {
//     showTitle: false,
//   },
//   render: text => (
//     <Tooltip placement="topLeft" title={text}>
//       {text}
//     </Tooltip>
//   ),
//   width: 100,
// },
// {
//   title: '操作',
//   dataIndex: 'code',
//   render: (text, record) => {
//     return (<Space>
//       <Link to={{ pathname: '/permission/detail', state: { code: text, level: 1 } }}>
//         <Button size='small' disabled={!record.level}>分配</Button>
//       </Link>
//       <Button size='small'>修改</Button>
//       <Button size='small'>删除</Button></Space>);
//   },
// }];
// @pageWrapper({ store })
// class Permission extends PureComponent {
//   render() {
//     const { breadcrumb, permissionList, pageInfo, dispatch, permissionFormVisible } = this.props;
//     return <PageContainer breadcrumb={breadcrumb}>
//       <div className='permission-main-body'>
//         <Row className='head'>
//           <Col span ={2}>权限列表</Col>
//           <Col span ={10} >
//             <Divider className='divider'/>
//           </Col>
//           <Col span = {2} offset={10} >
//             <Button type='primary' onClick={() => { dispatch('setData', { permissionFormVisible: true }); }}>创建权限</Button></Col>
//         </Row>
//         <Table
//           columns={cols}
//           dataSource={permissionList}
//           bordered
//           pagination={{
//             ...pageInfo,
//             onChange: (current, pageSize) => {
//               dispatch('pageChange', { ...pageInfo, current, pageSize });
//             },
//           }}
//         />
//         <PermissionForm dispatch={dispatch} visible={permissionFormVisible}>
//         </PermissionForm>
//       </div>
//     </PageContainer>;
//   }
// }

// export default Permission;
