import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styles from '../../App.module.css';
import style from '../Profile/Profile.module.css';
import AllPosts from './Posts/AllPosts';
import MyPosts from './Posts/MyPost';
import ProfilePage from './ProfilePage';
import { compose } from 'redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import {
  updateStatus,
  getStatus,
  setUserProfile,
  getAuthorizationUser,
  getUserPhoto,
  saveProfile,
} from '../../API/API';
import {
  getProfile,
  getUserStatus,
  getAuthUserId,
} from '../../redux/create-selector';
import { AppStateReducer } from '../../redux/store';
type StateType = {
  status: string | null;
};

type PropsType = {
  match: any;
  params: any;
  authorizationUserId: number;
  UserProfile: (userId: number) => void;
  getUpStatus: (userId: number) => void;
  profile: any;
  updateStatus: (statusProfile: string | null) => void;
  status: string | null;
  savePhoto: any;
  saveProfile: any;
};

class Profile extends Component<PropsType, StateType> {
  userId = this.props.match.params.userId ?? this.props.authorizationUserId;
  refreshProfile() {
    const { UserProfile, getUpStatus } = this.props;
    const userId =
      this.props.match.params.userId ?? this.props.authorizationUserId;
    UserProfile(userId);
    getUpStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    const { profile, savePhoto, saveProfile } = this.props;

    return (
      <div className={`${styles.Content} ${style.Profile}`}>
        <ProfilePage
          saveProfile={saveProfile}
          savePhoto={savePhoto}
          isOwner={!!this.props.match.params.userId}
          profile={profile}
        />

        <MyPosts />
        <AllPosts />
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateReducer) => ({
  profile: getProfile(state),
  status: getUserStatus(state),

  authorizationUserId: getAuthUserId(state),
});

export default compose(
  connect(mapStateToProps, {
    UserProfile: setUserProfile,
    getUpStatus: getStatus,
    updateStatus: updateStatus,
    getAuthorizationUser,
    savePhoto: getUserPhoto,
    saveProfile: saveProfile,
  }),
  withRouter,
  withAuthRedirect,
)(Profile);
