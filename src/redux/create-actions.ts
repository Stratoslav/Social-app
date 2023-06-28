import { ChatMessageType } from './../page/Chat/ChatPage';
// import { createAction } from '@reduxjs/toolkit';
import {  ProfileType, StatusType } from './create-reducer';

export const actions = {
  ADD_POST: (text: string) =>
    ({
      type: 'ADD-POST',
      payload: text,
    } as const),
  ADD_NEW_MESSAGE: (text: string) =>
    ({
      type: 'ADD-NEW-MESSAGE',
      payload: text,
    } as const),

  FOLLOW_UNFOLLOW: (userId: number) =>
    ({
      type: 'FOLLOW-UNFOLLOW',
      payload: userId,
    } as const),

  SET_USERS: (users: any) =>
    ({
      type: 'SET-USERS',
      payload: users,
    } as const),

  SET_CURRENT_PAGE: (currentPage: number) =>
    ({
      type: 'SET-CURRENT-PAGE',
      payload: currentPage,
    } as const),

  SET_TOTAL_COUNT: (totalCount: number) =>
    ({
      type: 'SET-TOTAL-COUNT',
      payload: totalCount,
    } as const),

  SET_PRELOADER: (isFetching: boolean) =>
    ({
      type: 'SET-PRELOADER',
      payload: isFetching,
    } as const),

  SET_USER_PROFILE: (userProfile: ProfileType) =>
    ({
      type: 'SET-USER-PROFILE',
      payload: userProfile,
    } as const),

  SET_AUTH_USER_DATA: (
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    captcha?: any,
  ) =>
    ({
      type: 'SET_AUTH_USER_DATA',
      payload: { id, login, email, isAuth, captcha },
    } as const),

  SET_STATUS: (status: string | null) =>
    ({
      type: 'SET_STATUS',
      payload: status,
    } as const),

  GET_CAPTCHA_URL_SUCCESS: (captcha: string | null) =>
    ({
      type: 'GET_CAPTCHA_URL_SUCCESS',
      payload: captcha,
    } as const),

  INITIALIZATION_SUCCESS: () =>
    ({
      type: 'INITIALIZATION_SUCCESS',
    } as const),

  SET_USER_PHOTO: (ImageUrl: string | null) =>
    ({
      type: 'SET_USER_PHOTO',
      payload: ImageUrl,
    } as const),
  SET_FILTER: (term: any) =>
    ({
      type: 'users/SET_FILTER',
      payload: term,
    } as const),
    MESSAGE_RESIEVED: (messages: ChatMessageType[]) =>
    ({
      type: 'chat/MESSAGE_RESIEVED',
      payload: messages,
    } as const),
    STATUS_CHANGED: (statusChat: StatusType) =>
    ({
      type: 'chat/STATUS_CHANGED',
      payload: statusChat,
    } as const),
};
