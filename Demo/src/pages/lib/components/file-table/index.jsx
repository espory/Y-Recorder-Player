import { PureComponent, createRef } from 'react';
import { Table, message, Empty, Spin, Button, Checkbox, Input, Space } from 'antd';
import { colsPackager } from './config';
import ToolBar from './tool-bar';
import CommentList from './comment-list';
import InfoDrawer from '../info-drawer';
import { SearchOutlined } from '@ant-design/icons';
import { colValues, checkSplitFile } from '../../utils';

const validExtend = [ 'pdf', 'bib' ];

let trRef; // 全局变量，用于存放表格头部的引用
let drawerRef; // 全局变量，用于存放drawer的引用
const ColResizeThreshold = 10;

const myPreventDefault = e => {
  e.preventDefault();
};
export default class FileTable extends PureComponent {
  containerRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 当前选中的表格行
      onRowRecord: {}, // 存放infoDrawer中的表格信息,在点击某一行的时候记录
      drawerVisible: false,
      drawerContent: 'info', // 由于基本信息页和批量导出页复用同一drawer，需要根据drawerContent信息判断展示内容
      currentRecord: null,
      dragBlockVisible: false,
      dragBlockHeight: 570,
      dragBlockTopOffset: 55,
      canTableClick: true, // 表格是否可以点击，批量导出时防止表格点击误操作

    };
  }
  // 点击设置初始状态
  onContainerMouseDown = event => {
    if (Math.abs(event.x - drawerRef.getBoundingClientRect().left) < ColResizeThreshold) {
      this.containerRef.current.addEventListener('mousemove', this.onContainerMouseMove);
      Object.assign(this.containerRef.current, {
        oldX: event.x,
        oldWidth: drawerRef.offsetWidth,
        mouseDown: true,
      });
    }
  }
  // 结束改变宽度状态
  onContainerMouseUpOrLeave = () => {
    this.containerRef.current.removeEventListener('mousemove', this.onContainerMouseMove);
    Object.assign(this.containerRef.current, {
      oldX: undefined,
      oldWidth: undefined,
      mouseDown: false,
    });
  }

  // 移动到drawer的border附近改变图标
  onDrawerBorderMouseMove = event => {
    if (Math.abs(event.x - drawerRef.getBoundingClientRect().left) < ColResizeThreshold) {
      this.containerRef.current.style.cursor = 'col-resize';
    } else {
      this.containerRef.current.style.cursor = 'default';
    }
  }
  // 计算改变后的宽度
  onContainerMouseMove = event => {
    const container = this.containerRef.current;
    if (container && container.mouseDown === true) {
      let width = drawerRef.offsetWidth;
      if (container.oldWidth - (event.x - container.oldX) > 0) {
        width = container.oldWidth - (event.x - container.oldX);
      }
      drawerRef.style.width = width + 'px';
    }
  }
  componentDidMount() {
    drawerRef = document.querySelector('.ant-drawer');
    const container = this.containerRef.current;
    container.addEventListener('mousedown', this.onContainerMouseDown);
    container.addEventListener('mouseup', this.onContainerMouseUpOrLeave);
    container.addEventListener('mouseleave', this.onContainerMouseUpOrLeave);
    container.addEventListener('mousemove', this.onDrawerBorderMouseMove);
    // 监听浏览器内的滚动事件
    const { dataSource = {} } = this.props;
    const { deleted = false } = dataSource;
    this.deleted = deleted;
    // window.addEventListener('scroll', this.onScrollEvent, false);
    if (!deleted) {
    // 覆盖浏览器的drop事件,阻止dragover事件才能触发drop事件
      document.addEventListener('dragover', myPreventDefault);
      document.addEventListener('drop', myPreventDefault);
      // this.interval = setInterval(() => dispatch('updateStatus'), 10 * 1000);

      document.addEventListener('dragenter', this.setDragBlockVisible, false);
      document.addEventListener('mouseleave', this.setDragBlockUnvisible, false);
    }
  }
  componentWillReceiveProps(props) {
    const { dataSource } = props;
    const { flag, libraryList } = dataSource;
    const { multiChoose } = flag;
    if (multiChoose) {
      const fileIds = libraryList.map(item => item.id);
      for (const id of this.state.selectedRowKeys) {
        if (fileIds.indexOf(id) === -1) {
          this.setState({ selectedRowKeys: [] });
          break;
        }
      }
    }
    const { currentRecord } = this.state;
    if (currentRecord) {
      for (const item of libraryList) {
        if (item.id === currentRecord.id) {
          this.setState({ onRowRecord: item });
          break;
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    // 当监听到表格的列信息发生变化，则重新绑定tr
    // TODO-BUG: 更改列信息之后ComponentDidupdate不会理解调用,导致新产生的列无法调整列宽
    const oldCol = prevProps.tableColIdx;
    const newCol = this.props.tableColIdx;
    // 比较前后的tableColIndex数组是否相同
    let equal = true;
    if (oldCol.length !== newCol.length) {
      equal = false;
    } else {
      for (let i = 0; i < oldCol.length; i++) {
        if (oldCol[i] !== newCol[i]) {
          equal = false;
          break;
        }
      }
    }
    // 如果tableColIndex发生变化,那此时是fileTable挂载完成的时刻
    if (!equal) {
      console.log('changed');
      let tr = document.querySelectorAll('.ant-table-thead tr'); // 表头DOM
      if (tr) {
        trRef = tr = tr[0];
        // console.log('tr', tr);
        tr.addEventListener('mousedown', this.onTrMouseDown);
        tr.addEventListener('mouseup', this.onTrMouseUpOrLeave);
        tr.addEventListener('mouseleave', this.onTrMouseUpOrLeave);
        for (let i = 0; i < tr.childNodes.length; i++) {
          const header = tr.childNodes[i];
          header.addEventListener('mousemove', this.onHeaderMouseMove(i, tr.childNodes.length - 1));
          let initWidth;
          if (i < newCol.length) {
            initWidth = colValues[newCol[i]].initWidth;
          }
          if (initWidth) {
            header.style.width = initWidth;
          }
        }
      }
    }
  }
  setDragBlockVisible = () => {
    // 设置虚线框的样式（高度，位置等）
    const { dataSource } = this.props;
    const { fileFormVisible, libraryList } = dataSource;
    if (fileFormVisible) {
      return;
    }
    const table = document.getElementById('file-table');
    const thead = table.getElementsByClassName('ant-table-thead')[0];
    const tableHeight = table.clientHeight;
    const theadHeight = thead.clientHeight;
    let dragBlockTopOffset;
    if (libraryList.length === 0) {
      dragBlockTopOffset = theadHeight;
    } else {
      const tbodyRow1 = table.getElementsByClassName('ant-table-row')[0];
      const tbodyRow1Height = tbodyRow1.clientHeight;
      dragBlockTopOffset = theadHeight + tbodyRow1Height;
    }
    const dragBlockHeight = (libraryList.length > 0 && libraryList.length < 7) ?
      500 : tableHeight - dragBlockTopOffset;
    this.setState(state => ({ ...state, dragBlockHeight, dragBlockTopOffset }));
    this.setState({ dragBlockVisible: true });
  }
  setDragBlockUnvisible = () => {
    this.setState({ dragBlockVisible: false });
  }

  /**
   * 监听表头的鼠标点击事件，如果鼠标在列边框附近 ColResizeThreshold px 被点击则认为是“更改列宽度“
   * mousedown(colResize事件开始) => mousemove(colResize事件执行中) => mouseup/mouseleave(colResize事件结束)
   */
  onTrMouseDown = event => {
    // console.log(event.target, 'mousedown');
    const headers = trRef.childNodes;
    for (let i = 0; i < headers.length - 1; i++) {
      const header = headers[i];
      if (Math.abs(event.x - header.getBoundingClientRect().right) < ColResizeThreshold) {
        trRef.addEventListener('mousemove', this.onTrMouseMove);
        trRef.oldX = event.x; // 鼠标点击的开始坐标
        trRef.oldWidth = header.offsetWidth; // 原col的宽度
        trRef.mouseDown = true; // 是否开始colResize行为
        trRef.header = header; // resize的col的引用
      }
    }
  }
  // 显示拖拽图标
  onHeaderMouseMove = (index, tailIndex) => event => {
    // target 与 currentTarget 的区别
    // const header = event.target;
    const header = event.currentTarget; // 指向header而不是实际发生event的子元素
    const headerRect = header.getBoundingClientRect();
    if (index !== tailIndex && event.clientX > headerRect.right - ColResizeThreshold) { // 非末尾元素的右边界
      header.style.cursor = 'col-resize';
    } else if (index !== 0 && event.clientX < headerRect.left + ColResizeThreshold) { // 非起始元素的左边界
      header.style.cursor = 'col-resize';
    } else {
      header.style.cursor = 'pointer';
    }
  }
  /**
   * mousemove过程中需计算新的宽度值
   * 新width(style.width) = 旧width(offsetWidth) + event.x(当前时刻) - event.x(mousedown时刻)
   * 声明：
   * 1. 原width取用header.offsetWidth = border+padding+width,需要border-box（已符合）
   * 2. 更新width使用style.width，即直接设置，因为是属性为border-box所以style.width与offset的计算方式相同
   * 3. event.x 指的是 event.clientX 即距离窗口左端的水平距离
   * 4. getBoundaryRect的位置相对的也是窗口
   */
  onTrMouseMove = event => {
    if (trRef && trRef.mouseDown === true) {
      let width = trRef.header.offsetWidth;
      if (trRef.oldWidth + (event.x - trRef.oldX) > 0) {
        width = trRef.oldWidth + (event.x - trRef.oldX);
      }
      trRef.header.style.width = width / trRef.offsetWidth * 100 + '%'; // 换算为百分比，方便响应式布局
    }
  }
  // 鼠标从元素上移开和鼠标左键松开都会触发mouseup,表示colResize结束
  onTrMouseUpOrLeave = () => {
    // console.log(event.target, 'mouseup or mouseleave');
    if (trRef) {
      trRef.removeEventListener('mousemove', this.onTrMouseMove);
      // TODO:部分博客声称mouseup后的click事件是无法阻止的，也就是说无法避免筛选按钮和排序按钮的点击
      // if (trRef.mouseDown === true) {
      //   event.preventDefault();
      // }
      trRef.oldX = undefined;
      trRef.oldWidth = undefined;
      trRef.mouseDown = false;
      trRef.header = undefined;
    }
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (!this.deleted) {
      // window.removeEventListener('scroll', this.onScrollEvent, false);
      document.removeEventListener('dragover', myPreventDefault, false);
      document.removeEventListener('dragenter', this.setDragBlockVisible, false);
      document.removeEventListener('mouseleave', this.setDragBlockUnvisible, false);
    }
  }
  // 表格拖拽上传触发
  toAfterUpload = () => {
    const { dispatch, history } = this.props;
    return async e => {
      const { files } = e.dataTransfer || e.target;
      if (!files || !files.length) {
        console.log('colResize时的误拖拽,停止colResize事件');
        if (trRef) {
          trRef.oldX = undefined;
          trRef.oldWidth = undefined;
          trRef.mouseDown = false;
          trRef.header = undefined;
        }
        return;
      }
      for (const file of files) {
        if (validExtend.indexOf(file.name.split('.').pop()) === -1) {
          message.error('仅支持.pdf .bib文件');
          return;
        }
      }
      const { filesList, bibErrorInfo } = await checkSplitFile(files);
      if (bibErrorInfo.length > 0) {
        dispatch('setData', { bibErrorVisible: true, bibErrorInfo, filesList });
      } else {
        dispatch('toAfterUpload', { files: filesList, history });
      }
    };
  }
  addSelectionCol = cols => {
    const { dispatch } = this.props;
    if (this.props.dataSource.flag.multiChoose) {
      const selectionCol = {
        title: <Checkbox
          indeterminate = {!(this.state.selectedRowKeys.length === 0 || this.state.selectedRowKeys.length === this.props.dataSource.libraryList.length)}
          checked={this.state.selectedRowKeys.length === this.props.dataSource.libraryList.length}
          onClick={event => {
            event.stopPropagation();
          }}
          onChange={ async event => {
            if (event.target.checked) {
              // const { dispatch } = this.props;
              // await dispatch('getFullLibrary');
              const allKeys = this.props.dataSource.libraryList.map(it => {
                return it.id;
              });
              dispatch('getBibTexAndMla', { fileIds: [].concat(allKeys) });
              this.setState({ selectedRowKeys: allKeys });
            } else {
              this.setState({ selectedRowKeys: [] });
            }
          }}
        />,
        width: '28px',
        render: text => {
          return <Checkbox
            checked={this.state.selectedRowKeys.indexOf(text.id) !== -1}
            // 阻止冒泡引起的infoDrawer弹出事件
            onClick={event => {
              event.stopPropagation();
            }}
            onChange={() => {
              const selectedRowKeys = [ ...this.state.selectedRowKeys ];
              const currentRowIdx = selectedRowKeys.indexOf(text.id);
              if (currentRowIdx === -1) {
                selectedRowKeys.push(text.id);
              } else {
                selectedRowKeys.splice(currentRowIdx, 1);
              }
              if (selectedRowKeys.length) { dispatch('getBibTexAndMla', { fileIds: [].concat(selectedRowKeys) }); }
              this.setState({ selectedRowKeys });
            }}/>;
        },
      };
      cols.push(selectionCol);
    }
    return cols;
  }
  getColumnSearchProps = dataIndex => ({
    onFilter: (values, record) => {
      // 保证比较两者都是string
      let pattern = values;
      if (values && Array.isArray(values)) {
        pattern = values.pop();
      }
      if (typeof pattern !== 'string') {
        return false;
      }
      let target = record[dataIndex] || '';
      if (typeof target === 'string') {
        target = [ target ];
      }
      for (const it of target) {
        if (typeof it === 'string') {
          if (it.toLowerCase().indexOf(pattern.toLowerCase()) !== -1) {
            return true;
          }
        }
      }
      return false;
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            onClick={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 90 }}>
            搜索
          </Button>
          <Button
            size="small"
            onClick={() => this.handleColumnReset(clearFilters)}
            style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  })
  handleColumnSearch = async (selectedKeys, confirm) => {
    confirm();
  }
  handleColumnReset = async clearFilters => {
    clearFilters();
  }
  addSearchFilter = cols => (
    cols.map(col => (col.filters || (col.title === '操作' || col.title === '附件') ? col : {
      ...col,
      ...this.getColumnSearchProps(col.dataIndex),
    }))
  )
  // onScrollEvent = async event => {
  // const windowHeight = window.innerHeight;
  // const { top: scrollTop, height: scrollHeight } = ScollPostion(event.target.scrollingElement);
  // const { dispatch, dataSource } = this.props;
  // const { flag } = dataSource;
  // const { fetching, end } = flag;
  // if ((scrollTop > (scrollHeight - windowHeight) * 0.9) && !fetching && !end) {
  //   dispatch('getNextPage', { deleted: this.deleted });
  // }
  // }
  // handleTableChange = (pagination, filters, sorter) => {
  //   const { dispatch } = this.props;
  //   let { field = '', order = '' } = sorter;
  //   if (order === '') {
  //     field = '';
  //   }
  //   const type = filters.type || [];
  //   dispatch('onFilterChange', { types: type.join(','), field, order: order.slice(0, -3), deleted: this.deleted });
  // };
  onRow = dispatch => record => {
    const { currentRecord, drawerVisible, canTableClick } = this.state;
    const { tableColIdxOrigin } = this.props;
    let clickCnt = 0;
    return {
      // 点击表格行控制弹出层
      onClick: () => {
        clickCnt = clickCnt + 1;
        const that = this;
        // 防止双击事件点击时，执行单击事件
        // 设置定时器，对单击事件进行延迟操作
        const clickTimer = setTimeout(() => {
          if (clickCnt === 1) {
            if (canTableClick) {
              if (currentRecord && currentRecord.id === record.id && drawerVisible) { // 单击表格行关闭右侧滑框时
                that.setState({ drawerVisible: false });
                dispatch('setSettings', { tableColIdx: tableColIdxOrigin }); // 把隐藏的列表行恢复原状
              } else { // 单击表格行开启右侧滑框时
                that.setState({ onRowRecord: record, drawerVisible: true, drawerContent: 'info', currentRecord: record });
                dispatch('setSettings', { tableColIdx: [ 0, 1 ] }); // 弹出时，控制显示列
                dispatch('getBibTexAndMla', { fileIds: [ record.id ] });
                dispatch('getAttachment', { fileId: record.id });
                // dispatch('getRefGraph');
              }
            }
          }
          clearTimeout(clickTimer);
        }, 250);

      },
      onDoubleClick: () => {
        dispatch('setExpandRows', record.id);
      },
    };
  }
  expandedRowRender = dispatch => record => {
    // 看了一下控制台，不知道为什么这个方法每次点击都会被执行两次？？
    console.log('render');
    return (
      <CommentList fileId={ record.id } dispatch={dispatch} />
    );
  }

  render() {
    const { dataSource, dispatch, tableColIdx, tableColIdxOrigin } = this.props;
    const { flag, libraryList, deleted, showCommentRows, cite } = dataSource;
    const { fetching, multiChoose } = flag;
    const { selectedRowKeys, onRowRecord, drawerVisible, drawerContent, dragBlockVisible, dragBlockHeight, dragBlockTopOffset } = this.state;
    return (<div ref={this.containerRef} style={{ display: 'flex' }}>
      <div className="out-of-drawer">
        <ToolBar tableColIdx={tableColIdx} tableColIdxOrigin={tableColIdxOrigin} dataSource = {{ dispatch, deleted, multiChoose }}
          handleCanTableClick = { status => {
            this.setState({ canTableClick: status });
          }}
          handleBatchExportClick ={isVisible => {
          // 获取文献索引信息
            this.setState({ drawerVisible: !isVisible, drawerContent: 'export' });
          // dispatch('getBibTexAndMla', { fileIds: [].concat(selectedRowKeys) });
          }}></ToolBar>
        {/* {(multiChoose && !deleted) && <Row style ={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Button type='primary' disabled={!selectedRowKeys.length}
            onClick={() => {
              // 获取文献索引信息
              this.setState({ drawerVisible: true, drawerContent: 'export' });
              dispatch('getBibTexAndMla', { fileIds: [].concat(selectedRowKeys) });
            }}>导出</Button>
          <span style={{ margin: '0 10px' }}>选择了{selectedRowKeys.length}篇文献</span>
        </Row>} */}
        <div
          className="drag-block"
          style={{
            lineHeight: `${dragBlockHeight}px`,
            height: `${dragBlockHeight}px`,
            top: `${dragBlockTopOffset}px`,
            zIndex: dragBlockVisible ? 10 : -1 }}
          onDrop={this.toAfterUpload()}>
          拖动文件进行添加文件
        </div>
        <Table
          id="file-table"
          rowKey = "id"
          locale={{
            emptyText:
            <Empty tag='div'
              className="empty-info"
              description={
                <>
                  <span>暂无数据，拖动文献到页面内即可保存文献</span>
                  <br/>
                  <span>支持{validExtend.map(it => ('.' + it)).join(' ')}文件</span>
                </>
              }></Empty>,
          }}
          // addSelectionCol 多选框选择
          // addSearchFilter 列搜索排序
          // colsPackager 按需选择显示列
          columns={this.addSelectionCol(this.addSearchFilter(colsPackager(tableColIdx, dispatch)))}
          dataSource={libraryList}
          bordered
          pagination={false}
          // onChange={this.handleTableChange}
          onRow={deleted ? null : this.onRow(dispatch)}
          className="table-pos"
          style={{ top: `-${dragBlockHeight}px`, cursor: 'pointer' }}
          expandable={{
            expandIconColumnIndex: -1,
            expandedRowRender: this.expandedRowRender(dispatch),
            expandedRowKeys: showCommentRows,
          }}
        />
      </div>
      { <InfoDrawer
        dispatch={dispatch}
        visible={drawerVisible}
        record={onRowRecord}
        drawerContent = {drawerContent}
        selectedRowKeys = {selectedRowKeys}
        tableColIdxOrigin={tableColIdxOrigin}
        cite = {cite}
        closeDrawer = {() => {
          this.setState({ drawerVisible: false, canTableClick: true });
          dispatch('setSettings', { tableColIdx: tableColIdxOrigin });// 退出时，将表格显示全
        }}
      />}
      <div className='table-foot'>
        {fetching && <Spin></Spin>}
        {/* {end && <span >加载完毕</span>} */}
      </div></div>);
  }
}
