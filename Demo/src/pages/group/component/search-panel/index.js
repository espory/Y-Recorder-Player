import React, { PureComponent } from 'react';
import { Collapse, Form, Input, Button } from 'antd';
const { Panel } = Collapse;
import './index.less';


export default class SearchPanel extends PureComponent {
  panelFormRef = React.createRef();

  onSearch = async () => {
    const { dispatch } = this.props;
    dispatch('getSearchData');
  }

  searchFormChange = async e => {
    const { dispatch } = this.props;
    dispatch('setSearchGroup', e.target.value);
  }

  onReset = () => {
    const { dispatch } = this.props;
    this.panelFormRef.current.resetFields();
    dispatch('setSearchGroup', '');
  };


  render() {
    return (
      <Collapse defaultActiveKey={[ '1' ]}>
        <Panel key="1">
          <Form ref={this.panelFormRef} name="panel-form" layout="inline">
            <Form.Item name="group-name" label="群组名:">
              <Input onChange={this.searchFormChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.onSearch} className="search-panel-button">
                搜索群组
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                重置
              </Button>
            </Form.Item>

          </Form>
        </Panel>
      </Collapse>
    );
  }
}
