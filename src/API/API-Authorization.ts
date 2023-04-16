import { instance } from "./API";
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import  {actions} from '../redux/create-actions';
import { AppStateReducer } from '../redux/store';
type ThunkType = ThunkAction<void, AppStateReducer, unknown, Action<any>>;

type getAuthorizationUserType = {
  resultCode: number
  messages: Array<string>
  data: {id: number, login: string, email: string}
}

export const getAuthorizationUser = (): ThunkType  => async dispatch => {
    let response = await instance.get<getAuthorizationUserType>(`auth/me`);
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      console.log(response.data);
      dispatch(actions.SET_AUTH_USER_DATA(id, login, email, true));
    }
  };
  
  export const initializedApp = (): ThunkType => dispatch => {
    let promise = dispatch(getAuthorizationUser());
  
    Promise.all([promise]).then(() => {
      dispatch(actions.INITIALIZATION_SUCCESS());
    });
  };
  
