import { PureComponent } from 'react';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import ShowInfo from './component/show-info';
import UpdateInfo from './component/update-info';
import CustomAvatar from './component/custom-avatar';
import UpdatePwd from './component/update-pwd';
import store from './store';

@pageWrapper({ store })
class MyInfo extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const mode = this.props.match.path.substr(1);
    // url 判断 mode
    dispatch('setData', { mode });
    dispatch('setBreadcrumbList', mode);
  }

  render() {
    const { dispatch, breadcrumbList, mode, avatarPopoverVisible, systemAvatars, myInfo, avatarSelected, avatarPreview, customAvatarName } = this.props;
    return (
      <PageContainer breadcrumb={breadcrumbList}>
        { mode === 'showInfo' && <ShowInfo data={{ avatarPopoverVisible, systemAvatars, myInfo }} dispatch={ dispatch } /> }
        { mode === 'updateInfo' && <UpdateInfo myInfo={ myInfo } dispatch={ dispatch } /> }
        { mode === 'customAvatar' && <CustomAvatar data={{ avatarSelected, avatarPreview, customAvatarName, myInfo }} dispatch={ dispatch } />}
        { mode === 'updatePwd' && <UpdatePwd dispatch={ dispatch } /> }
      </PageContainer>
    );
  }
}

export default MyInfo;
