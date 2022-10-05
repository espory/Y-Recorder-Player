// import { PureComponent } from 'react';
// import { Table, Tooltip, Space, Button } from 'antd';
// import pageWrapper from '../../../components/page-wrapper';
// import PageContainer from '../../../components/page-container';
// import store from './store';
// // import './index.less';


// const cols = [{
//   title: '权限名',
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
// },
// {
//   title: '权限码',
//   dataIndex: 'code',
//   // ...this.getColumnSearchProps('title'),
//   ellipsis: {
//     showTitle: false,
//   },
//   render: name => (
//     <Tooltip placement="topLeft" title={name}>
//       {name}
//     </Tooltip>
//   ),
// },
// {
//   title: '创建者',
//   dataIndex: 'createrId',
//   // ...this.getColumnSearchProps('title'),
//   ellipsis: {
//     showTitle: false,
//   },
//   render: name => (
//     <Tooltip placement="topLeft" title={name}>
//       {name}
//     </Tooltip>
//   ),
//   width: 100,
// },
// {
//   title: '审阅者',
//   dataIndex: 'authorityList',
//   // ...this.getColumnSearchProps('title'),
//   ellipsis: {
//     showTitle: false,
//   },
//   render: name => (
//     <Tooltip placement="topLeft" title={name}>
//       {name}
//     </Tooltip>
//   ),
//   width: 100,
// }, {
//   title: '操作',
//   dataIndex: 'createrId',
//   render: () => {
//     return (<Space>
//       <Button size='small'>申请</Button></Space>);
//   },
// }];

// @pageWrapper({ store })
// class ApplyPermission extends PureComponent {

//   render() {
//     const { breadcrumb, pageInfo, dispatch } = this.props;
//     return <PageContainer breadcrumb={breadcrumb}>
//       <Table
//         columns={cols}
//         dataSource={[]}
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

// export default ApplyPermission;
