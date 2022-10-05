import { Switch } from 'antd';

export const switchButton = (value, dispatch, fncName) => {
  return <Switch checked={value} onChange={v => { console.log(v); dispatch(fncName, v); } }/>;
};
