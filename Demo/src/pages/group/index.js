import { PureComponent } from 'react';
import { Radio, Button } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import CreatedGroupList from './component/own-group';
import SubGroupList from './component/sub-group';
import SearchGroupList from './component/search-group';
import SearchPanel from './component/search-panel';
import GroupForm from './component/group-form';
import store from './store';
import './index.less';

@pageWrapper({ store })
class Group extends PureComponent {

  onRadioChange = async e => {
    const { dispatch } = this.props;
    await dispatch('setType', e.target.value);
    dispatch('getListData');
  }

  onCreateGroup = async () => {
    const { dispatch } = this.props;
    dispatch('showGroupForm', 'create');
  }

  render() {
    const { dispatch, createdGroupList, createdGroupPageInfo, subGroupList, subGroupPageInfo, searchGroupList, searchGroupPageInfo, type, groupFormVisible, formData, formStatus, breadcrumbList } = this.props;

    return <PageContainer breadcrumb={breadcrumbList}>
      <div className="my-group-content">
        <div className="group-header">
          <Radio.Group defaultValue="search" value={type} onChange={this.onRadioChange}>
            <Radio.Button value="search">所有群组</Radio.Button>
            <Radio.Button value="sub">当前订阅</Radio.Button>
            <Radio.Button value="created">我创建的</Radio.Button>
          </Radio.Group>
          <Button type="primary" onClick={this.onCreateGroup}>创建群组</Button>
        </div>
        <div>{
          type === 'search' && <SearchPanel dispatch={ dispatch }/>
        }

        </div>
        <div>
          {type === 'search' && <SearchGroupList data={{ searchGroupList, searchGroupPageInfo }} dispatch={dispatch}/>}
          {type === 'created' && <CreatedGroupList data={{ createdGroupList, createdGroupPageInfo }} dispatch={dispatch}/>}
          {type === 'sub' && <SubGroupList data={{ subGroupList, subGroupPageInfo }} dispatch={dispatch}/>}
        </div>
        <div>
          <GroupForm
            visible={groupFormVisible}
            dispatch={ dispatch }
            formData={ formData }
            formStatus={ formStatus }
          />
        </div>
      </div>
    </PageContainer>;
  }
}

export default Group;
