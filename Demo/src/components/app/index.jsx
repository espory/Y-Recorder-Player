import HeadMenu from '../headMenu';
import { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteParse from 'route-parser';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import routeConf from '../../config/route.config';
import { menuConfig } from '../../config/menu.config';
import Notification from '../notification';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '',
      subMenuKey: [],
    };
  }

  setActiveKey = (key, subMenuKey) => {
    console.log(key === this.state.activeKey);
    this.setState({
      activeKey: key,
      subMenuKey: subMenuKey || this.state.subMenuKey,
    });
  };

  onSubMenuClick = e => {
    const { key } = e;
    const { subMenuKey } = this.state;
    const idx = subMenuKey.indexOf(key);
    if (idx !== -1) {
      subMenuKey.splice(idx, 1);
    } else {
      subMenuKey.push(key);
    }
    this.setActiveKey(key, subMenuKey);
  }

  onMenuItemClick = (e, parentKey) => {
    const { subMenuKey } = this.state;
    if (parentKey && subMenuKey.indexOf(parentKey) === -1) {
      subMenuKey.push(parentKey);
      this.setActiveKey(e.key, subMenuKey);
    } else {
      this.setActiveKey(e.key);
    }
  }

  createMenu = config => {
    return config.map(item => {
      const { name, icon: IconComponent, iconSize, children, link } = item;
      if (!children || children.length === 0) {
        return <MenuItem key={link} icon={<IconComponent style={{ fontSize: iconSize }}/>}><Link to={link ? link : '#'}>{name}</Link></MenuItem>;
      }
      return (<SubMenu key={name} onTitleClick={this.onSubMenuClick} icon={<IconComponent style={{ fontSize: iconSize }}/>} title={name}>
        {children.map(child => <MenuItem key={child.link}><Link to={child.link ? child.link : '#'}>{child.name}</Link></MenuItem>)}
      </SubMenu>);
    });
  }

  getSelectedKey = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;
    let selectedKey = null;
    let openKey = null;
    menuConfig.forEach(item => {
      const { children, link, name } = item;
      if (children && children.length > 0) {
        children.forEach(child => {
          if (!child.link) {
            return;
          }
          const route = new RouteParse(child.link);
          if (route.match(pathname)) {
            selectedKey = child.link;
            openKey = name;
          }
        });
      } else {
        const route = new RouteParse(link);
        if (route.match(pathname)) {
          selectedKey = link;
          openKey = name;
        }
      }
    });
    return {
      selectedKey,
      openKey,
    };
  }

  render() {
    const { history } = this.props;
    const { selectedKey, openKey } = this.getSelectedKey();
    return (<Layout className="page-container">
      <Header className="header-container">
        <img className="header-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="" />
        {/* <img className="header-logo" alt="" src="https://s1.ax1x.com/2020/07/13/UGYeVU.png" /> */}
        <HeadMenu routeHistory = {history} setActiveKey={this.onMenuItemClick}></HeadMenu>
      </Header>
      <Layout>
        <Sider width={200} collapsible={true} theme='light'>
          <Menu
            onClick = {this.onMenuItemClick}
            mode="inline"
            theme="light"
            defaultSelectedKeys={[ selectedKey ]}
            defaultOpenKeys={[ openKey ]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {this.createMenu(menuConfig)}
          </Menu>
        </Sider>
        <Layout>
          <Notification></Notification>
          <Content className="content-container">
            <Switch>
              <Route path="/" key={0} component={routeConf.topic.entry} exact />
              { Object.keys(routeConf).map((key, index) => {
                const { route, entry, exact = false } = routeConf[key];
                return <Route path={route} key={index} component={entry} exact={exact} />;
              })}
              <Route exact path="/login" key={100} render={() => (
                window.location.href = '/login.html'
              )}/>
              <Route exact path="/register" key={101} render={() => (
                window.location.href = '/register.html'
              )}/>
              <Redirect to="/404" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {/* Copyright © 2020 Fudan Sonic Lab. All Rights Reserved */}
          </Footer>
        </Layout>
      </Layout>
    </Layout>);
  }
}

export default connect(
  createStructuredSelector({

  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(App);
