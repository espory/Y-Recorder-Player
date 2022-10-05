// import { PureComponent } from 'react';
// import { Row, Col, Timeline, Anchor, Radio, DatePicker, Result, notification, message } from 'antd';
// import './index.less';

// const { Link } = Anchor;
// const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';

// export default class PaperTimeline extends PureComponent {
//   handleClickPaperTitle = async url => {
//     console.log(url);
//     if (url.length) {
//       const { papersTimelineFilter } = this.props.dataSource;
//       const { topicId } = papersTimelineFilter;
//       notification.success({
//         message: 'PDF加载中...',
//         placement: 'topRight',
//       });
//       setTimeout(() => {
//         window.open(window.location.origin + `/pdfPreview.html?topicId=${topicId}&url=${url}`, '_blank');
//       }, 500);
//     } else {
//       message.info('暂无PDF文件');
//     }
//   }

//   handleChangeSort = async e => {
//     const { papersTimelineFilter, dispatch } = this.props.dataSource;
//     await dispatch('setData', { papersTimelineFilter: { ...papersTimelineFilter, field: e.target.value } });
//     await dispatch('getTimeline');
//   }

//   handleChangeDateRange = async (dates, dateStrings) => {
//     const { papersTimelineFilter, dispatch } = this.props.dataSource;
//     await dispatch('setData', { papersTimelineFilter: { ...papersTimelineFilter, from: dateStrings[0], to: dates[1].add(1, 'days').format(dateFormat) } });
//     await dispatch('getTimeline');
//   }

//   render() {
//     const { papersTimeline, papersTimelineFilter } = this.props.dataSource;

//     const dateTag = [];
//     const timelineItems = papersTimeline.map((paper, index) => {
//       const { created_at, fileUrl, title, comments, id, authors } = paper;
//       let paperCreatedTime = created_at;
//       if (papersTimelineFilter.field === 'commentAt' && comments) paperCreatedTime = comments[0].created_at;
//       const paperCreatedDate = paperCreatedTime.substr(0, 7);
//       const item = (
//         <Timeline.Item
//           key={id}
//           dot={<div style={{ backgroundColor: '#8c8c8c', width: 10, height: 10, borderRadius: '50%' }} />}
//           label={<div style={{ fontSize: 12, fontWeight: 300 }}>
//             <div>{paperCreatedTime.substr(5, 11)}</div>
//             <div style={{ fontSize: 12, letterSpacing: 1, color: '#8c8c8c', '-webkit-line-clamp': '2', display: '-webkit-box', '-webkit-box-orient': 'vertical', textOverflow: 'ellipsis', wordBreak: 'break-all', overflow: 'hidden' }}>
//               {authors}
//             </div>
//           </div>}>
//           <div className="paper-title" onClick={this.handleClickPaperTitle.bind(this, fileUrl)}>{title}</div>
//           <span className="triangle"></span>
//         </Timeline.Item>
//       );
//       if (dateTag.length !== 0 && dateTag[dateTag.length - 1] === paperCreatedDate) {
//         return item;
//       }
//       dateTag.push(paperCreatedDate);
//       return [
//         <Timeline.Item
//           key={paperCreatedDate + '_' + index}
//           id={paperCreatedDate}
//           dot={<div style={{ border: '5px solid #2B6EBA', width: 15, height: 15, borderRadius: '50%' }} />}>
//           <div style={{ color: 'rgba(43,110,186,0.9)', fontWeight: 400, fontSize: 18, fontStyle: 'italic', letterSpacing: 2 }}>{paperCreatedDate}</div>
//         </Timeline.Item>,
//         item,
//       ];

//     }).flat();

//     return (
//       <div className="out-of-drawer">
//         <Radio.Group onChange={this.handleChangeSort} defaultValue="createAt">
//           <Radio.Button value="createAt">按创建日期排序</Radio.Button>
//           <Radio.Button value="commentAt">按评论日期排序</Radio.Button>
//         </Radio.Group>
//         <RangePicker
//           // defaultValue={[ moment(moment().subtract(6, 'days'), dateFormat), moment(moment(), dateFormat) ]}
//           format={dateFormat}
//           style={{ marginLeft: 20 }}
//           onChange={this.handleChangeDateRange} />

//         { timelineItems.length ?
//           <Row style={{ paddingTop: 40 }}>
//             <Col span={2}>
//               <Anchor>
//                 {dateTag.map(item =>
//                   <Link key={item} href={'#' + item} title={item}></Link>
//                 )}
//               </Anchor>
//             </Col>
//             <Col span={16}>
//               <Timeline mode="left">
//                 {timelineItems.map(item => item)}
//               </Timeline>
//             </Col>
//           </Row> :
//           <Result style={{ paddingTop: 80 }} title="NO DATA" />}
//       </div>
//     );
//   }
// }
