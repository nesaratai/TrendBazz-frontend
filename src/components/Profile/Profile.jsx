import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { UserContext, UserProvider } from '../../contexts/UserContext';
import { singleUser } from '../../services/userService';
import { getUserOrders } from '../../services/orderService';
import { Table } from 'react-bootstrap';
import './Profile.css'
const Profile = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
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


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getUserOrders(user._id);
        setOrders(orders);
      } catch (err) {
        console.error('Failed to load orders:', err.message);
      }
    };
  
    if (user?._id) fetchOrders();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Welcome, {singleUserProfile.username}!</h2>
      <p>Name: {singleUserProfile.fname} {singleUserProfile.lname}</p>
      <p>Date of Birth: {singleUserProfile.dob}</p>
      <p>Email: {singleUserProfile.email}</p>
      <h4 className="mt-5">My Orders</h4>
      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Profile;