import React, { FC, useEffect } from 'react';
import style from './ProfileData.module.css';
import Button from '../../../common/Spinner/Button.module.css';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import { connect, useDispatch } from 'react-redux';
import { updateStatus } from '../../../API/API';
import { getUserStatus } from '../../../redux/create-selector';
import { AppStateReducer } from '../../../redux/store';
import button from '../../../common/Spinner/Button.module.css'
import { profileAction } from '../../../redux/slice/profileSlice';
type Props = {
  profile: any;
  isOwner: boolean;
  goToEditMode: any;
  updateStatus: (statusProfile: any) => void;
  status: any;
};
const ProfileData = ({
  profile,
  isOwner,
  goToEditMode,
  updateStatus,
  status,
}: Props) => {
  let hasNaN: unknown[] | null = Object.values(profile.contacts).includes(null) ? Object.values(profile.contacts).filter((p: any) => p !== null) : null
  // console.log(isOwner)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileAction.setName(profile.fullName))

  }, [dispatch, profile])

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
        <ProfileStatus status={status} isOwner={isOwner} updateStatus={updateStatus} />
        <div>
          <b>Contacts:{hasNaN?.length === 0 && isOwner  ? <button onClick={goToEditMode} className={button.button}>Add data</button> : null}</b>
        
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

      {isOwner && hasNaN?.length !== 0 ? (
        <div>
          <button className={Button.button} onClick={goToEditMode}>
            Edit Data
          </button>
        </div>
      ) : undefined}
    </div>
  );
};

type PropsType = {
  contactTitle: string;
  contactValue: string ;
};

const Contacts: FC<PropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      {contactValue?.length > 0 && contactValue !== null ? ( <><b>{contactTitle}</b> <a href={contactValue}>{contactValue}</a></> ) : null }
     
    </div>
  );
};

const mapStateToProps = (state: AppStateReducer) => ({
  status: getUserStatus(state),
});

export default connect(mapStateToProps, { updateStatus: updateStatus })(
  ProfileData,
);
