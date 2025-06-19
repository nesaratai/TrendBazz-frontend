import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { UserContext, UserProvider } from '../../contexts/UserContext';
import { singleUser } from '../../services/userService';
const Profile = () => {
  const { user } = useContext(UserContext);
  const defaultsingleUserProfile = {
    username: null,
    fname: null,
    lname: null,
    dob: null,
    email: null,
  };
  const [singleUserProfile, setSingleUserProfile] = useState(defaultsingleUserProfile);


  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  //
  useEffect(()=>{
 if (user) {
    async function getSingleUser() {
      const meatPuppet = await singleUser(user._id)
      setSingleUserProfile({...defaultsingleUserProfile, ...meatPuppet})
    }
    getSingleUser(); 
 }
  },[user])
  return (
    <div className="container mt-4">
      <h2>Welcome, {singleUserProfile.username}!</h2>
      <p>Name: {singleUserProfile.fname} {singleUserProfile.lname}</p>
      <p>Date of Birth: {singleUserProfile.dob}</p>
      <p>Email: {singleUserProfile.email}</p>
      <h2>Orders</h2>
      {/* add more profile details here */}
      
    </div>
  );
};

export default Profile;