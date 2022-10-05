// 由 https://html2js.esstudio.site/ 转译 ./ui.html 生成

interface EventType {
  startEvent: () => void
  stopEvent: () => void
}

export default function createUI({startEvent,stopEvent }: EventType) {
  let ele = document.createElement('div')
  ele.setAttribute('id','y-record')
  ele.innerHTML = `    <div style="position: fixed;z-index: 999999;bottom: 20px;right: 10px; width: 150px;">
  <div id="y-record-start"  style="display: flex;align-items: center;cursor: pointer;">
    <svg t="1662619630510" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2680" width="40" height="40"><path d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z" fill="#8C1815" p-id="2681"></path></svg>
    <span style="color: #8C1815;margin-left: 10px;user-select:none;"> 故障现场录制</span>
  </div>
  <div id="y-record-end" style="display: none;align-items: center;cursor: pointer;">
    <svg t="1662619679568" class="icon" viewBox="0 0 1040 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3751" width="40" height="40"><path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m208 716c0 2.2-1.8 4-4 4H308c-2.2 0-4-1.8-4-4V308c0-2.2 1.8-4 4-4h408c2.2 0 4 1.8 4 4v408z" p-id="3752" fill="#8C1815"></path></svg>
    <span style="color: #8C1815;margin-left: 10px;user-select:none;"> 结束录制</span>
 </div>
</div>     `
  document.body.appendChild(ele)
  // const btn = document.getElementById('y-record-send');
  // btn.addEventListener('click',()=>{
  //     alert('数据序列已上传至服务器');
  //     stopEvent()
  // })


  var tempStyle = document.createElement('style'); 
  tempStyle.type = 'text/css'; 
  tempStyle.innerHTML=`#y-record-end {
      animation: 1.5s linear infinite  fadeInOut;
    }

    @keyframes fadeInOut {
      0%   { opacity: 1; }
      50%  { opacity: 0.2; }
      100%  { opacity: 1; }
    }`; 
  document.getElementsByTagName('head').item(0).appendChild(tempStyle); 
  const btnStart = document.getElementById('y-record-start');
  const btnEnd = document.getElementById('y-record-end');

  btnStart.addEventListener('click',()=>{
      startEvent()
      btnStart.style.display = 'none';
      btnEnd.style.display = 'flex';
  })

  btnEnd.addEventListener('click',()=>{
    btnStart.style.display = 'flex';
    btnEnd.style.display = 'none';
    stopEvent()
    setTimeout(()=>{
      alert('数据序列已上传至服务器');
    },100)
    
  })
}
