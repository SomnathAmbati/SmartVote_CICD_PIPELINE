import React from 'react';
//import { useHistory } from 'react-router-dom';

const Profile = () => {
  // Remove unused variables
  // const history = useHistory();

  const userInfor = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {userInfor !== null ? (
        <div className="card" style={{ padding: '10px' }}>
          <p style={{ textAlign: 'center', fontSize: "14px" }}>
            <b>{userInfor.firstname}</b>
          </p>
          {/* Add alt prop for the img element */}
          <img
            src={userInfor.pic}
            alt="Profile"
            style={{ height: '140px', width: '140px', borderRadius: '50%', marginLeft: '4%', marginBottom: '10px' }}
          />
          <p>
            <b>Name : </b>
            {userInfor.firstname} {userInfor.lastname}
          </p>
          <p>
            <b>Branch : </b>
            {userInfor.branch}
          </p>
          <p>
            <b>Reg.No : </b>
            {userInfor.mobile}
          </p>
          <p>
            <b>City : </b>
            {userInfor.city}
          </p>
          <p>
            <b>State : </b>
            {userInfor.stateName}
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
