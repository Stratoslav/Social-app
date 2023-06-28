import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToPropsRedirect = state => ({
  auth: state.auth.isAuth,
});

export const withAuthRedirect = Component => {
  class RedirectComponent extends React.Component {
    render() {
      const { auth } = this.props;
      if (!auth) {
        return <Redirect to="/login" />;
      }
      return <Component {...this.props} />;
    }
  }
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(
    RedirectComponent,
  );
  return ConnectedAuthRedirectComponent;
};
