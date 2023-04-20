import React, { Component, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import LoginError from './LoginError';
import * as Yup from 'yup';
import { login } from '../../API/API';
import { Redirect } from 'react-router';
import { getIsAuth, getUrlCaptcha } from '../../redux/create-selector';
import s from './Login.module.css';
import button from '../../common/Spinner/Button.module.css';
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Required'),
  rememberMe: Yup.boolean().required('Required'),
});

const LoginUI = ({ login, captchaUrl, isAuth }) => {
  const savedValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const onSubmit = (values, { setFieldError, setSubmitting, setStatus }) => {
    login(
      values.email,
      values.password,
      values.rememberMe,
      values.captchaUrl,
      setFieldError,
      setSubmitting,
      setStatus,
    );
    setSubmitting(false);
    if (isAuth === true) {
      return <Redirect to="/users" />;
    }
  };

  const [formValues, setFormValues] = useState(null);
  return (
    <div className={s.preview}>
      <Formik
        initialValues={
          formValues || {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: '',
          }
        }
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, status }) => (
          <Form style={{ color: 'white' }}>
            <h1 style={{ color: 'white' }}>CodeBrew</h1>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <Field
                type="email"
                id="email"
                name="email"
                // placeholder="email"
                className={s.loginInput}
              />

              <ErrorMessage name="email" component={LoginError} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <Field
                type="password"
                id="password"
                name="password"
                // placeholder="password"
                className={s.loginInput}
              />

              <ErrorMessage name="password" component={LoginError} />
            </div>
            <div>
              {captchaUrl && <img src={captchaUrl} alt="" />}
              {captchaUrl && (
                <div>
                  <label>
                    <Field
                      name="captchaUrl"
                      id="captchaUrl"
                      placeholder="captchaUrl"
                      className={s.loginInput}
                    />

                    <ErrorMessage name="captchaUrl" component={LoginError} />
                  </label>
                </div>
              )}
            </div>

            <div>
              <label style={{ marginRight: '10px', marginBottom: '20px' }}>
                I accept the terms of the user agreement
              </label>

              <Field
                className={s.checkboxWrapper}
                type="checkbox"
                name="rememberMe"
              />

              <ErrorMessage name="rememberMe" component={LoginError} />
            </div>
            <div> {`${status}` ? status : null} </div>

            {!values.rememberMe ? (
              <button className={button.button} disabled type="submit">
                <div>Log in</div>
              </button>
            ) : (
              <button className={button.button} type="submit">
                <div>Log in</div>
              </button>
            )}

            <button
              className={button.button}
              type="button"
              onClick={() => setFormValues(savedValues)}
            >
              Load save data
            </button>
          </Form>
        )}
      </Formik>
      <div style={{ color: 'white' }}>
        Don't have an account yet?{' '}
        <a href="https://social-network.samuraijs.com/signUp">Register</a>{' '}
      </div>
    </div>
  );
};

class Login extends Component {
  render() {
    const { login, captchaUrl, isAuth } = this.props;
    return <LoginUI login={login} captchaUrl={captchaUrl} isAuth={isAuth} />;
  }
}

const mapStateToProps = state => ({
  captchaUrl: getUrlCaptcha(state),
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, { login: login })(Login);
