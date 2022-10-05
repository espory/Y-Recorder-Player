import Error404 from '../pages/404';
import Group from '../pages/group';
import Topic from '../pages/topic';
// import Library from '../pages/library';
import Library from '../pages/lib';
// import Permission from '../pages/permission/main';
// import PermissionDetail from '../pages/permission/detail';
// import ApplyPermission from '../pages/permission/apply';
import MyInfo from '../pages/my-info';
// import HomepageSetting from '../pages/homepageSetting';
import AfterUpload from '../pages/afterUpload';

export default {
  group: {
    route: '/group',
    entry: Group,
    exact: true,
  },
  topic: {
    route: '/topic',
    entry: Topic,
    exact: true,
  },
  topicLibrary: {
    route: '/topic/library',
    entry: Library,
  },
  library: {
    route: '/library',
    entry: Library,
  },
  libraryHub: {
    route: '/libraryHub',
    entry: Library,
  },
  // permisson: {
  //   route: '/permission',
  //   entry: Permission,
  //   exact: true,
  // },
  // permissonDetail: {
  //   route: '/permission/detail',
  //   entry: PermissionDetail,
  // },
  // permmisonApply: {
  //   route: '/permission/apply',
  //   entry: ApplyPermission,
  // },
  myInfo: {
    route: '/showInfo',
    entry: MyInfo,
  },
  updateInfo: {
    route: '/updateInfo',
    entry: MyInfo,
  },
  customAvatar: {
    route: '/customAvatar',
    entry: MyInfo,
  },
  updatePwd: {
    route: '/updatePwd',
    entry: MyInfo,
  },
  // homepageSetting: {
  //   route: '/homepageSetting',
  //   entry: HomepageSetting,
  // },
  404: {
    route: '/404',
    entry: Error404,
  },
  afterUpload: {
    route: '/afterUpload',
    entry: AfterUpload,
  },
};
