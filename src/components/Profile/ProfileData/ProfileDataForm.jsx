import React, { useState } from 'react';
import style from '../ProfilePage.module.css';
import s from './ProfileData.module.css';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import LoginError from '../../Login/LoginError';

const ProfileDataForm = ({ profile, saveProfile, goToEditMode }) => {
  const savedValues = {
    fullName: profile.fullName,
    AboutMe: profile.aboutMe,
    lookingForAJobDescription: profile.lookingForAJobDescription,
    lookingForAJob: true,
  };
  const onSubmit = (values, { setFieldError, setSubmitting, setStatus }) => {
    saveProfile(
      setFieldError,
      setSubmitting,
      setStatus,
      values.fullName,
      values.AboutMe,
      values.lookingForAJobDescription,
      values.lookingForAJob,
      values.contacts,
    );
    goToEditMode();
    setSubmitting(true);
  };

  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={
        formValues || {
          fullName: profile.fullName,
          AboutMe: profile.aboutMe,
          lookingForAJobDescription: profile.lookingForAJobDescription,
          lookingForAJob: false,
          contacts: '',
        }
      }
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ status, values }) => (
        <Form>
          <section className={s.ProfileList}>
            <div>
              <h1>{profile.fullName}</h1>

              <Field
                className={s.contactsInput}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="full Name"
              />
              <label className={style.ProfileInfo} htmlFor="fullName">
                full Name
              </label>
            </div>

            <div style={{ margin: 0 }}>
              <Field
                className={s.contactsInput}
                type="text"
                id="AboutMe"
                name="AboutMe"
                placeholder="About Me"
              />
              <label className={style.ProfileInfo} htmlFor="AboutMe">
                About Me
              </label>
              <ErrorMessage name="AboutMe" component={LoginError} />
            </div>
            <div>
              <Field
                className={s.contactsInput}
                type="text"
                id="lookingForAJobDescription"
                name="lookingForAJobDescription"
                placeholder="lookingForAJobDescription"
              />
              <label
                className={style.ProfileInfo}
                htmlFor="lookingForAJobDescription"
              >
                Job
              </label>
              <ErrorMessage
                name="lookingForAJobDescription"
                component={LoginError}
              />
            </div>
            <div>
              <p>{profile.lookingForAJob}</p>

              <Field
                className={s.contactsInput}
                type="checkbox"
                id="lookingForAJob"
                name="lookingForAJob"
                placeholder="lookingForAJob"
              />
              <label className={style.ProfileInfo} htmlFor="lookingForAJob">
                looking For A Job
              </label>
              <ErrorMessage name="lookingForAJob" component={LoginError} />
            </div>

            <div>
              <h3>Contacts:</h3>
              {Object.keys(profile.contacts).map(key => {
                return (
                  <div key={key}>
                    <b className={s.ContactsKeyName}>
                      <Field
                        className={s.contactsInput}
                        type="text"
                        id="contacts"
                        name={'contacts.' + key}
                      />
                      {key}
                    </b>
                  </div>
                );
              })}
            </div>
            <div> {`${status}` ? status : null} </div>
            <div className={s.contactsButtonWrapper}>
              <button
                type="submit"
                onChange={() => status === null || <div>Cool</div>}
              >
                Save
              </button>
              <button type="button" onClick={() => setFormValues(savedValues)}>
                Load save data
              </button>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDataForm;
