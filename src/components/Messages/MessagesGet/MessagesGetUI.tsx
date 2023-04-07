import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getNewMessage } from '../../../redux/create-selector';
import { actions } from '../../../redux/create-actions';

const MessagesGetUI = () => {
  const newMessage = useSelector(getNewMessage);
  const dispatch = useDispatch();

  const dispatchD = (sendNewMessage: string) => {
    dispatch(actions.ADD_NEW_MESSAGE(sendNewMessage));
  };
  return (
    <div>
      {newMessage.map(({ message, id }) => {
        return (
          <div key={id}>
            <p>{message}</p>
          </div>
        );
      })}

      <Formik
        initialValues={{
          sendNewMessage: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 0));
          if (values.sendNewMessage.length === 0) {
            alert('Sorry, but need to fill in the gaps');
            return;
          } else {
            dispatchD(values.sendNewMessage);
            values.sendNewMessage = '';
          }
        }}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="sendNewMessage"></label>
            <Field
              id="sendNewMessage"
              name="sendNewMessage"
              value={values.sendNewMessage}
            />
            <button type="submit">Add message</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesGetUI;
