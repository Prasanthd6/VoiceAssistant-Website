import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import WorkerForm from '../components/WorkerForm';

const Editwork = () => {

  const {id } = useParams();
  const [worker, setworker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/works/${id}`).then(res => setworker(res.data));
  }, [id]);

  return worker ? <WorkerForm mode="edit" workerData={worker} onSuccess={() => navigate('/')} /> : <p>Loading...</p>;

}

export default Editwork
