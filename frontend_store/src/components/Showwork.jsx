// import React,{useEffect, useState} from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import Backbutton from './common/Backbutton'
// import Spinner from './Spinner'
// import { response } from 'express'

// const Showwork = () => {
//   const [work,setWork] = useState({});
//   const [loading, setLoading] = useState(false);
//   const {id} = useParams();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/works/${id}`)
//       .then((response) => {
//         setWork(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [])

//   return (
//     <div>
//       <Backbutton/>
//       <h1>ShowWork</h1>
//       {loading ? ( <Spinner/>) :(
//         <div>
//             <div>
//               <span>Id</span>
//               <span>{work._id}</span>
//             </div>
//             <div>
//               <span>Title</span>
//               <span>{work.title}</span>
//             </div>
//             <div>
//               <span>FullName</span>
//               <span>{work.fullName}</span>
//             </div>
//             <div>
//               <span>Pincode</span>
//               <span>{work.pincode}</span>
//             </div>
//             <div>
//               <span>Created Time</span>
//               <span>{new Date(work.createdAt).toString()}</span>
//             </div>
//             <div>
//               <span>Last Update</span>
//               <span>{new Date(work.updatedAt).toString()}</span>
//             </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Showwork
import React from 'react'

const Showwork = () => {
  return (
    <div>
      
    </div>
  )
}

export default Showwork
