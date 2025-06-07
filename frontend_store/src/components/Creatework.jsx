import React from 'react'
import WorkerForm from '../components/WorkerForm';
import { useNavigate } from 'react-router-dom';

const Creatework = () => {
  const navigate = useNavigate();
  return <WorkerForm mode="create" onSuccess={() => navigate('/workerdashboard')}/>;
}

export default Creatework
