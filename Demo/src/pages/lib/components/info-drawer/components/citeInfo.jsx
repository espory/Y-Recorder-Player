
import { Input, Button } from 'antd';

const { TextArea } = Input;

export default function CiteInfo(props) {
  const { cite, setstatus } = props;
  const { bibtex = '', mla = '' } = cite;
  return (
    <div className="cite-frame">
      <div className='cite-title'>BibTex :</div>
      <TextArea
        value={bibtex.trim()}
        disabled
        placeholder="暂无引用信息"
        autoSize={{ minRows: 3 }}
        style={{ cursor: 'text' }}
      />
      <div className='cite-title'>Txt :</div>
      <TextArea
        value={mla.trim()}
        disabled
        placeholder="暂无引用信息"
        autoSize={{ minRows: 3 }}
        style={{ cursor: 'text' }}
      />
      <div className="cite-button">
        <Button type="primary" onClick={() => {
          setstatus('showInfo');
        }} >返回</Button>
      </div>
    </div>
  );
}
