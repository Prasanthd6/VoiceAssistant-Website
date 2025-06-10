// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";

// const UpdateGig = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [gigData, setGigData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     price: "",
//     shortTitle: "",
//     shortDesc: "",
//     deliveryDate: "",
//     revisionNumber: "",
//     features: [],
//     cover: "",
//     images: [],
//     cat: "",
//   });

//   useEffect(() => {
//     const fetchGig = async () => {
//       try {
//         const res = await newRequest.get(`/gigs/single/${id}`);
//         setGigData(res.data);
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch gig:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGig();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await newRequest.put(`/gigs/${id}`, formData);
//       alert("Gig updated successfully!");
//       navigate("/mygig");
//     } catch (err) {
//       console.error("Failed to update gig:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="updateGig">
//       <h2>Update Gig</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="title" value={formData.title} onChange={handleChange} placeholder="Gig Title" />
//         <input name="shortTitle" value={formData.shortTitle} onChange={handleChange} placeholder="Short Title" />
//         <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" />
//         <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" />
//         <button type="submit">Update Gig</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateGig;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./UpdateGig.css";

// const UpdateGig = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     price: "",
//     shortTitle: "",
//     shortDesc: "",
//     deliveryDate: "",
//     revisionNumber: "",
//     features: [],
//     cover: "",
//     images: [],
//     cat: "",
//   });

//   useEffect(() => {
//     const fetchGig = async () => {
//       try {
//         const res = await newRequest.get(`/gigs/single/${id}`);
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch gig:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGig();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await newRequest.put(`/gigs/${id}`, formData);
//       alert("Gig updated successfully!");
//       navigate("/mygig");
//     } catch (err) {
//       console.error("Failed to update gig:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="gig">
//       <div className="container">
//         <div className="left">
//           <span className="breadcrumbs">Fiverr {">"} My Gigs {">"} Update</span>
//           <h1>Update Gig</h1>

//           <form onSubmit={handleSubmit} className="updateForm">
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Gig Title"
//             />
//             <input
//               type="text"
//               name="shortTitle"
//               value={formData.shortTitle}
//               onChange={handleChange}
//               placeholder="Short Title"
//             />
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="Price"
//             />
//             <textarea
//               name="desc"
//               value={formData.desc}
//               onChange={handleChange}
//               placeholder="Description"
//               rows="6"
//             />
//             <input
//               type="text"
//               name="shortDesc"
//               value={formData.shortDesc}
//               onChange={handleChange}
//               placeholder="Short Description"
//             />
//             <input
//               type="text"
//               name="deliveryDate"
//               value={formData.deliveryDate}
//               onChange={handleChange}
//               placeholder="Delivery Days"
//             />
//             <input
//               type="text"
//               name="revisionNumber"
//               value={formData.revisionNumber}
//               onChange={handleChange}
//               placeholder="Revisions"
//             />
//             <input
//               type="text"
//               name="cover"
//               value={formData.cover}
//               onChange={handleChange}
//               placeholder="Cover Image URL"
//             />
//             <input
//               type="text"
//               name="cat"
//               value={formData.cat}
//               onChange={handleChange}
//               placeholder="Category"
//             />
//             <button type="submit">Update Gig</button>
//           </form>
//         </div>

//         <div className="right">
//           <div className="price">
//             <h3>{formData.shortTitle}</h3>
//             <h2>$ {formData.price}</h2>
//           </div>
//           <p>{formData.shortDesc}</p>
//           <div className="details">
//             <div className="item">
//               <img src="/img/clock.png" alt="" />
//               <span>{formData.deliveryDate} Days Delivery</span>
//             </div>
//             <div className="item">
//               <img src="/img/recycle.png" alt="" />
//               <span>{formData.revisionNumber} Revisions</span>
//             </div>
//           </div>
//           <div className="features">
//             {formData.features?.map((feature, index) => (
//               <div className="item" key={index}>
//                 <img src="/img/greencheck.png" alt="" />
//                 <span>{feature}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateGig;




import React, { useEffect, useReducer, useState } from "react";
import "./UpdateGig.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const UpdateGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await newRequest.get(`/gigs/single/${id}`);
        const data = res.data;

        dispatch({ type: "SET_ALL", payload: data });
      } catch (err) {
        console.error("Failed to fetch gig:", err);
      }
    };
    fetchGig();
  }, [id]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const cover = singleFile ? await upload(singleFile) : state.cover;
      const images = files.length
        ? await Promise.all([...files].map(upload))
        : state.images;

      const updatedGig = {
        ...state,
        cover,
        images,
      };

      await newRequest.put(`/gigs/${id}`, updatedGig);
      alert("Gig updated successfully!");
      navigate("/mygig");
    } catch (err) {
      console.error("Failed to update gig:", err);
      alert("Update failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Update Gig</h1>
        <div className="sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
            />

            <label>Category</label>
            <select name="cat" value={state.cat} onChange={handleChange}>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="cleaning">Home Cleaning</option>
                  <option value="acrepair">AC Repair & Services</option>
                  <option value="appliancerepair">Appliance Repair</option>
                  <option value="pestcontrol">Pest Control</option>
                  <option value="painter">Painter</option>
                  <option value="gardening">Gardening</option>
                  <option value="laundry">Laundry</option>
                  <option value="cooking">Cooking Help</option>
                  <option value="babysitting">Babysitting</option>
                  <option value="tutoring">Home Tutoring</option>
                  <option value="driver">Driver on Call</option>
                  <option value="moverpacker">Movers & Packers</option>
                  <option value="eventhelp">Event Help</option>
                  <option value="computerrepair">Computer/IT Repair</option>
                  <option value="cctv">CCTV Installation</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>

            <label>Description</label>
            <textarea
              name="desc"
              rows="16"
              value={state.desc}
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Uploading..." : "Update"}
            </button>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              value={state.shortTitle}
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDesc"
              value={state.shortDesc}
              rows="10"
              onChange={handleChange}
            ></textarea>

            <label>Delivery Time (days)</label>
            <input
              type="number"
              name="deliveryDate"
              value={state.deliveryDate}
              onChange={handleChange}
            />

            <label>Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              value={state.revisionNumber}
              onChange={handleChange}
            />

            <label>Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f} <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>Price</label>
            <input
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGig;
