import { PureComponent } from 'react';
import { Button, Popconfirm } from 'antd';
import { FilePdfOutlined, CloseCircleOutlined } from '@ant-design/icons';

class FileButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false,
      mouseEnterButton: false,
    };
  }

  render() {
    const { buttonDisabled, mouseEnterButton } = this.state;
    const { downloadFile, clearFileUrl, fileUrl, fileId, icon = <FilePdfOutlined />, tagName = 'PDF', type = 'primary', mentionInfo = '是否移除此文献？' } = this.props;
    return <Button
      type={type}
      disabled = {buttonDisabled}
      style={{ paddingRight: 5, width: '100px', textAlign: 'left' }}
      onMouseEnter={() => { this.setState({ mouseEnterButton: true }); }}
      onMouseLeave={() => { this.setState({ mouseEnterButton: false }); }}
      onClick={async () => {
        if (fileUrl.length) {
          this.setState({ buttonDisabled: true });
          downloadFile(fileUrl);
          this.setState({ buttonDisabled: false });
        }
      }}
      icon={icon} >
      <> {tagName}
        <Popconfirm
          title = {mentionInfo}
          onConfirm={e => {
            e.stopPropagation();
            clearFileUrl(fileId, fileUrl);
          }}
          onCancel={e => {
            e.stopPropagation();
          }}
          okText="是"
          cancelText="否">
          <CloseCircleOutlined
            className={mouseEnterButton ? 'white-icon' : 'primary-color-icon'}
            onClick={e => {
              e.stopPropagation();
            }}/>
        </Popconfirm>
      </>
    </Button>;
  }
}

export default FileButton;
