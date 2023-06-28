import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Spinner.module.css';

const SpinnerLoader = () => {
  return (
    <div className={style.load}>
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  );
};

export default SpinnerLoader;
