import { Switch, Button, Input } from 'antd';
import { useState } from 'react';
import { Empty } from 'antd';
const { TextArea } = Input;
export default function batchExport(props) {
  const { cite, selectedRowKeys, handleExportClick } = props;
  const { bibtex, mla } = cite;
  const [ show, setshow ] = useState(true);
  const exportLen = selectedRowKeys.length;

  return (
    exportLen ? <div className="batchExportFrame">
      <div className="header">
        <div className="buttonDiv">
          <Button type="primary" onClick={() => { handleExportClick(show); }}>导出</Button>
          <span className="txt-span">
          选择了{exportLen}篇文献
          </span>
        </div>
        <div className="switchDiv">
          <Switch defaultChecked onChange={change => {
            setshow(change);
            console.log(change);
          }} />
        </div>
      </div>

      {show ? <TextArea
        value={bibtex}
        disabled
        placeholder="暂无引用信息"
        autoSize={{ minRows: 3 }}
        style={{ cursor: 'text' }}
      /> : <TextArea
        value={mla}
        disabled
        placeholder="暂无引用信息"
        autoSize={{ minRows: 3 }}
        style={{ cursor: 'text' }}
      />}
    </div> : <div className='empty-div'><Empty /></div>
  );
}
