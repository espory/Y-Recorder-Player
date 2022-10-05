import { useState, useEffect } from 'react';
import ShowInfo from './components/showInfo';
import EditInfo from './components/editInfo';
import CiteInfo from './components/citeInfo';
import TitleWithButton from './components/titleWithButton';
import Abstract from './components/abstract';

export default function info(props) {
  // 控制显示
  const { cite } = props;
  const { dispatch } = props;
  const { model } = props;

  // status 默认 'showInfo'
  const [ status, setstatus ] = useState('showInfo');

  // 初始进入显示的是展示页面
  useEffect(() => {
    setstatus('showInfo');
  }, []);
  return (
    <div>
      <TitleWithButton
        status={status}
        setstatus={setstatus}
        model={model}
        dispatch={dispatch}/>
      { (function match() {
        switch (status) {
          case 'showInfo':
            return <ShowInfo dispatch={dispatch} model = {model}/>;
          case 'editInfo':
            return <EditInfo setstatus={setstatus} dispatch ={dispatch} model = {model}/>;
          case 'citeInfo':
            return <CiteInfo setstatus={setstatus} cite={cite} />;
          default:
            return;
        }
      })(status)}
      {<Abstract abstract={model.abstract === '' ? '暂无摘要' : model.abstract} />}
    </div>
  );
}
