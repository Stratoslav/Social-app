import axios from 'axios';
import { actions } from '../redux/create-actions';
import { profileAction } from '../redux/slice/profileSlice';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'a710d4a2-8190-472c-a3a3-5bcc10aff005',
  },
});

export const getAuthorizationUser = () => async dispatch => {
  let response = await instance.get(`auth/me`);
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    console.log(response.data);
    dispatch(actions.SET_AUTH_USER_DATA(id, login, email, true));
  }
};

export const initializedApp = () => dispatch => {
  let promise = dispatch(getAuthorizationUser());

  Promise.all([promise]).then(() => {
    dispatch(actions.INITIALIZATION_SUCCESS());
  });
};

export const login =
  (
    email,
    password,
    rememberMe,
    captcha,
    setSubmitting,
    setFieldError,
    setStatus,
  ) =>
  async dispatch => {
    const response = await instance.post(`auth/login`, {
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

export const getCaptchaUrl = () => async dispatch => {
  let response = await instance.get(`security/get-captcha-url`);
  const captchaUrl = response.data.url;
  dispatch(actions.GET_CAPTCHA_URL_SUCCESS(captchaUrl));
};

export const getUserPhoto = photoFile => async dispatch => {
  const formData = new FormData();
  formData.append('image', photoFile);
  let response = await instance.put('profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // <<<<<<<<<<<<<<MISTAKE>>>>>>>>>>>>>>>>>>>
  const ImageUrl = response.data.data.photos;
  if (response.data.resultCode === 0) {
    dispatch(profileAction.setUserPhoto(ImageUrl));
  }
};

export const logout = () => async dispatch => {
  let response = await instance.delete(`auth/login`);
  if (response.data.resultCode === 0) {
    dispatch(actions.SET_AUTH_USER_DATA(null, null, null, false));
  }
};

export const setUserProfile = userId => async dispatch => {
  let response = await instance.get(`profile/${userId}`);
  dispatch(profileAction.setUserProfile(response.data));
};

export const getStatus = userId => async dispatch => {
  let response = await instance.get(`profile/status/${userId}`);
  dispatch(profileAction.setStatus(response.data));
};

export const updateStatus = status => async dispatch => {
  let response = await instance.put(`profile/status`, { status: status });
  if (response.data.resultCode === 0) {
    dispatch(profileAction.setStatus(status));
  }
};

export const saveProfile =
  (
    setFieldError,
    setSubmitting,
    setStatus,
    fullName,
    aboutMe,
    lookingForAJobDescription,
    lookingForAJob,
    contacts,
  ) =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await instance.put(`profile`, {
      fullName,
      aboutMe,
      lookingForAJobDescription,
      lookingForAJob,
      contacts,
    });

    if (response.data.resultCode === 0) {
      dispatch(setUserProfile(userId));
    } else if (response.data.resultCode === 1) {
      setStatus(response.data.messages);
      debugger;
    }
  };
