/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { Messages } from './components/Messages/Messages';

import { useDispatch, useSelector } from 'react-redux';

import { initializedApp } from './API/API';

import SpinnerLoader from './common/Spinner/Spinner';

import { Button } from 'antd/lib/radio';

import { setInitialized } from './redux/create-selector';

const Profile = lazy(() => import('./components/Profile/Profile'));
const Chat = lazy(() => import('./page/Chat/ChatPage'));
const HeaderTop = lazy(() => import('./components/Header/Header'));
const Users = lazy(() => import('./components/Users/Users'));

const Login = lazy(() => import('./components/Login/Login.jsx'));
const Friends = lazy(() => import('./components/Friends/Friends'));
const Music = lazy(() => import('./components/Music/AllMusic'));
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

export const App = () => {
  const initialized = useSelector(setInitialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializedApp());
  }, [dispatch]);

  if (!initialized) {
    return <SpinnerLoader />;
  }
  //tyjtjtyj
  return (
    <BrowserRouter>
      <Suspense fallback={'Loading...'}>
        <Layout>
          <HeaderTop />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <NavLink to="/profile">Home</NavLink>{' '}
              </Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              className="site-layout-background"
              style={{ padding: '24px 0' }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu
                    key="sub1"
                    icon={<UserOutlined />}
                    title="My Profile"
                  >
                    <Menu.Item key="1">
                      <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <NavLink to="/messages">Messages</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3"></Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub4" icon={<UserOutlined />} title="Music">
                    <Menu.Item key="4">
                      <NavLink to="/music">Music</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                    <Menu.Item key="7">
                      <NavLink to="/users">Users</NavLink>
                    </Menu.Item>
                    <Menu.Item key="8">
                      {' '}
                      <NavLink to="/friends">Friends</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={<NotificationOutlined />}
                    title="Dev Chat"
                  >
                    <Menu.Item key="9">
                      {' '}
                      <NavLink to="/chat">Chat</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {' '}
                {/* <ErrorBoundary> */}
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/profile" />}
                  />
                  <Route path="/profile/:userId?" render={() => <Profile />} />
                  <Route path="/friends" render={() => <Friends />} />
                  <Route path="/messages" render={() => <Messages />} />
                  <Route path="/users" render={() => <Users />} />
                  <Route path="/login" render={() => <Login />} />
                  <Route path="/chat" render={() => <Chat />} />
                  <Route path="/music" render={() => <Music />} />
                  <Route
                    path="*"
                    render={() => (
                      <div>
                        404 Not Found <Button type="primary">Button</Button>
                      </div>
                    )}
                  />
                </Switch>
                {/* </ErrorBoundary> */}
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            @2023 Social application
          </Footer>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};
