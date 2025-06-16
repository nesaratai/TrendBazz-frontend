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
      <p>Email: {user.email}</p>
      {/* add more profile details here */}
    </div>
  );
};

export default Profile;