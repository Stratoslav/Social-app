import React, { FC } from 'react';
import style from './ProfileData.module.css';
import Button from '../../../common/Spinner/Button.module.css';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import { connect } from 'react-redux';
import { updateStatus } from '../../../API/API';
import { getUserStatus } from '../../../redux/create-selector';
import { AppStateReducer } from '../../../redux/store';

type Props = {
  profile: any;
  isOwner: boolean;
  goToEditMode: any;
  updateStatus: (statusProfile: string | null) => void;
  status: string;
};

const ProfileData: FC<Props> = ({
  profile,
  isOwner,
  goToEditMode,
  updateStatus,
  status,
}) => {
  return (
    <div className={style.Data}>
      <ul className={style.DataList}>
        <h2>{profile.fullName}</h2>
        <p style={{ margin: 0 }}>
          <span>
            <b>About Me:</b>
          </span>{' '}
          {profile.aboutMe || 'Не указано'}
        </p>
        {profile.lookingForAJob ? (
          <p>
            <span className={style.ProfileInfo}>
              <b>Работа:</b>
            </span>{' '}
            {profile.lookingForAJobDescription}
          </p>
        ) : (
          <div>
            <span className={style.ProfileInfo}>
              <b>Работа:</b>
            </span>{' '}
            Не указано
          </div>
        )}
        <ProfileStatus status={status} updateStatus={updateStatus} />
        <div>
          <b>Contacts:</b>
          {Object.keys(profile.contacts).map(key => {
            return (
              <Contacts
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </ul>

      {isOwner || (
        <div>
          <button className={Button.button} onClick={goToEditMode}>
            Edit Data
          </button>
        </div>
      )}
    </div>
  );
};

type PropsType = {
  contactTitle: string;
  contactValue: string | undefined;
};

const Contacts: FC<PropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b> <a href={contactValue}>{contactValue}</a>
    </div>
  );
};

const mapStateToProps = (state: AppStateReducer) => ({
  status: getUserStatus(state),
});

export default connect(mapStateToProps, { updateStatus: updateStatus })(
  ProfileData,
);
