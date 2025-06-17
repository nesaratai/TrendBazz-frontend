import { useContext } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.username}!</h2>
      <p>Name: {user.fname} {user.lname}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Email: {user.emailaddress}</p>
      <h2>Orders</h2>
      {/* add more profile details here */}
    </div>
  );
};

export default Profile;