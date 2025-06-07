import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const BecomeMate = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'client') {
      navigate('/clientdashboard');
    } else if (user.role === 'worker') {
      navigate('/workerdashboard');
    }
  }, [user]);

  const handleRoleSelect = async (role) => {
    try {
       const res = await axios.put('http://localhost:5555/auth/setrole', {
      role,
    }, {
      withCredentials: true,
    });

      const updatedUser = { ...user, role };
      setUser(updatedUser);

      if (role === 'client') navigate('/clientdashboard');
      else if (role === 'worker') navigate('/workerdashboard');
    } catch (err) {
      alert('Failed to set role');
    }
  };

  return (
    <div className="popup-container">
      {showPopup && (
        <div className="popup-box">
          <h2>Select Your Role</h2>
          <button onClick={() => handleRoleSelect('client')}>Become Client</button>
          <button onClick={() => handleRoleSelect('worker')}>Become Worker</button>
        </div>
      )}
    </div>
  );
};

export default BecomeMate;
