import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Button from '../../../common/Spinner/Button.module.css'
import button from '../../../common/Spinner/Button.module.css'
type Props = {
  updateStatus: (statusProfile: string | null ) => void
  status: string,
  isOwner: boolean
}

const ProfileStatus: FC<Props> = ({ updateStatus, status , isOwner}) => {
  let [editStatus, setEditStatus] = useState<boolean>(true);
  let [statusProfile, setStatusProfile] = useState(status);

  useEffect(() => {
    setStatusProfile(status);
  }, [status]);

  const activateStatus = () => {
    setEditStatus(false);
    
  };
  const diactivateStatus = () => {
    setEditStatus(true);
    updateStatus(statusProfile);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusProfile(e.currentTarget.value);
  };

  return (
    <>
      <div style={{'marginBottom' : '20px'}}>
        <span ><b>Status:</b> {editStatus && isOwner ?  ( status === null || status === "" ? <button onClick={activateStatus} className={button.button}> click here to add status </button> : null) : "no status"}</span>
        {editStatus ? (status === null || status === "" ? null :
         ( <span style={{ cursor: 'pointer' }}>
            {status}
            <button className={Button.button} onClick={activateStatus}>Изменить</button>
          </span>)
        ) : (
          <label htmlFor="status">
            <input
              onChange={onStatusChange}
              autoFocus={true}
              onBlur={diactivateStatus}
              name="status"
              value={statusProfile}
              type="text"
            />
            <button className={Button.button} onClick={diactivateStatus}>Сохранить</button>
          </label>
        )}
      </div>
    </>
  );
};
export default ProfileStatus;
