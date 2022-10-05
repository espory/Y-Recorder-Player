import { Drawer, message } from 'antd';
import Info from './info';
import BatchExport from './batchExport';
import './index.less';
import { RightCircleOutlined } from '@ant-design/icons';


export default function InfoDrawer(props) {
  const {
    dispatch,
    record = {},
    cite = {},
    visible,
    drawerContent,
    selectedRowKeys,
    closeDrawer,
  } = props;
  // BatchExport导出引用信息调用方法
  const handleExportClick = async show => {
    // 通过show判断导出类型
    await dispatch('downloadCite', show ? 'bibtex' : 'mla');
    message.success('导出成功');
  };

  return (<Drawer
    mask={false}
    drawerStyle={{ height: '100%' }}
    style={{ position: 'relative', border: '1px solid rgb(238, 238, 238)' }}
    width={500}
    getContainer ={false}
    title={null}
    placement="right"
    closable={false}
    visible={visible}
    destroyOnClose={true}
  >
    {
      <div className='squash-drawer'
        onClick={() => {
          closeDrawer();
          if (drawerContent === 'export') {
            // 退出时，关闭多选框
            dispatch('multiChooseRevert', { deleted: false });
          }
        }}>
        <RightCircleOutlined style={{ verticalAlign: '0.125em' }}/>
      </div>
    }
    {/* 由于基本信息页和批量导出页复用同一drawer，需要根据drawerContent信息判断展示内容 */}
    {drawerContent === 'info' ?
      // 信息详情页（展示，编辑，引用）
      <Info
        cite = {cite}
        model = {record}
        dispatch={dispatch}
      /> :
      // 批处理导出
      <BatchExport
        dispatch={dispatch}
        selectedRowKeys={selectedRowKeys}
        handleExportClick={handleExportClick}
        cite = {cite}
      />
    }
  </Drawer>
  );
}
