import { Button, Space, Tooltip, Popconfirm, Tag, Rate } from 'antd';
import { CommentOutlined, DeleteOutlined, FilePdfOutlined, SyncOutlined, LoadingOutlined, RollbackOutlined, PaperClipOutlined } from '@ant-design/icons';
import './index.less';
import { colValues, tagsColors, fileIcon } from '../../utils';
import { getLoadedDocModel } from '../../docTypeModels';
const FILE_STATUS = {
  wait: 0,
  process: 1,
  finish: 2,
  failed: 3,
};
const stringSorter = field => (a, b) => {
  let aField = a[field] || '';
  let bField = b[field] || '';
  // 应对可能会遇到数字与字符串比较的状况，比如年份的2020与无年份数据
  if (typeof aField === 'number' && typeof bField === 'number') {
    return aField > bField ? 1 : -1;
  }
  if (typeof aField === 'number' || typeof bField === 'number') {
    aField = aField || 0;
    bField = bField || 0;
    return aField > bField ? 1 : -1;
  }
  return aField.toLowerCase() > bField.toLowerCase() ? 1 : -1;


};
// 表格每一列的render和相应的动作，与src/pages/lib/utils.js对应
// TODO: Check cols的每一项中的title好像是没有意义的,会被colValues[i].label覆盖掉,可以考虑删除以防误解
const cols = {
  title: {
    title: '标题',
    dataIndex: 'title',
    sorter: stringSorter('title'),
    render: dispatch => (text, record) => {
      const { fileUrl = '', id } = record;
      return (
        <Tooltip placement="topLeft" title={text}>
          {/* 对没有添加PDF的数据询问是否需要添加pdf文件 */}
          <Popconfirm
            overlayClassName = 'aplus-upload'
            arrowPointAtCenter
            placement='bottom'
            disabled={!!fileUrl.length}
            title ={'暂无pdf文件，是否添加？'}
            okText={<div className='warpper'>选择文件
              <input className='input-file' accept=".pdf,.bib" type="file" style={{ cursor: 'pointer' }} onChange={e => {
                const { files } = e.target;
                dispatch('updateFileUrl', { file: files[0], fileId: id });
              }}/>
            </div>}
            cancelText='取消'
          >
            <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              onClick={e => {
                e.stopPropagation();
                if (fileUrl.length) {
                  dispatch('downloadFile', { url: fileUrl, title: text });
                }
              }}>
              {!!fileUrl.length && <FilePdfOutlined className='icon-pdf' /> }
              { text }
            </div>
          </Popconfirm>
        </Tooltip>
      );
    },
  },
  type: {
    title: '文献类型',
    dataIndex: 'type',
    sorter: stringSorter('type'),
    filters: Object.keys(getLoadedDocModel()).map(key => ({
      text: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    })),
    onFilter: (value, record) => value === record.type,
    render: () => text => (text.charAt(0).toUpperCase() + text.slice(1)),
  },
  authors: {
    title: '作者',
    dataIndex: 'authors',
    ellipsis: {
      showTitle: false,
    },
    sorter: (a, b) => (a.authors.join(' and ').toLowerCase() > b.authors.join(' and ').toLowerCase()),
    render: () => authors => {
      const text = authors.join(' and ');
      return <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>;
    },
  },
  journal: {
    title: '出版',
    dataIndex: 'journal',
    ellipsis: {
      showTitle: false,
    },
    sorter: stringSorter('journal'),
    render: () => text => {
      return <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>;
    },
  },
  year: {
    title: '年份',
    dataIndex: 'year',
    sorter: stringSorter('year'),
    showSorterTooltip: false,
    // 在这里添加宽度会导致宽度无法拖拽调整
    // width: '80px',
    render: () => year => {
      return year === 0 ? '' : year;
    },
  },
  updated_at: {
    title: '最后修改',
    dataIndex: 'updated_at',
    sorter: stringSorter('updated_at'),
    showSorterTooltip: false,
  },
  tags: {
    title: '标签',
    dataIndex: 'tags',
    sorter: stringSorter('tags'),
    render: () => arr => {
      return arr.length > 0 ? <div>
        {
          arr.map((tag, index) => {
            return <Tag color={tagsColors[index % tagsColors.length]}>{tag}</Tag>;
          })}
      </div> : '暂无标签';
    },
  },
  mark: {
    title: '评分',
    dataIndex: 'mark',
    sorter: (a, b) => a.mark - b.mark,
    showSorterTooltip: false,
    onFilter: (value, record) => value === record.mark,
    filters: function() {
      const max = 5;
      const r = [];
      for (let i = max; i >= 0; i--) {
        r.push({ text: i,
          value: i });
      }
      return r;
    }(),
    render: () => text => {
      return text ? <Rate disabled={true} value={text} style={{ fontSize: '14px' }} /> : '暂无评分';
    },
  },
  attachment: {
    title: '附件',
    dataIndex: 'attachment',
    render: () => (text, record) => {
      const attachments = record.file_attachments.filter(attachment => (attachment.attachment_url));
      return (
        attachments.length ?
          <div>
            {attachments.map(attachment => {
              const url = attachment.attachment_url;
              return fileIcon(url, 'file-icon');
            })}
          </div> : '暂无附件'
      );
    },
  },
  trashOperation: {
    title: '操作',
    dataIndex: 'id',
    render: dispatch => (text, record) => {
      return (<Space>
        <Tooltip title='恢复'>
          <Button
            size='small'
            icon={<RollbackOutlined/>}
            onClick={e => {
              e.stopPropagation();
              dispatch('moveFiles', { ids: [ record.id ], deleted: false });
            }}>
          </Button>
        </Tooltip>

        <Button size='small'
          icon={<DeleteOutlined/>}
          onClick={e => {
            e.stopPropagation();
            dispatch('deleteFiles', { ids: [ record.id ] });
          }}/>

      </Space>);
    },
  },
  operation: {
    title: '操作',
    dataIndex: 'id',
    render: dispatch => (text, record) => {
      const { status } = record;
      const metaInfoWaiting = (FILE_STATUS.wait === status);
      const metaInfoFetching = (FILE_STATUS.process === status);
      return (<Space>
        <Tooltip title='评论'>
          <Button
            size='small'
            icon={<CommentOutlined/>}
            onClick={async e => {
              e.stopPropagation();
              await dispatch('setExpandRows', record.id);
            }}>
          </Button>
        </Tooltip>
        <Tooltip title='附件'>
          <Button
            size='small'
            icon={<PaperClipOutlined/>}
            onClick={async e => {
              e.stopPropagation();
              await dispatch('createAttachment', { id: record.id });
            }}>
          </Button>
        </Tooltip>
        <Button size='small' icon={<DeleteOutlined/>}
          onClick = {e => {
            e.stopPropagation();
            dispatch('moveFiles', { ids: [ record.id ], deleted: true });
          }}/>
        {metaInfoWaiting && <Tooltip
          title={`等待同步${record.wait ? `,前方还有${record.wait}篇文献` : ''}`}>
          <LoadingOutlined/>
        </Tooltip>}
        {metaInfoFetching && <Tooltip
          // onVisibleChange={visible => {
          //   if (visible) {
          //     dispatch('updateStaus', { fileId: record.id, title: record.title, index });
          //   }
          // }}
          title='同步中'>
          <SyncOutlined
            spin
          />
        </Tooltip>}
      </Space>);
    },
  },
};

/**
 * 根据colIdx选择要显示的列，然后从cols中读入render和其他配置信息用于渲染表格
 * @param colIdxs：要显示的列序号
 * @param dispatch
 * @return {[]}：要显示的列及其渲染和配置信息
 */
export function colsPackager(colIdxs, dispatch) {
  const result = [];
  for (const i of colIdxs) {
    if (i < colValues.length) {
      const temp = cols[colValues[i].key];
      let { render } = temp;
      temp.title = colValues[i].label;
      if (render && typeof render === 'function') {
        render = render(dispatch);
      }
      result.push({ ...temp, render });
    }
  }
  return result;
}
