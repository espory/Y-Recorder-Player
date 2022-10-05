import { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
import SearchInput from './searchInput';
import './index.less';


export default class LibHeader extends PureComponent {
  render() {
    const { tableColIdx, tableColIdxOrigin, handleBatchExportClick, handleCanTableClick } = this.props;
    const { dispatch, deleted, multiChoose } = this.props.dataSource;
    return (
      <Row className='lib-header-toolbar'>
        <Col span={6}>
          <SearchInput tableColIdx={tableColIdx} dispatch={dispatch} deleted={deleted} ></SearchInput>
        </Col>
        { !deleted &&
          <>
            <Col span={6} offset={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='primary' style={{ width: '45%', padding: 'auto' }}
                onClick={() => { dispatch('setData', { createType: 'document', fileFormVisible: true }); }}>
              添加文献
              </Button>
              <Button type='primary' style={{ width: '45%', padding: 'auto' }}
                onClick={async () => {
                  await dispatch('multiChooseRevert', { deleted });
                  await handleBatchExportClick(multiChoose);
                  if (multiChoose) {
                    await dispatch('setSettings', { tableColIdx: tableColIdxOrigin });
                    handleCanTableClick(true);
                  } else {
                    await dispatch('setSettings', { tableColIdx: [ 0, 1 ] });
                    handleCanTableClick(false);
                  }
                }}>
                {multiChoose ? '取消' : '批量导出'}
              </Button>
            </Col>
          </>
        }
        { deleted &&
          <>
            <Col span={2} offset={16}>
              <Button type='primary' style={{ width: '100%' }}
                onClick={() => { dispatch('clearAll', { deleted }); }}>
               清空
              </Button>
            </Col>
          </>
        }

      </Row>
    );
  }
}
