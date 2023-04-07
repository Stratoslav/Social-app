/* eslint-disable react/jsx-no-duplicate-props */

import style from '../Messages/Messages.module.css';
import { BrowserRouter, Route } from 'react-router-dom';
import MessagesGet from './MessagesGet/MessagesGet';
import { MessagesUser } from './MessagesUser/MessagesUser';
import { useSelector } from 'react-redux';

import { getMessageUserId } from '../../redux/create-selector';

export const Messages = () => {
  const getUserId = useSelector(getMessageUserId);

  return (
    <BrowserRouter>
      <section className={style.Messages}>
        <ul className={style.Messages_Users}>{<MessagesUser />}</ul>
        <div>
          <Route
            exact
            path={`/messages/:${getUserId}`}
            render={() => <MessagesGet />}
          />
        </div>
      </section>
    </BrowserRouter>
  );
};
