/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  UserAddOutlined,
  NotificationOutlined,
  FileOutlined,
  MailOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
import { Messages } from './components/Messages/Messages';
import { Friends } from './components/Friends/Friends';
import { useDispatch, useSelector } from 'react-redux';

import { initializedApp } from './API/API';

import SpinnerLoader from './common/Spinner/Spinner';

import { Button } from 'antd/lib/radio';
import Login from './components/Login/Login';
import { setInitialized } from './redux/create-selector';
import News from './components/News/News';

const Profile = lazy(() => import('./components/Profile/Profile'));
const Chat = lazy(() => import('./page/Chat/ChatPage'));
const HeaderTop = lazy(() => import('./components/Header/Header'));
const Users = lazy(() => import('./components/Users/Users'));

const { Content, Footer, Sider } = Layout;

export const App = () => {
  const initialized = useSelector(setInitialized);

  const dispatch = useDispatch();
  const { userId } = useSelector(s => s.auth);
  console.log(userId);
  useEffect(() => {
    dispatch(initializedApp());
  }, [dispatch]);

  if (!initialized) {
    return <SpinnerLoader />;
  }

  return (
    <BrowserRouter>
      {userId !== null ? (
        <Suspense fallback={'Loading...'}>
          <Layout style={{ minHeight: '100vh' }}>
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
                // style={{ minHeight: '100wh' }}
                className="site-layout-background"
                style={{ padding: '24px 0', minHeight: 'vh' }}
              >
                <Sider className="site-layout-background" width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                  >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                      <NavLink to="/profile">Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<MailOutlined />}>
                      <NavLink to="/messages">Messages</NavLink>
                    </Menu.Item>

                    <Menu.Item key="4" icon={<FileOutlined />}>
                      <NavLink to="/news">News</NavLink>
                    </Menu.Item>

                    <Menu.Item key="7" icon={<UserAddOutlined />}>
                      <NavLink to="/users">Users</NavLink>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<TeamOutlined />}>
                      {' '}
                      <NavLink to="/friends">Friends</NavLink>
                    </Menu.Item>

                    <Menu.Item key="9" icon={<NotificationOutlined />}>
                      {' '}
                      <NavLink to="/chat">Chat</NavLink>
                    </Menu.Item>
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

                    <Route
                      path="/profile/:userId?"
                      render={() => <Profile />}
                    />
                    <Route path="/friends" render={() => <Friends />} />
                    <Route path="/messages" render={() => <Messages />} />
                    <Route path="/users" render={() => <Users />} />
                    {/* <Route path="/login" render={() => <Login />} /> */}
                    <Route path="/chat" render={() => <Chat />} />
                    <Route path="/news" render={() => <News />} />
                    <Route path="*" render={() => <Profile />} />
                  </Switch>
                  {/* </ErrorBoundary> */}
                </Content>
              </Layout>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
              @2023 Social application
            </Footer> */}
          </Layout>
        </Suspense>
      ) : (
        <Switch>
          <Route path="/login" render={() => <Login />} />

          <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
      )}
    </BrowserRouter>
  );
};
