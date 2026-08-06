import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/WorkerForm.css";

const WorkerForm = ({ mode, workerData, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: '',
    bio: '',
    skills: '',
    price: '',
    location: '',
    pincode: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [bannerPic, setBannerPic] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && workerData) {
      setForm({
        fullName: workerData.fullName || '',
        bio: workerData.bio || '',
        skills: (workerData.skills || []).join(',') || '',
        price: workerData.price || '',
        location: workerData.location || '',
        pincode: workerData.pincode || '',
      });
    }
  }, [mode, workerData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("skills", form.skills); // comma separated
      
      console.log("profilePic", profilePic);
      console.log("bannerPic", bannerPic);

      if (profilePic) formData.append("profilePic", profilePic);
      if (bannerPic) formData.append("bannerPic", bannerPic);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (mode === 'create') {
        await axios.post('http://localhost:5555/api/works', formData, config);
      } else {
        await axios.put(`http://localhost:5555/api/works/${workerData._id}`, formData, config);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving worker:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />

      <label>Upload Profile Picture</label>     
      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePic)} />

      <label>Upload Banner Picture</label>
      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBannerPic)} />
      

      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio/Skills" required />
      <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
      <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />

      <button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Worker</button>
    </form>
  );
};

export default WorkerForm;

// import React,{useState, useEffect} from 'react'
// import axios from 'axios';
// import "../styles/WorkerForm.css";

// const WorkerForm = ({mode, workerData, onSuccess }) => {
//   const[form, setForm] = useState({
//     fullName: '',
//     profilePic: '',
//     bannerPic: '',
//     bio: '',
//     skills: '',
//     price: '',
//     location: '',
//     pincode: '',
//   });

//   useEffect(() => {
//     if(mode === 'edit' && workerData){
//       setForm(workerData);
//     }
//   },[mode, workerData]);

//   const handleChange = e => {
//     setForm({ ...form,[e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try{
//       if (mode === 'create'){
//         await axios.post('/api/works', {...form,skills: form.skills.split(',')});
//       }else{
//         await axios.put(`/api/works/${workerData._id}`,form);
//       }
//       onSuccess();
//     }catch(error){
//       console.error('Error saving worker:',error);
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
//       <input name="profilePic" value={form.profilePic} onChange={handleChange} placeholder="Profile Picture URL" />
//       <input name="bannerPic" value={form.bannerPic} onChange={handleChange} placeholder="Banner Picture URL" />
//       <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio/Skills" />
//       <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
//       <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
//       <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
//       <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
//       <button type="submit">{mode === 'edit' ? 'Update' : 'Create'} Worker</button>
//     </form>
//   )
// }

// export default WorkerForm
