import { ChatMessageType } from './../page/Chat/ChatPage';
import { InferActionTypes } from './store';
import { actions } from './create-actions';

type ActionTypes = InferActionTypes<typeof actions>

type PostType = {
  name: string | number;
  message: string | null;
  id: number | string | null;
};
type MessagersType = {
  message: string | null;
  id: number | string;
};
 export type UsersType = {
  name: string | null;
   id: number;
   followed: boolean,
   status: string | null,
   uniqueUrlName: string | null,
   photos: { small: string | null, large: string | null}
};
export type PhotosType = {
  small: string;
  large: string;
};
export type StatusType = 'pending' | 'ready';

export type ProfileType = {
  userId: number
lookingForAJob: boolean
lookingForAJobDescription: string
fullName: string
contacts: object
github: string
vk: string
facebook: string
instagram: string
twitter: string
website: string
youtube: string
mainLink: string
photos: PhotosType
}

export type FindUsersType = {
  id: number;
  name: string;
  status: string | null;
  followed: boolean;
  photos: PhotosType;
};

const initialState = {
  posts: [
    { name: 'Alla', message: 'Its my first posts', id: 1 },
    { name: 'Salo', message: 'Its my second posts', id: 2 },
    { name: 'Dalo', message: 'Its my firsth posts', id: 3 },
  ] as Array<PostType>,

  userNewPost: '' as string | null,
  messagers: [
    { message: 'Hello', id: 1 },
    { message: 'How are you?', id: 2 },
  ] as Array<MessagersType>,
  messageNewBody: '' as string | null,
  users: [
    { name: 'Dima', id: 1 },
    { name: 'Vika', id: 2 },
    { name: 'Slava', id: 3 },
    { name: 'Gosha', id: 4 },
    { name: 'Antoni', id: 5 },
  ] as Array<UsersType>,

  findUsers: [] as Array<FindUsersType>,
  currentPage: 1 as number,
  totalCount: 0 as number,
  userCount: 10 as number,
  isPreloader: false as boolean,
  filter: {
    term: '',
    // friends: null as null | boolean
  },

  profile: null  as Array<ProfileType> | null,
  email: null as string | null,
  login: null as number | string | null,
  userId: null as number | null,
  userPhoto: null as any,
  isAuth: false as boolean,
  captchaUrl: null as string | null,
  status: '' as string | null,
    initialized: false as boolean,
    chat: [] as ChatMessageType[],
    statusChat: 'pending' as StatusType
};

export type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;


export const userReducer = (state = initialState, actions: ActionTypes) => {
  return state;
};

// export const authReducer = (state = initialState, actions: ActionTypes) => {
//   switch (actions.type) {
//     case 'SET_AUTH_USER_DATA':
      
//       return { ...state, ...actions.payload, userId: actions.payload.id };
//     case 'GET_CAPTCHA_URL_SUCCESS':
//       return { ...state, captchaUrl: actions.payload };
//     default:
//       return state;
//   }
// };

export const appReducer = (state = initialState, actions: ActionTypes) => {
  switch (actions.type) {
    case 'INITIALIZATION_SUCCESS':
      return { ...state, initialized: true };

    default:
      return state;
  }
};


