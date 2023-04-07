import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../redux/create-reducer';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

export const UsersSearchForm: FC<PropsType> = ({ onFilterChanged }) => {
  const submit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik enableReinitialize initialValues={{ term: '' }} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="red">Friends</option>
              <option value="green">All</option>
              <option value="blue">Blue</option>
            </Field>
            <ErrorMessage name="term" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
      );
    </div>
  );
};
