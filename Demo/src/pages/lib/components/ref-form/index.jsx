// import { PureComponent } from 'react';
// import { Modal, List, Row, Col, Select, Button } from 'antd';
// const { Option } = Select;

// // const selectOption = [ 'article', 'book', 'incollection', 'inproceedings', 'mastersthesis', 'phdthesis', 'proceedings', 'www' ];

// const formats = [ 'txt', 'csl' ];

// class RefForm extends PureComponent {
//   handleChange = value => {
//     const { dispatch, references } = this.props;
//     dispatch('setData', Object.assign(references, { format: value }));
//   }

//   handleClick = () => {
//     const { dispatch } = this.props;
//     dispatch('downloadRefs');
//   }

//   render() {
//     const { dispatch, references } = this.props;
//     const { loading, rows } = references;
//     return (<Modal
//     // 用formData.id是否被定义判断 编辑文献｜添加文献
//       title={
//         <Row>
//           <Col span={8}>引用文献</Col>
//           <Col span={2} offset={8}>
//             <Select defaultValue={formats[0]} onChange={this.handleChange} style={{ width: '100%' }}>
//               {formats.map((item, index) => <Option value={item} key={index}>{item.toUpperCase()}</Option>)}
//             </Select>
//           </Col>
//           <Col span={2} offset={1}>
//             <Button type="primary" onClick={this.handleClick}>
//                 下载引用
//             </Button>
//           </Col>
//         </Row>
//       }
//       visible={true}
//       footer={null}
//       width={1000}
//       onCancel={() => { dispatch('setData', { refFormVisible: false, references: { loading: false, rows: [], format: 'txt' }, currentFileId: -1 }); }}>
//       <List
//         loading={loading}
//         dataSource={rows}
//         renderItem={(item, idx) => (
//           <List.Item>
//             {`[${idx + 1}] ${item.row_text}`}
//           </List.Item>
//         )}
//       />
//     </Modal>);
//   }
// }

// export default RefForm;

