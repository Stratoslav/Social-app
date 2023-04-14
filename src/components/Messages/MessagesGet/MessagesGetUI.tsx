import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { messageAction } from '../../../redux/slice/messageSlice';

const MessagesGetUI = () => {

  const dispatch = useDispatch();
const {messagers} = useSelector((s: RootState) => s.newMessage)
  const getNewMessage = (sendNewMessage: string) => {
    dispatch(messageAction.addNewMessage(sendNewMessage));
  };
  return (
    <div>
      {messagers.map(({ message, id }) => {
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
            getNewMessage(values.sendNewMessage);
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
