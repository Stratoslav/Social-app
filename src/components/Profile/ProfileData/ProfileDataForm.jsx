import React, {useState} from 'react';
import style from '../ProfilePage.module.css';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import LoginError from '../../Login/LoginError';

const ProfileDataForm = ({ profile, saveProfile, goToEditMode }) => {
  const savedValues = {
    fullName: '_Stratoslav_',
    AboutMe: 'Dev',
    lookingForAJobDescription: 'Frontend dev',
    lookingForAJob: true,
    contacts: 'https://www.instagram.com'
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
   goToEditMode()
    setSubmitting(true);
  };
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues ||{
        fullName: '',
        AboutMe: '',
        lookingForAJobDescription: '',
        lookingForAJob: false,
        contacts: '',
      }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      
        {({status, values}) => (
          <Form >
          <section  className={style.ProfileList}>
          <div>
            <h2>{profile.fullName}</h2>
            <label className={style.ProfileInfo} htmlFor="fullName">
            full Name
            </label>

            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="full Name"
            />
          </div>

          <div style={{ margin: 0 }}>
            <p>{profile.aboutMe}</p>
            <label className={style.ProfileInfo} htmlFor="AboutMe">
              About Me
            </label>

            <Field
              type="text"
              id="AboutMe"
              name="AboutMe"
              placeholder="About Me"
            />

            <ErrorMessage name="AboutMe" component={LoginError} />
          </div>
          <div>
            <p>{profile.lookingForAJob}</p>
            <label className={style.ProfileInfo} htmlFor="lookingForAJob">
            looking For A Job
            </label>

            <Field type='checkbox' id="lookingForAJob" name="lookingForAJob" placeholder="lookingForAJob" />

            <ErrorMessage name="lookingForAJob" component={LoginError} />
          </div>
          <div>
            <p>{profile.lookingForAJobDescription}</p>
            <label className={style.ProfileInfo} htmlFor="lookingForAJobDescription">
              Job
            </label>

            <Field type="text" id="lookingForAJobDescription" name="lookingForAJobDescription" placeholder="lookingForAJobDescription" />

            <ErrorMessage name="lookingForAJobDescription" component={LoginError} />
          </div>
          
           <div>
     <b>Contacts:</b>
        {Object.keys(profile.contacts).map(key => {
            return (
              <div key={key}>

             <b> {key}:
                <Field
            type="text"
            id="contacts"  name={'contacts.' + key}  
          />
             </b>
           </div>

               
             );
          })}  
           </div> 
         <div> {`${status}` ? status : null } </div>  
        </section>
        {/* ???????????????????????????????????????????????????????????????????? */}
        <button type='submit' onChange={() => status === null || <div>Cool</div> }>Save</button>
        <button type="button" onClick={() => setFormValues(savedValues)}>
            Load save data
          </button>
        </Form>
        )}
        
      
    </Formik>
  );
};

export default (ProfileDataForm);
