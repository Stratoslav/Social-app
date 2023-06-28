import styles from './Window.module.css';

const Window = () => {
  return (
    <section className={styles.Window}>
      <h1>Добро пожаловать</h1>
      <div className={styles.Window_text}>
        <b>Lococo</b> - приложение для обмена фотографиями и видеозаписями с
        элементами социальной сети, позволяющее снимать фотографии и видео,
        применять к ним фильтры, а также распространять их через свой сервис и
        ряд других социальных сетей.
      </div>
      <p>
        <i>Type </i> : Социльная сеть
      </p>
    </section>
  );
};

export default Window;
