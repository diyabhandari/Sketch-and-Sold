import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import MyBids from '../components/myBids';
import Explore from '../components/explore';
import Header from '../components/header';
import Footer from '../components/footer';

const UserDashboard = () => {
  const { username } = useContext(UserContext); //access username from context

  return (
    <div className="dashboard-container">
      <Header/>
      <Explore />
      {/* Pass the username as a prop to MyBids */}
      <MyBids username={username} />
      <Footer />
    </div>
  );
};

export default UserDashboard;
