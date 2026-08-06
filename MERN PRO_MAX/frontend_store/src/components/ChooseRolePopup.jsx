// import React,{useContext} from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';


// const ChooseRolePopup = () => {
//   const navigate = useNavigate();
//   const {user , setUser} = useContext(AuthContext);

//   const handleChoose = async (role) => {
//     try{
     
//       await axios.put('http://localhost:5555/auth/setrole', {role}, {withCredentials: true});
//       // window.location.reload(); // Refresh or navigate
//       setUser(prevUSer => ({ ...prevUSer, role}));
//       navigate(`/${role}dashboard`);
//       // navigate('/clientdashboard');
//     } catch (err) {
//       console.error(err);
//     }
//     }
  
//   return (
//     <div>
//       <h2>Choose Your Role</h2>
//       <button onClick={() => handleChoose("client")}>Become a Client</button>
//       <button onClick={() => handleChoose("worker")}>Become a Worker</button>
//     </div>
//   )
// }

// export default ChooseRolePopup;
