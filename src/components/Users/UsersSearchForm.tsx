import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../redux/create-reducer';
import s from './Users.module.css'
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
     
      <Formik enableReinitialize initialValues={{ term: '' }} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form className={s.userForm}>
            <label className={s.userLabelForm}>
              find user
  <Field className={s.userFieldForm} type="text" name="term" />
            </label>
          
            <ErrorMessage name="term" component="div" />
            <button className={s.userButtonForm}  type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
     
    </div>
  );
};
