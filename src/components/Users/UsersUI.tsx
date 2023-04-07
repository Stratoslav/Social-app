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
  getUsers,
} from '../../API/API-Users';

export const UsersUInterfece = () => {
  const currentPage = useSelector(getCurrentPage);
  const totalCount = useSelector(getTotalCount);
  const userCount = useSelector(getCountUsers);
  const isPreloader = useSelector(getPreloader);
  const findUsers = useSelector(getFindUser);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search) as {
      term: string;
      page: string;
    };
    let actualFilter = filter;
    let actualPage = currentPage;

    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    dispatch(getUsers(userCount, actualPage, actualFilter.term as any));
  }, [getUsers, userCount]);

  useEffect(() => {
    history.push({
      pathname: '/users',
      search: `?term=${filter}&page=${currentPage}`,
    });
  }, [currentPage, filter]);

  const onCurrentPage = (pageNumber: number) => {
    dispatch(getUsers(userCount, pageNumber, filter.term));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(userCount, 1, filter.term));
  };

  const follow = (userId: number) => {
    dispatch(getFollowUsers(userId));
  };

  const unfollow = (userId: number) => {
    dispatch(getUnfollowUsers(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      {isPreloader === true ? <SpinnerLoader /> : null}
      <Paginator
        totalCount={totalCount}
        userCount={userCount}
        onCurrentPage={onCurrentPage}
        currentPage={currentPage}
      />

      <ul>
        {findUsers.map(({ id, followed, photos, name }) => {
          return (
            <li key={id}>
              <div>
                <NavLink to={`/profile/${id}`}>
                  <span>
                    {photos.small === null ? (
                      <img
                        width="30px"
                        height="30px"
                        src="https://media.pn.am/media/issue/197/297/photo/197297.jpg"
                        alt=""
                      />
                    ) : (
                      <img src={photos.small} alt="" />
                    )}
                  </span>
                </NavLink>
                {followed === false ? (
                  <Button
                    onClick={() => {
                      follow(id);
                    }}
                    variant="success"
                  >
                    {' '}
                    FOLLOW
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      unfollow(id);
                    }}
                  >
                    UNFOLLOW
                  </Button>
                )}
              </div>
              <div>
                <p>{name}</p>
                <div>
                  <span>{'location.city'}</span>
                  <span>{'location.country'}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
