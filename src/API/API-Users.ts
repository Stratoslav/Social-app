import { PhotosType, UsersType } from '../redux/create-reducer';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateReducer } from '../redux/store';
import { instance } from './API';
import { findUserAction } from '../redux/slice/findUserSlice';

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
    dispatch(findUserAction.setPreloader(true));

    let response = await instance.get<getUsersType>(
      `users?count=${userCount}&page=${currentPage}&term=${term}`,
    );
    let res = await instance.get<getUsersType>(
        `users?count=${userCount}&page=${currentPage}&term=${term}&friend=${true}`,
    )
    console.log(res.data.totalCount)
    
    dispatch(findUserAction.setPreloader(false));
    dispatch(findUserAction.getFriends(res.data.items))
    dispatch(findUserAction.setCurrentPage(currentPage));
    dispatch(findUserAction.setFilter(term));
    dispatch(findUserAction.setTotalCount(response.data.totalCount));
      dispatch(findUserAction.setFriendsTotalCount(res.data.totalCount));

    dispatch(findUserAction.setUsers(response.data.items));
  };

export const getFollowUsers =
  (id: number): ThunkType =>
  async dispatch => {
    let response = await instance.post<DefaultType>(
      `follow/${id}`,
    );
    if (response.data.resultCode === 0) {
      dispatch(findUserAction.setPreloader(true));
      dispatch(findUserAction.followUnfollow(id));
      // dispatch(findUserAction.setUsers)
      // dispatch(findUserAction.addFriendUser(id))
      setTimeout(() => {
        dispatch(findUserAction.setPreloader(false));
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
      dispatch(findUserAction.followUnfollow(id));
         
    }
  };

// export const getUserFriend =
//   (userId: number): ThunkType =>
//   async dispatch => {
//     let response = await instance.get<DefaultType>(

//       `follow/${userId}`,
//     );
//     if (userId) {
//       console.log(response)
//       dispatch(findUserAction.getFriends(userId));
         
//     }
//     };
  
