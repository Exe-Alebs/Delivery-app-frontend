import React, { useEffect, useState } from "react";
import { getUser } from "../services/authservice";
import "./profilepage.scss";
import useAuth from "../config/hooks/useAuth";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuth;

  useEffect(() => {
    getUser(user._id).then((user) => {
      setUserData(user);
    });
  }, [user._id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-details">
        <p>
          <strong>First Name:</strong> {userData.firstName}
        </p>
        <p>
          <strong>Second Name:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(userData.createdOn).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
