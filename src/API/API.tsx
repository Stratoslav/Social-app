import axios from 'axios';
import { actions } from '../redux/create-actions';
import { profileAction } from '../redux/slice/profileSlice';
import { AppDispatch } from '../redux/store';


export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'a710d4a2-8190-472c-a3a3-5bcc10aff005',
  },
});

export const getAuthorizationUser = () => async (dispatch: AppDispatch) => {
  let response: any = await instance.get(`auth/me`);
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    console.log(response.data);
    dispatch(actions.SET_AUTH_USER_DATA(id, login, email, true));
  }
};

export const initializedApp = () => (dispatch: AppDispatch) => {
  let promise = dispatch(getAuthorizationUser());

  Promise.all([promise]).then(() => {
    dispatch(actions.INITIALIZATION_SUCCESS());
  });
};

export const login =
  (
    email:string,
    password:string,
    rememberMe:boolean, 
    captcha:() => void,
    setSubmitting:any,
    setFieldError:any,
    setStatus:any,
  ) =>
  async (dispatch: AppDispatch) => {
    const response: {data: { resultCode: number, messages: any[]}, config: any, headers: any, request: any, status: number, statusText: string} = await instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  
    if (response.data.resultCode === 0) {
      dispatch(getAuthorizationUser());
    
    } else if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
      setStatus(response.data.messages);
    }
  };

export const getCaptchaUrl = () => async (dispatch: AppDispatch) => {
  let response: any = await instance.get(`security/get-captcha-url`);
  const captchaUrl = response.data.url;
  dispatch(actions.GET_CAPTCHA_URL_SUCCESS(captchaUrl));
};

export const getUserPhoto = (photoFile: any) => async (dispatch: AppDispatch) => {
  const formData = new FormData();
  formData.append('image', photoFile);
  let response: any = await instance.put('profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // <<<<<<<<<<<<<<MISTAKE>>>>>>>>>>>>>>>>>>>
  const ImageUrl = response.data.data.photos;
  if (response.data.resultCode === 0) {
    dispatch(profileAction.setUserPhoto(ImageUrl));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  let response:any = await instance.delete(`auth/login`);
  if (response.data.resultCode === 0) {
    dispatch(actions.SET_AUTH_USER_DATA(null, null, null, false));
  }
};

export const setUserProfile = (userId:any) => async (dispatch: AppDispatch) => {
  let response = await instance.get(`profile/${userId}`);
  dispatch(profileAction.setUserProfile(response.data));
};

export const getStatus = (userId:any) => async (dispatch: AppDispatch) => {
  let response = await instance.get(`profile/status/${userId}`);
  dispatch(profileAction.setStatus(response.data));
};

export const updateStatus = (status:any) => async (dispatch: AppDispatch) => {
  let response :any = await instance.put(`profile/status`, { status: status });
  if (response.data.resultCode === 0) {
    dispatch(profileAction.setStatus(status));
  }
};

export const saveProfile =
  (
    setFieldError:any,
    setSubmitting:any,
    setStatus:any,
    fullName:any,
    aboutMe:any,
    lookingForAJobDescription:any,
    lookingForAJob:any,
    contacts: any,
  ) =>
  async (dispatch: AppDispatch, getState:any) => {
    const userId = getState().auth.userId;
    let response:any = await instance.put(`profile`, {
      fullName,
      aboutMe,
      lookingForAJobDescription,
      lookingForAJob,
      contacts,
    });

    if (response.data.resultCode === 0) {
      dispatch(setUserProfile(userId));
    } else if (response.data.resultCode === 1) {
      dispatch(profileAction.getErrorMessage(response.data.messages))
      setStatus(response.data.messages);
      debugger;
    }
  };
