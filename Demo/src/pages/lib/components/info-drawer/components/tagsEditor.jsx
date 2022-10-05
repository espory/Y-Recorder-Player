import { PureComponent } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { tagsColors } from '../../../utils';

export default class TagsEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
    };
  }

  handleClose = removedTag => {
    const { tags = [], setTags } = this.props;
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // 新增tag
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const { tags = [], setTags } = this.props;
    const newTags = [ ...tags ];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags.push(inputValue);
    }
    setTags(newTags);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  // 双击后对某一个tag的更改
  handleEditInputConfirm = () => {
    const { editInputIndex, editInputValue } = this.state;
    const { tags = [], setTags } = this.props;
    const newTags = [ ...tags ];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    this.setState({
      editInputIndex: -1,
      editInputValue: '',
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  render() {
    const { inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    const { tags = [] } = this.props;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={true}
              color={tagsColors[index % tagsColors.length]}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                      this.editInput.focus();
                    });
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  }
}
