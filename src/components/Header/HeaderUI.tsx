import style from '../Header/Header.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getLogin } from '../../redux/create-selector';
import { logout } from '../../API/API';
import { Layout, Menu } from 'antd';
import { Button } from 'antd/lib/radio';
const { Header } = Layout;

const HeaderUI = () => {
  const login = useSelector(getLogin);
  const isAuth = useSelector(getIsAuth);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        <Header style={{ height: 'auto' }} className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            {isAuth ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <NavLink to="/profile" className={style.headerLink}>
                    <span className={style.HeaderName}>{login}</span>{' '}
                  </NavLink>
                </span>

                <Button onClick={() => logOut()}>
                  <NavLink className={style.headerLink} to="/login">
                    LogOut
                  </NavLink>
                </Button>
              </div>
            ) : (
              <Button>
                <NavLink to="/login">LogIn</NavLink>
              </Button>
            )}
          </Menu>
        </Header>
      </div>
    </>
  );
};

export default HeaderUI;
