import { ChatMessageType } from './../page/Chat/ChatPage';
import { InferActionTypes } from './store';
import { actions } from './create-actions';
import shortid from 'shortid';

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
  names: string | null;
  id: number;
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
    { names: 'Dima', id: 1 },
    { names: 'Vika', id: 2 },
    { names: 'Slava', id: 3 },
    { names: 'Gosha', id: 4 },
    { names: 'Antoni', id: 5 },
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

export const messageReducer = (
  state = initialState,
  actions: ActionTypes,
): initialStateType => {
  switch (actions.type) {
    case 'ADD-NEW-MESSAGE':
      let copyState = { ...state };
      copyState.messagers = [...state.messagers];
      copyState.messageNewBody = actions.payload;
      const newMessage = {
        id: shortid.generate(),
        message: actions.payload,
      };
      copyState.messagers.push(newMessage);
      return copyState;

    default:
      return state;
  }
};

export const findUsersReducer = (
  state = initialState,
  actions: ActionTypes,
): initialStateType => {
  switch (actions.type) {
    case 'SET-USERS':
      return { ...state, findUsers: [...actions.payload] };

    case 'SET-CURRENT-PAGE':
      return { ...state, currentPage: actions.payload };

    case 'SET-TOTAL-COUNT':
      return { ...state, totalCount: actions.payload };

    case 'SET-PRELOADER':
      return { ...state, isPreloader: actions.payload };
     case 'users/SET_FILTER':
       return {...state,  filter: actions.payload};
    case 'FOLLOW-UNFOLLOW':
      let copyState = {
        ...state,
        findUsers: state.findUsers.map(user => {
          if (user.id === actions.payload) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
      return copyState;

    default:
      return state;
  }
};

export const profileReducer = (
  state = initialState,
  actions: any,
) => {
  switch (actions.type) {
    case 'ADD-POST':
      const copyState = { ...state };
      copyState.posts = [...state.posts];
      copyState.userNewPost = actions.payload;
      const newPost = {
        name: state.posts.forEach.name,
        id: shortid.generate(),
        message: actions.payload,
      };
      copyState.posts.push(newPost);
      return copyState;
    case 'SET-USER-PROFILE':
      return { ...state, profile: actions.payload };
    case 'SET_STATUS':
      return { ...state, status: actions.payload };
    case 'SET_USER_PHOTO':
      return { ...state, profile: { ...state.profile, userPhoto: actions.payload } };
    default:
      return state;
  }
};

export const userReducer = (state = initialState, actions: ActionTypes) => {
  return state;
};

export const authReducer = (state = initialState, actions: ActionTypes) => {
  switch (actions.type) {
    case 'SET_AUTH_USER_DATA':
      return { ...state, ...actions.payload, userId: actions.payload.id };
    case 'GET_CAPTCHA_URL_SUCCESS':
      return { ...state, captchaUrl: actions.payload };
    default:
      return state;
  }
};

export const appReducer = (state = initialState, actions: ActionTypes) => {
  switch (actions.type) {
    case 'INITIALIZATION_SUCCESS':
      return { ...state, initialized: true };

    default:
      return state;
  }
};


export const chatReducer = (state = initialState, actions: ActionTypes) => {
  switch (actions.type) {
    case 'chat/MESSAGE_RESIEVED':
      return { ...state, chat: [...state.chat, ...actions.payload].filter((m, index, array)=>index >= array.length - 100) };
      case 'chat/STATUS_CHANGED':
        return { ...state, statusChat: actions.payload };
  
    default:
      return state;
  }
};
