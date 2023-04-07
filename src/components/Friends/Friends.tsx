import { useSelector } from 'react-redux';
import { getFindUser } from '../../redux/create-selector';

export default function Friends() {
  const findUsers = useSelector(getFindUser);
  return (
    <section>
      <div>
        {findUsers.map(({ name, id, followed }) => {
          return <div key={id}>{followed ? <p>{name}</p> : null}</div>;
        })}
      </div>
    </section>
  );
}
//ergeheh
