import React, { FC, memo } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/create-actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import LoginError from '../../Login/LoginError';
import Button from '../../../common/Spinner/Button.module.css';

import classNames from 'classnames';

type Props = {
  addNewPost: (addingNewPost: string) => void;
};

const MyPosts: FC<Props> = memo(({ addNewPost }) => {
  console.log('Render');
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
            addNewPost(values.addPost);
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
});

export default connect(null, { addNewPost: actions.ADD_POST })(MyPosts);
