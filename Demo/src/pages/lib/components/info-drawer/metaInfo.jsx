// import { PureComponent } from 'react';
// import { Select, Input, Row, Typography, Button, Upload } from 'antd';
// import { SyncOutlined, CheckCircleTwoTone, UploadOutlined } from '@ant-design/icons';
// import FieldEditor from './components/fieldEditor';
// import FileButton from './components/fileButton';
// import { deepCopy, deepCompare } from '../../../../common/utils';

// import './index.less';
// const { TextArea } = Input;
// const { Option } = Select;
// const { Title } = Typography;
// // const selectOption = [ 'article', 'book', 'incollection', 'inproceedings', 'mastersthesis', 'phdthesis', 'proceedings', 'www' ];
// // [ 'Article', 'Book', 'Booklet', 'Conference', 'Inbook', 'Incollection', 'Inproceedings', 'Manual', 'Masterthesis', 'Phdthesis', 'Proceedings', 'Techreport', 'Unpublished', 'Misc' ];
// const types = {
//   Journal: 'Journal',
//   Book: 'Book',
//   Conference: 'Conference',
//   arXiv: 'arXiv',
//   Misc: 'Misc',
// };
// const initialState = {
//   editable: [ false, false, false ],
//   synchronizing: false,
//   synchronized: false,
//   fundemental: {
//     title: '',
//     authors: [],
//     id: null,
//     type: 'misc',
//     status: 2,
//     fileUrl: '',
//     tags: '',
//     mark: 0,
//     user_modify: null,
//     user_create: null,
//     updated_at: '',
//   },
//   publish: {
//     'number-of-pages': 0,
//     page: '',
//     year: '',
//     publisher: '',
//     'publisher-place': '',
//     'collection-title': '',
//     'container-title': '',
//   },
//   identifer: {
//     ISBN: '',
//     ISSN: '',
//     doi: '',
//     URL: '',
//     'citation-label': '',
//   },
// };
// const notInExtra = [ 'id', 'title', 'authors', 'type', 'url', 'user_modify', 'user_create', 'year', 'doi', 'updated_at', 'status' ];
// class metaInfo extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = deepCopy(initialState);
//   }

//   componentWillReceiveProps(nextProps) {
//     const { record } = nextProps;
//     if (record !== this.props.record) {
//       this.mapValues(record);
//     }
//   }
//   updateInfoPackage= () => {
//     const scopes = [ 'fundemental', 'publish', 'identifer' ];
//     const extra = {};
//     const updateInfo = {};
//     const state = this.state;
//     for (const scope of scopes) {
//       for (const key of Object.keys(state[scope])) {
//         const target = state[scope][key];
//         if (notInExtra.indexOf(key) === -1) {
//           extra[key] = target;
//         } else {
//           updateInfo[key] = target;
//         }
//       }
//     }
//     updateInfo.extra = extra;
//     return updateInfo;
//   }
//   mapValues = record => {
//     const scopes = [ 'fundemental', 'publish', 'identifer' ];
//     const grouped = [];
//     const newState = deepCopy(initialState);
//     newState.editable = this.state.editable;
//     Object.keys(record).forEach(key => {
//       for (const scope of scopes) {
//         for (const item of Object.keys(newState[scope])) {
//           if (item === key) {
//             grouped.push(key);
//             const target = record[key];
//             if (target === '') {
//               continue;
//             }
//             newState[scope][key] = record[key];
//           }
//         }
//       }
//     });
//     for (const key of Object.keys(record)) {
//       if (grouped.indexOf(key) === -1) {
//         console.log('ungrouped:', key);
//       }
//     }
//     this.setState({ ...newState });
//   }

//   shouldUpdate = async () => {
//     const { record, dispatch } = this.props;
//     const current = this.updateInfoPackage();
//     if (!deepCompare(current, record, 0)) {
//       current.fileId = current.id;
//       this.setState({ synchronizing: true });
//       await dispatch('updateFile', current);
//       this.setState({ synchronizing: false, synchronized: true });
//       setTimeout(() => {
//         this.setState({ synchronized: false });
//       }, 1000);
//     }
//   }
//   setEditable = idx => {
//     const length = this.state.editable.length;
//     if (typeof idx === 'number' && idx < length) {
//       const newEditable = [];
//       for (let i = 0; i < length; i++) {
//         if (i === idx) {
//           newEditable.push(true);
//         } else {
//           newEditable.push(false);
//         }
//       }
//       this.setState({ editable: newEditable });
//     }
//   }
//   render() {
//     const { editable, fundemental, publish, identifer, synchronizing, synchronized } = this.state;
//     const { title, authors, type, url, id } = fundemental;
//     const { dispatch } = this.props;
//     const haveFile = !!url.length;
//     const authorsString = authors.join(',');
//     return <div onClick ={() => {
//       this.setEditable(-1);
//       this.shouldUpdate();
//     }}>
//       {/* 类别 */}
//       <Row style={{ alignItems: 'center' }}>
//         <Select value ={type || 'Misc'} style={{ width: 120 }} bordered={false}
//           onClick = {
//             e => { e.stopPropagation(); }
//           }
//           onChange={value => {
//             this.setState({ fundemental: { ...fundemental, type: value } }, () => this.shouldUpdate());

