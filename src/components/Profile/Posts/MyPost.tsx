import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoginError from '../../Login/LoginError';
import Button from '../../../common/Spinner/Button.module.css';

import classNames from 'classnames';

import { profileAction } from '../../../redux/slice/profileSlice';
import { useAppDispatch } from '../../../redux/hooks';

const MyPosts = () => {
  const dispatch = useAppDispatch()


  return (
    <div className={classNames('Post_New', 'Post')}>
      <Formik
        initialValues={{
          addPost: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 0));
          if (values.addPost.length === 0) {
            alert('Sorry, but need to fill in the gaps');
            return;
          } else {
            dispatch(profileAction.addPost(values.addPost));
           
            values.addPost = '';
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="formGroup">
              <span>New post</span>

              <Field
                className="formField"
                id="addPost"
                name="addPost"
                value={values.addPost}
              />
            </div>

            <ErrorMessage name="addPost" component={LoginError} />
            <button className={Button.button} type="submit">
              Add post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyPosts;
