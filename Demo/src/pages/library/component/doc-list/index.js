import { PureComponent } from 'react';
import { Table } from 'antd';
import { genColumns } from '../../../../config/table.config';


class DocList extends PureComponent {
  rowSelection = {
    onChange: keys => {
      const { selectedRowKeys } = this.props;
      this.props.dispatch('setData', { selectedRowKeys: selectedRowKeys.concat(keys) });
    },
  };

  render() {
    const { dispatch, libraryList, pageInfo, mode } = this.props;
    return <Table
      columns={genColumns(mode, dispatch)}
      dataSource={libraryList}
      bordered
      pagination={{
        ...pageInfo,
        onChange: (current, pageSize) => {
          dispatch('pageChange', { ...pageInfo, current, pageSize });
        },
      }}
      rowSelection={mode === 'add2Group' ? this.rowSelection : ''
      }
    />;

  }
}

export default DocList;