//           }}>
//           {Object.keys(types).map(key => <Option value={key}>{types[key]}</Option>)}
//         </Select>
//         <div>
//           {synchronizing && !synchronized && <SyncOutlined spin className='spin-icon'/>}
//           {synchronized && <CheckCircleTwoTone twoToneColor="#52c41a" className='fadeout-icon'/>}
//         </div>
//       </Row>
//       <h2>{title}</h2>

//       {/* 作者 */}
//       <FieldEditor
//         displayContent ={authorsString === '' ? '暂无作者信息' : authorsString}
//         name = {'作者'}
//         editing={editable[0]}
//         style={{ fontStyle: 'italic', marginBottom: 20 }}
//         onClick ={() => {
//           this.setEditable(0);
//           this.shouldUpdate();
//         }}>
//         <div>
//           <TextArea defaultValue={ authors.join('\n')}
//             autoSize
//             onChange={e => { this.setState({ fundemental: { ...fundemental, authors: e.target.value.split('\n') } }); }}>
//           </TextArea>
//           <span style={{ fontStyle: 'italic', color: 'grey' }}>每个作者占一行</span>
//         </div>
//       </FieldEditor>

//       {/* 文件管理 */}
//       <div style= {{ marginBottom: 20 }}>
//         <Title level={4} style={{ color: 'grey' }} >文献</Title>
//         {haveFile && <FileButton dispatch={dispatch} fileUrl={url} fileId = {id}/>}
//         {!haveFile &&
//         <Upload
//           onClick ={e => {
//             e.stopPropagation();
//           }}
//           accept ='.pdf'
//           beforeUpload ={file => {
//             dispatch('updateFileUrl', { file, fileId: id });
//             return false;
//           }}>
//           <Button icon={<UploadOutlined />}
//           >选择文献</Button>
//         </Upload>
//         }
//       </div>

//       {/* 出版信息 */}
//       <FieldEditor
//         name = {'出版'}
//         style={{ marginBottom: 20 }}
//         onClick ={() => {
//           this.setEditable(1);
//           this.shouldUpdate();
//         }}
//         displayContent ={Object.keys(publish).map(key => {
//           const target = publish[key];
//           return {
//             name: key,
//             content: publish[key],
//             warp: false,
//             visible: typeof target === 'string' ? !!target.length : !!target,
//           };
//         })}
//         warp={false}
//         editing={editable[1]}
//       >{Object.keys(publish).map(key =>
//           <TextArea
//             defaultValue={publish[key]}
//             autoSize
//             onChange={e => {
//               const newPublish = { ...publish };
//               newPublish[key] = e.target.value;
//               this.setState({ publish: newPublish });
//             }}>
//           </TextArea>)}
//       </FieldEditor>

//       {/* 卷号/刊号等 */}
//       <FieldEditor
//         name = {'版号'}
//         style={{ marginBottom: 20 }}
//         onClick ={() => {
//           this.setEditable(2);
//           this.shouldUpdate();
//         }}
//         displayContent ={Object.keys(identifer).map(key => {
//           const target = identifer[key];
//           return {
//             name: key,
//             content: identifer[key],
//             warp: false,
//             visible: typeof target === 'string' ? !!target.length : !!target,
//           };
//         })}
//         warp={false}
//         editing={editable[2]}
//       >{Object.keys(identifer).map(key =>
//           <TextArea
//             defaultValue={identifer[key]}
//             autoSize
//             onChange={e => {
//               const newIdentifer = { ...identifer };
//               newIdentifer[key] = e.target.value;
//               this.setState({ identifer: newIdentifer });
//             }}></TextArea>)}
//       </FieldEditor>
//     </div>;
//   }
// }

// export default metaInfo;
