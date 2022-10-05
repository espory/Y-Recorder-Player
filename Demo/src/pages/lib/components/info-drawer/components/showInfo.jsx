import TagsEditor from './tagsEditor';
import FileButton from './fileButton';
import { fileIcon } from '../../../utils';
import { Rate } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { useState, useEffect } from 'react';

export default function showInfo(props) {
  const { model = {}, dispatch } = props;
  const { id, fileUrl, url, tags = [], mark, file_attachments = [] } = model;
  const { getFormattedAuthors, getShortInfo, joinFnc } = model;
  const attachments = file_attachments.filter(attachment => (attachment.attachment_url));
  const attachmentUrls = attachments.map(attachment => {
    return attachment.attachment_url;
  });
  const haveFile = fileUrl === undefined ? false : fileUrl !== '';
  const [ tagsState, setTagsState ] = useState([]);
  const [ markState, setMarkState ] = useState([]);
  let citations;
  if (typeof getShortInfo === 'function') {
    citations = getShortInfo.call(model, joinFnc);
  }
  let shortInfo;
  if (typeof getFormattedAuthors === 'function') {
    shortInfo = getFormattedAuthors.call(model);
    console.log(shortInfo);
  }

  const handleSetTags = tags => {
    const { id, extra } = model;
    tags.sort();
    const submit = { fileId: id, tags,
      // mark,
      extra: { ...extra } };
    dispatch('updateDocument', submit);
    message.success('修改成功');
    console.log(tags);
    setTagsState(tags);
  };
  const handleSetMark = mark => {
    const { id, extra } = model;
    const submit = { fileId: id, mark, extra: { ...extra } };
    dispatch('updateDocument', submit);
    message.success('修改成功');
    setMarkState(mark);
  };

  const tagsRender = <TagsEditor tags={tagsState} setTags={handleSetTags}/>;

  // const noTags = <span style={{ color: 'gray' }}>暂无</span>;


  useEffect(() => {
    setTagsState(tags);
    setMarkState(mark);
  }, [ model ]);
  return (
    <div>
      <div className="file-frame" style={{ paddingTop: '15px' }}>
        {/* 有文件时 */}
        {haveFile && <FileButton
          fileUrl={fileUrl} fileId = {id}
          downloadFile={ fileUrl => {
            dispatch('downloadFile', { url: fileUrl });
          }}
          clearFileUrl={ fileId => {
            dispatch('clearFileUrl', { fileId });
          }}
        />}
        {/* 无文件时 */}
        {!haveFile && <Upload
          onClick ={e => {
            e.stopPropagation();
          }}
          accept ='.pdf'
          beforeUpload ={file => {
            dispatch('updateFileUrl', { file, fileId: id });
            return false;
          }}>
          <Button icon={<UploadOutlined />}
          >选择文献</Button>
        </Upload>}
      </div>
      {/* <div className="info-authors">
        { shortInfo}
      </div> */}
      <div className="info-containerTitle"
        style={{ display: citations === '' ? 'none' : '' }}
      >
        {citations}
      </div>
      <div className="info-url" style={{ display: (!url) ? 'none' : '' }}>
          URL: {<a href={url}>{url}</a>}
      </div>
      <div className="info-tags" >
        <span>标签:</span>{tagsRender}
      </div>
      <div className="info-mark"><span>评分:</span>
        <Rate value={markState} onChange={handleSetMark} />
      </div>
      {attachmentUrls.length === 0 ? '' : <div className="info-attachment"><span>附件:</span>
        {attachmentUrls.map(attachment_url => {
          return <div className="attachment-item"><FileButton
            fileUrl={ attachment_url } fileId = {id}
            downloadFile={ fileUrl => {
              if (fileUrl.split('.').pop() === 'pdf') {
                dispatch('downloadFile', { url: fileUrl });
              } else {
                dispatch('downloadAttachmentFile', { attachment_url: fileUrl });
              }
            }}
            clearFileUrl={ (fileId, fileUrl) => {
              dispatch('clearAttachmentFile', { file_id: fileId, attachment_url: fileUrl });
            }}
            icon={fileIcon(attachment_url, '', 'simple')}
            tagName={attachment_url.split('.').pop().toUpperCase()}
            mentionInfo={'是否移除此附件？'}
          /><div className="attachment-url">{attachment_url.split('/').pop()}</div>
          </div>;
        }
        )}
      </div>}
    </div>
  );
}
