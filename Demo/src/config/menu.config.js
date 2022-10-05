import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';

export const menuConfig = [
  {
    name: '主题管理',
    icon: UsergroupAddOutlined,
    children: [
      {
        name: '我的主题',
        link: '/topic',
      },
    ],
  },
  // {
  //   name: '权限管理',
  //   icon: BankOutlined,
  //   children: [
  //     {
  //       name: '我的权限',
  //       link: '/permission',
  //     },
  //     {
  //       name: '申请权限',
  //       link: '/permission/apply',
  //     },
  //   ],
  // },
  // {
  //   name: '个人主页管理',
  //   icon: HomeOutlined,
  //   link: '/homepageSetting',
  // },
  {
    name: '个人信息管理',
    icon: UserOutlined,
    children: [
      {
        name: '我的信息',
        link: '/showInfo',
      },
      {
        name: '修改个人信息',
        link: '/updateInfo',
      },
      {
        name: '自定义头像',
        link: '/customAvatar',
      },
      {
        name: '修改密码',
        link: '/updatePwd',
      },
    ],
  },
];
export default menuConfig;
