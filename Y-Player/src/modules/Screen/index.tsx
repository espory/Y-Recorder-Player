import Player from 'player';
import React, {   useEffect } from 'react';
import { _log, _warn } from 'tools/log';
import BEMProvider from 'tools/bem-classname';
import Icon from 'components/Icon';
import { useStoreState, useStore } from 'stores';
import { usePlayerStatus } from 'player/hooks';
// import { mockHover } from 'initEnv';
import { recordNodeId } from 'initEnv/recordNode';

const bem = BEMProvider('screen');


export default function Screen() {
  let screen: HTMLDivElement;
  let canvas: HTMLElement;
  let mouseLayer: HTMLElement;
  let domLayer: HTMLIFrameElement;

  const { jumping } = usePlayerStatus();

  useEffect(
    () => {
      Player.init({
        mouseLayer,
        domLayer,
        canvas,
        screen
      }).catch(_warn);
    },
    [null]
  );

  const {error, loaded, fullScreen } = useStore();

  return (
    <div
      {...bem({ blur: jumping, full: fullScreen })}
      ref={ele => (screen = ele!)}
    >
      <div {...bem('::spinner', { hidden: loaded || error })} />

      <div {...bem('::error', { visible: error })}>
        <Icon name="error" />
      </div>

      <section ref={ele => (canvas = ele!)} {...bem('::canvas')}>
        {/* replay DOM mutation */}
        <iframe
          ref={ele => (domLayer = ele!)}
          src={'/'}
          {...bem('fill')}
          id="domLayer"
          sandbox="allow-forms allow-same-origin allow-scripts"
          // src="about:blank"
          // frameBorder="0"
          onLoad={(e)=>{
            // setTimeout(()=>{
            //   // Player.play()
            // },2000)
            console.log(e);
            // (document as any).getElementById('domLayer').style.backgroundColor = "red";
            // const iframe = e.target as HTMLIFrameElement;
            // const {contentDocument} = iframe;
            // recordNodeId(contentDocument)
              //填充 hover css
              // if(iframe.contentDocument){
              //   mockHover(iframe.contentDocument)
              // }else{
              //   console.error('mockHover error no Painter.domLayer.contentDocument')
              // }

          }}
        />

        {/* replay mouse move & click */}
        <div {...bem('fill')} id="mouseLayer" ref={ele => (mouseLayer = ele!)}>
          <div id="mouse" {...bem('::mouse', { visible: loaded && !error })} />
        </div>
      </section>

      <div {...bem('::session-info')} />
    </div>
  );
}
