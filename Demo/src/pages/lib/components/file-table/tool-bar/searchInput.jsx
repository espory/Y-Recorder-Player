import { PureComponent, createRef } from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
import { selectOptions, colValues } from '../../../utils';

export default class SearchInput extends PureComponent {
  inputRef = createRef();
  onSearch = () => {
    const { dispatch, deleted } = this.props;
    dispatch('onSearchFilterChange', { value: this.inputRef.current.state.value, deleted });
  }
  render() {
    const { dispatch, deleted, tableColIdx = [] } = this.props;
    // 只对在tableColIdx中显示出来的列进行搜索
    const showColKeys = tableColIdx.map(item => colValues[item].key);
    console.log(showColKeys);
    const showSelectOptions = [];
    selectOptions.forEach(item => {
      if (showColKeys.indexOf(item.value) !== -1) showSelectOptions.push(item);
    });
    console.log(showSelectOptions);
    return (
      <div className='search-input-container'>
        <Input
          ref = {this.inputRef}
          addonBefore={
            <Select
              onChange= {value => {
                dispatch('onSearchFilterChange', { field: value, deleted });
              }}
              defaultValue={showSelectOptions[0].value}>
              {showSelectOptions.map((options, idx) => {
                return (<Option key={idx} value={options.value}>{options.label}</Option>);
              })}
            </Select>}
          suffix={
            <Button
              size='small'
              style={{ border: 0 }}
              icon={<SearchOutlined/>}
              onClick={ this.onSearch}/>}
          allowClear
          placeholder='搜索'
          onPressEnter={this.onSearch}>
        </Input>
      </div>
    );
  }
}
