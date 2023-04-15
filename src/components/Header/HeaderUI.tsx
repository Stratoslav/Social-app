import style from '../Header/Header.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getLogin, } from '../../redux/create-selector';
import { logout } from '../../API/API';
import { Layout, Menu } from 'antd';
import { Button } from 'antd/lib/radio';
import { useAppDispatch } from '../../redux/hooks';
const { Header } = Layout;

const HeaderUI = () => {
  const login = useSelector(getLogin);
  let isAuth = useSelector(getIsAuth);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logout());
    isAuth = false
  };

  return (
    <>
      <div>
        <Header style={{ height: 'auto' }} className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <div className={style.headerWrapper}>
              
          
            {isAuth ? (
              <div
            className={style.headerInfo}
              >
                <span>
                  <NavLink to="/profile" className={style.headerLink}>
                    <span className={style.HeaderName}>{login}</span>{' '}
                  </NavLink>
                </span>

                <span className={style.logOut}  onClick={() => logOut()}>
                  <a target="_blank" style={{color: "white"}} className={style.headerLink} href="https://social-network.samuraijs.com/Auth/Auth/LogOut" rel="noreferrer">
                   <span>log out</span>
                  </a>
                </span>
              </div>
            ) : (
              <Button className={style.logIn}>
                <NavLink to="/login">LogIn</NavLink>
              </Button>
              )}
               </div>
          </Menu>
        </Header>
      </div>
    </>
  );
};

export default HeaderUI;
