import SpinnerLoader from '../../common/Spinner/Spinner';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Paginator from '../../common/Paginator/Paginator';
import { useEffect } from 'react';
import { FilterType } from '../../redux/create-reducer';
import { UsersSearchForm } from './UsersSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'querystring';
import {
  getCountUsers,
  getCurrentPage,
  getFilter,
  getFindUser,
  getPreloader,
  getTotalCount,
} from '../../redux/create-selector';
import {
  getFollowUsers,
  getUnfollowUsers,
  // getUserFriend,
  getUsers,
} from '../../API/API-Users';
import { RootState } from '../../redux/store';
import s from './Users.module.css'
export const UsersUInterfece = () => {
  const userCount = useSelector(getCountUsers);
  const {findUsers} = useSelector((s: RootState) => s)

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search) as {
      term: string;
      page: string;
    };
    let actualFilter = findUsers.filter;
    let actualPage = findUsers.currentPage;

    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    dispatch(getUsers(userCount, actualPage, actualFilter.term as any));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsers, userCount, dispatch]);

  useEffect(() => {
    history.push({
      pathname: '/users',
      search: `?term=${findUsers.filter}&page=${findUsers.currentPage}`,
    });
  }, [findUsers]);

  const onCurrentPage = (pageNumber: number) => {
    dispatch(getUsers(userCount, pageNumber, findUsers.filter.term));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(userCount, 1, filter.term));
  };

  const follow = (userId: number) => {
    dispatch(getFollowUsers(userId));
    // dispatch(getUserFriend(userId))
  };

  const unfollow = (userId: number) => {
    dispatch(getUnfollowUsers(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      {findUsers.isPreloader === true ? <SpinnerLoader /> : null}
      <Paginator
        totalCount={findUsers.totalCount}
        userCount={userCount}
        onCurrentPage={onCurrentPage}
        currentPage={findUsers.currentPage}
      />

      <ul>
        {findUsers.findUsers.map(({ id, followed, photos, name }) => {
          return (
            <li   key={id}>
              <div className={s.userInfoWrapper}>
                <NavLink to={`/profile/${id}`}>
                  <span>
                    {photos.small === null ? (
                      <img
                        width="100px"
                        height="100px"
                        src="https://media.pn.am/media/issue/197/297/photo/197297.jpg"
                        alt=""
                      />
                    ) : (
                      <img src={photos.small} alt="" />
                    )}
                  </span>
              
                </NavLink>
                <div style={{marginLeft: "5px"}}>
                    <p>{name}</p>
                   {followed === false ? (
                  <Button
                    onClick={() => {
                      follow(id);
                    }}
                    variant="dark"
                  >
                    {' '}
                    FOLLOW
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    onClick={() => {
                      unfollow(id);
                    }}
                  >
                    UNFOLLOW
                  </Button>
                  )}
                 
                </div>
               
              </div>
        
            </li>
          );
        })}
      </ul>
    </div>
  );
};
