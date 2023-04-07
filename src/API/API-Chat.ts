import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actions } from '../redux/create-actions';
import { StatusType } from '../redux/create-reducer';
import { AppStateReducer } from '../redux/store';
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type messageRecievedSubscriberType = (message: ChatMessageType[]) => void;
type statusChangedSubscriberType = (status: StatusType) => void;
let subscribers = {
  'message-recieved': [] as messageRecievedSubscriberType[],
  'status-changed': [] as statusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EvntsName = 'message-recieved' | 'status-changed'

const closeHandler = () => {
  notifySubscribesAboutStatus('pending')
  setTimeout(createConnect, 3000);
};

const messageHandler = (e: any) => {
  const newMessages = JSON.parse(e.data);
  subscribers['message-recieved'].forEach(s => s(newMessages));
};
const openHandler = (e: any) => {
  notifySubscribesAboutStatus('ready')
};
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
}
const notifySubscribesAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
function createConnect() {
  cleanUp()
  ws?.close();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  notifySubscribesAboutStatus('pending')
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
}

export const ChatAPI = {
  start() {
    createConnect();
  },
  stop() {
    subscribers['message-recieved'] = [];
    subscribers['status-changed'] = [];
    cleanUp()
    ws?.close();
    
  },
  subscribe( eventName: EvntsName,callback: messageRecievedSubscriberType | statusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
       //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    };
  },
  unsubscribe( eventName: EvntsName, callback: messageRecievedSubscriberType  | statusChangedSubscriberType) {
       //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

type ThunkType = ThunkAction<void, AppStateReducer, unknown, Action<any>>;

let _newChatHendler: ((message: ChatMessageType[]) => void) | null = null;

const newChatHendler = (dispatch: Dispatch) => {
  if (_newChatHendler === null) {
    _newChatHendler = message => {
      dispatch(actions.MESSAGE_RESIEVED(message));
    };
  }

  return _newChatHendler;
};
let _statusChangedHendler: ((statusChat: StatusType) => void) | null = null;
const statusChangedHendler = (dispatch: Dispatch) => {
  if (_statusChangedHendler === null) {
    _statusChangedHendler = statusChat => {
      dispatch(actions.STATUS_CHANGED(statusChat));
    };
  }

  return _statusChangedHendler;
};
export const startChatListening = (): ThunkType => async dispatch => {
  ChatAPI.start();
  ChatAPI.subscribe('message-recieved',newChatHendler(dispatch));
  ChatAPI.subscribe('status-changed',statusChangedHendler(dispatch));
};
export const stopChatListening = (): ThunkType => async dispatch => {
  ChatAPI.unsubscribe('message-recieved',newChatHendler(dispatch));
  ChatAPI.unsubscribe('status-changed',statusChangedHendler(dispatch));
  ChatAPI.stop();
};

export const sendChat =
  (message: string): ThunkType =>
  async dispatch => {
    ChatAPI.sendMessage(message);
  };
