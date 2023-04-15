import React, { Component, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import LoginError from './LoginError';
import * as Yup from 'yup';
import { login } from '../../API/API';
import { Redirect } from 'react-router';
import { getIsAuth, getUrlCaptcha } from '../../redux/create-selector';

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
    email: 'stas.kurbanov03@gmail.com',
    password: '',
    rememberMe: false,
  };
  console.log(isAuth);
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
        <Form>
          <h1>Login</h1>
          <div>
            <label htmlFor="email">First Name</label>

            <Field type="email" id="email" name="email" placeholder="email" />

            <ErrorMessage name="email" component={LoginError} />
          </div>
          <div>
            <label htmlFor="password">Pasworld</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="password"
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
                  />

                  <ErrorMessage name="captchaUrl" component={LoginError} />
                </label>
              </div>
            )}
          </div>

          <div>
            <label> {`${values.rememberMe}`}</label>

            <Field type="checkbox" name="rememberMe" />

            <ErrorMessage name="rememberMe" component={LoginError} />
          </div>
          <div> {`${status}` ? status : null} </div>
          {!values.rememberMe ? (
            <button disabled type="submit">
              <div>Log in</div>
            </button>
          ) : (
            <button type="submit">
              <div>Log in</div>
            </button>
          )}

          <button type="button" onClick={() => setFormValues(savedValues)}>
            Load save data
          </button>
        </Form>
      )}
    </Formik>
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
