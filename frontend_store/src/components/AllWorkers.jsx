import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WorkerCard from '../components/common/WorkerCard';

const AllWorkers = () => {
  const [workers, setworkers] = useState([]);

  const fetchWorkers = async () =>{
    const res = await axios.get('http://localhost:5555/api/works');
    setworkers(res.data.data);
  }

  useEffect(() => {
    fetchWorkers();
  })
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {workers.map(worker => (
        <WorkerCard key={worker._id} worker={worker} />
      ))}
    </div>
    // <div>

    //   <h2>All Workers</h2>
    //   {workers.map(worker => (
    //     <div key={worker._id}>
    //       <div>favorite</div>
    //       <img src={worker.bannerPic} alt={worker.fullName} />
    //       <h3>{worker.fullName}</h3>
    //       <img src={worker.profilePic} alt="profile" />
    //       <p>{worker.bio}</p>
    //       <p>{worker.price}</p>
    //       <p>{worker.location}</p>
    //       <p>{worker.pincode}</p>
    //     </div>
    //   ))}
    // </div>
  )
}

export default AllWorkers
