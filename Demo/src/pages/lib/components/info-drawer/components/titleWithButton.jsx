import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';

const CiteSvg = () => (
  <svg t="1612067146529" className="icon" viewBox="0 0 1211 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1573" width="14" height="14"><path d="M1206.243142 309.434182c0.279273 268.567273-142.429091 517.585455-376.180364 656.011636a87.412364 87.412364 0 0 1-92.625454 8.936727 84.712727 84.712727 0 0 1-47.010909-79.127272 84.992 84.992 0 0 1 53.34109-75.124364c102.4-60.229818 184.32-148.945455 235.52-254.882909h-28.392727c-142.987636 0-258.885818-114.129455-258.885818-254.976 0-140.753455 115.898182-254.882909 258.792727-254.882909 143.080727 0 258.978909 114.129455 258.978909 254.882909l-3.444363-0.837818z m-690.362182 0c0 268.288-142.801455 516.840727-376.180364 655.173818a87.412364 87.412364 0 0 1-92.718545 8.936727 84.712727 84.712727 0 0 1-46.917818-79.127272 84.992 84.992 0 0 1 53.341091-75.124364c102.4-60.229818 184.32-148.945455 235.52-254.882909H260.439505C117.451869 564.410182 1.646778 450.280727 1.646778 309.434182 1.646778 168.680727 117.358778 54.551273 260.439505 54.551273c142.987636 0 258.978909 114.129455 258.97891 254.882909h-3.537455z" fill="#333333" p-id="1574"></path></svg>
);
const CiteIcon = props => <Icon component={CiteSvg} {...props} />;

export default function titleWithButton(props) {
  const { status, setstatus, dispatch, model } = props;
  const { title, id } = model;
  // 获取索引信息
  const getCiteInfo = () => {
    dispatch('getBibTexAndMla', { fileIds: [ id ] });
  };
  return (
    <div className="info-title-div">
      <div className="info-title" style={{ display: status !== 'editInfo' ? '' : 'none' }}>
        {title}
        <span className="info-button-div" style={{ display: status === 'showInfo' ? '' : 'none' }}>
          <Button
            size='small'
            icon={<EditOutlined/>}
            style={{ marginRight: '12px' }}
            onClick={() => {
              setstatus('editInfo');
            }}>
          </Button>
          <Button
            size='small'
            icon={<CiteIcon/>}
            onClick={() => {
              setstatus('citeInfo');
              getCiteInfo();
            }}>
          </Button>
        </span>
      </div>
    </div>
  );
}
