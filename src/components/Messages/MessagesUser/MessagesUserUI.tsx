import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../../../redux/create-selector';
import style from '../../Messages/Messages.module.css';

export const MessagesUserUI = () => {
  const users = useSelector(getAllUsers);
  return (
    <div>
      {users.map(({ id, names }) => {
        return (
          <li key={id} className={style.Messages_Content}>
            <NavLink
              className={style.Messages_Link}
              activeClassName={style.Messages_Active}
              to={`/messages/${id}`}
            >
              {names}
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};
