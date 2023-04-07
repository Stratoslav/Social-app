import React, { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendChat,
  startChatListening,
  stopChatListening,
} from '../../API/API-Chat';
import { AppStateReducer } from '../../redux/store';
import shortid from 'shortid';

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Chat = () => {
  return (
    <div>
      <ChatPagge />
    </div>
  );
};

const ChatPagge = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(startChatListening());
    return () => {
      dispath(stopChatListening());
    };
  }, [dispath]);

  return (
    <div>
      <Messages />
      <AddNewMessage />
    </div>
  );
};

const Messages: FC<{}> = () => {
  const messages = useSelector((state: AppStateReducer) => state.chat.chat);
  const messageScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
        messageScroll.current?.scrollIntoView({behavior: 'smooth'})

  
  }, [messages])
  return (
    <div style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((m, index) => (
        <Message key={shortid.generate()} message={m} />
      ))}
      <div ref={messageScroll}></div>
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  return (
    <div>
      <div>
        <img src={message.photo} alt="" /> <span>{message.userName}</span>
        <br style={{ borderBottom: '1000px solid #000' }} />
        <p>{message.message}</p>
      </div>
    </div>
  );
});

const AddNewMessage: FC<{}> = () => {
  const [message, setMessage] = useState('');
  const dispath = useDispatch();
 const status = useSelector((state: AppStateReducer) => state.chat.statusChat)
  const sendMessageHandler = () => {
    dispath(sendChat(message));
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea
          onChange={e => setMessage(e.currentTarget.value)}
          value={message}
          placeholder="Write"
        ></textarea>
      </div>
      <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
};
export default Chat;
