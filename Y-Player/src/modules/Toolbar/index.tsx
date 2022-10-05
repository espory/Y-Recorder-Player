import React, { useState, useEffect, useReducer } from "react";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import BEMProvider from "tools/bem-classname";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
const bem = BEMProvider("toolbar");
// 第二个参数：state的reducer处理函数
function reducer(state, action) {
  switch (action.type) {
    case "click":
      return { ...state,click: action.value };
    case "move":
      return {...state, move: action.value };
    case "drag":
      return { ...state,drag: action.value };
    case "keyboard":
      return {...state, keyboard: action.value };
    case "data":
      return {...state, data: action.value };
    case "error":
      return { ...state,error: action.value };
    default:
      throw new Error();
  }
}

const types = ['click','drag','keyboard','data','error'];
const labels = ['鼠标操作','拖拽事件','键盘事件','数据录入','程序错误'];
const initialState = types.reduce((pre,cur)=>{
pre[cur] = true;
return pre;
},{})

export default function Toolbar() {
  const [debug, setdebug] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (debug) {
      (document.getElementById(
        "domLayer"
      ) as any).contentWindow.YPLAYER_DEBUG = true;
    } else {
      (document.getElementById(
        "domLayer"
      ) as any).contentWindow.YPLAYER_DEBUG = false;
    }
  }, [debug]);
  useEffect(()=>{
    (document.getElementById(
      "domLayer"
    ) as any).contentWindow.YPLAYER_DEBUG_TAGS = state;
    console.log(state)
  },[state])

  return (
    <div {...bem()}>
      {!debug&&<h1 {...bem('::heading')} >Y-Player</h1>}
      {debug&&<div style={{ display: "flex" }}>
        <h1 style={{marginTop:'17px'}}>断点调试行为：</h1>
        {types.map((type,index)=>{
        return <FormControlLabel
        key={type}
        onChange={(e) => {
          // wd.YPLAYER_DEBUG_TAGS[type] = e.target["checked"];
          dispatch({type,value:e.target["checked"]})
        }}
        style={{ color: "white" }}
        control={<Checkbox checked={state[type]} name={type}/>}
        label={<span style={{ color: "white" }}>{labels[index]}</span>}
      />
        })}
      </div>}
      <div {...bem("::actions lr-center")}>
        <Tooltip title="启动调试模式">
          <Button
            small={true}
            icon="build"
            onClick={() => {
              console.log(debug);
              setdebug(!debug);
            }}
            style={
              debug
                ? {
                    backgroundColor: "red",
                  }
                : {}
            }
          />
        </Tooltip>
        <Tooltip title="用户信息">
          <Button small={true} disabled={true} icon="person" />
        </Tooltip>
        <Tooltip title="播放器设置">
          <Button small={true} disabled={true} icon="settings" />
        </Tooltip>
      </div>
    </div>
  );
}
