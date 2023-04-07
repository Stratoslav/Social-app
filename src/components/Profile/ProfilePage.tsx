import React, { FC, useState } from 'react';

import ProfileDataForm from './ProfileData/ProfileDataForm';
import ProfileData from './ProfileData/ProfileData';
import style from './ProfilePage.module.css';
import classNames from 'classnames';
import { ProfileType } from '../../redux/create-reducer';

type Props = {
  profile: ProfileType;
  isOwner: boolean;
  savePhoto: (e: string | null) => void;
  saveProfile: any;
};

const ProfilePage: FC<Props> = ({
  profile,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <h1>LOADING...</h1>;
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <section className={style.ProfilePage}>
      <div className={style.ChangeProilePhoto}>
        <a target="blank" href={profile.photos.large}>
          <img
            className={style.profileAvatar}
            src={
              profile.photos.small ||
              'https://www.prajwaldesai.com/wp-content/uploads/2021/02/Find-Users-Last-Logon-Time-using-4-Easy-Methods.jpg'
            }
            alt=""
          />
        </a>
        {isOwner || (
          <div className={style.input__wrapper}>
            <input
              onChange={onMainPhotoSelected}
              name="file"
              type="file"
              id="input__file"
              className={classNames(style.input, style.input__file)}
              multiple
            />
            <label htmlFor="input__file" className={style.input__fileButton}>
              <span className={style.input__fileIconWrapper}>
                <img
                  className={style.input__fileIcon}
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
                  alt="Выбрать файл"
                  width="25"
                />
              </span>
              <span className={style.input__fileButtonText}>Выберите файл</span>
            </label>
          </div>
        )}
      </div>

      {editMode ? (
        <ProfileDataForm
          saveProfile={saveProfile}
          profile={profile}
          goToEditMode={() => setEditMode(false)}
        />
      ) : (
        <div>
          {' '}
          <ProfileData
            goToEditMode={() => setEditMode(true)}
            isOwner={isOwner}
            profile={profile}
          />
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
