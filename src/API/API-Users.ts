import { PhotosType, UsersType } from '../redux/create-reducer';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actions } from '../redux/create-actions';
import { AppStateReducer } from '../redux/store';
import { instance } from './API';

type ThunkType = ThunkAction<void, AppStateReducer, unknown, Action<any>>;

type getUsersType = {
  items: Array<UsersType>;
  photos: PhotosType;
  followed: boolean;
  totalCount: any;
};
export type DefaultType = {
  resultCode: number;
  messages: Array<string>;
  data: object;
};

export const getUsers =
  (userCount = 10, currentPage = 1, term: string = ''): ThunkType =>
  async dispatch => {
    dispatch(actions.SET_PRELOADER(true));

    let response = await instance.get<getUsersType>(
      `users?count=${userCount}&page=${currentPage}&term=${term}`,
    );

    dispatch(actions.SET_PRELOADER(false));
    dispatch(actions.SET_CURRENT_PAGE(currentPage));
    dispatch(actions.SET_FILTER(term));
    dispatch(actions.SET_TOTAL_COUNT(response.data.totalCount));
    dispatch(actions.SET_USERS(response.data.items));
  };

export const getFollowUsers =
  (id: number): ThunkType =>
  async dispatch => {
    let response = await instance.post<DefaultType>(
      `follow/${id}`,
    );
    if (response.data.resultCode === 0) {
      dispatch(actions.SET_PRELOADER(true));
      dispatch(actions.FOLLOW_UNFOLLOW(id));
      setTimeout(() => {
        dispatch(actions.SET_PRELOADER(false));
      }, 1000);
    }
  };

export const getUnfollowUsers =
  (id: number): ThunkType =>
  async dispatch => {
    let response = await instance.delete<DefaultType>(
      `follow/${id}`,
    );
    if (response.data.resultCode === 0) {
      dispatch(actions.FOLLOW_UNFOLLOW(id));
    }
  };
