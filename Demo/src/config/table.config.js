import { Popconfirm, Tooltip, Space } from 'antd';
export const operation = (mode, dispatch) => (text, record) => {
  if (mode === 'related' || mode === 'search') {
    return <Space>
      <a onClick={() => {
        dispatch('getCommentData', { commentDocId: record.id });
      }}>评论{ record.commentLength > 0 && ('(' + record.commentLength + ')')}</a>
      <a onClick={() => {
        dispatch('setData', { showUpdate: true, tuple: record });
      }}>修改</a>
    </Space>;
  }
  if (mode === 'add2Group') {
    return <Space>
      <a onClick={() => {
        dispatch('getCommentData', { commentDocId: record.id });
      }}>评论{ record.commentLength > 0 && ('(' + record.commentLength + ')')}</a>
      <a onClick={() => {
        dispatch('setData', { showUpdate: true, tuple: record });
      }}>修改</a>
    </Space>;
  }
  if (mode === 'deleteFromGroup') {
    return <Space>
      <a onClick={() => {
        dispatch('getCommentData', { commentDocId: record.id });
      }}>评论{ record.commentLength > 0 && ('(' + record.commentLength + ')')}</a>
      <a onClick={() => {
        dispatch('setData', { showUpdate: true, tuple: record });
      }}>修改</a>
      <Popconfirm
        title="是否移除此文献？"
        onConfirm={() => {
          dispatch('removeDocs', { docIds: [ record.id ] });
        }}
        okText="是"
        cancelText="否">
        <a>移除</a>
      </Popconfirm>
    </Space>;
  }
};
export function genColumns(mode, dispatch) {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      // ...this.getColumnSearchProps('title'),
      ellipsis: {
        showTitle: false,
      },
      render: title => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: '文献类型',
      dataIndex: 'type',
      width: 125,
      filters: [
        { text: 'article', value: 'article' },
        { text: 'book', value: 'book' },
        { text: 'incollection', value: 'incollection' },
        { text: 'inproceedings', value: 'inproceedings' },
        { text: 'mastersthesis', value: 'mastersthesis' },
        { text: 'phdthesis', value: 'phdthesis' },
        { text: 'proceedings', value: 'proceedings' },
        { text: 'www', value: 'www' },
      ],
    },
    {
      title: '作者',
      dataIndex: 'authors',
      width: 130,
      ellipsis: {
        showTitle: false,
      },
      render: authors => (
        <Tooltip placement="topLeft" title={authors}>
          {authors}
        </Tooltip>
      ),
    },
    {
      title: '编者',
      dataIndex: 'editors',
      width: 130,
      ellipsis: {
        showTitle: false,
      },
      render: editors => (
        <Tooltip placement="topLeft" title={editors}>
          {editors}
        </Tooltip>
      ),
    },
    {
      title: '年份',
      dataIndex: 'year',
      width: 70,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: operation(mode, dispatch),
      width: 160,

    },
  ];
}
