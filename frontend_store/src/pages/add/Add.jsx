import React, { useReducer, useState,useEffect } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate,useLocation } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
 
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig, { withCredentials: true});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });

      setUploading(false);

      mutation.mutate(
        { ...state, cover, images },
        {
          onSuccess: () => {
            navigate("/seller");
          },
          onError: (err) => {
            console.error("Error creating gig:", err);
            alert("Something went wrong while creating the gig.");
          },
        }
      );
    } catch (err) {
      setUploading(false);
      console.error("Upload error:", err);
      alert("Image upload failed. Try again.");
    }
  };
  const [data, setData] = useState({
  cat: "",
  customService: "",
  // other fields...
});
const handleOtherChange = (e) => {
  const { name, value } = e.target;

  // update UI state
  setData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // update gig state if needed
  dispatch({
    type: "CHANGE_INPUT",
    payload: { name, value },
  });
};



  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label>Category</label>
           
            <select name="category" id="category" onChange={(e) => {
                          handleChange(e);       // updates the reducer state
                          handleOtherChange(e);  // updates local UI state
                        }}>
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
                  <option value="event help">Event Help</option>
                  <option value="computerrepair">Computer/IT Repair</option>
                  <option value="cctv">CCTV Installation</option>
                  <option value="other">Other (Specify Below)</option>
                </select>

                {data.category === "other" && (
                  <div className="custom-service-input">
                    <label>Please specify the service</label>
                    <input
                      type="text"
                      name="customService"
                      placeholder="e.g. Satellite Dish Installation"
                      onChange={handleOtherChange}
                    />
                  </div>
                )}


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
              name="description"
              placeholder="Brief description to introduce your service to customers"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Uploading..." : "Create"}
            </button>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              rows="10"
              onChange={handleChange}
            ></textarea>

            <label>Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />

            <label>Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />

            <label>Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
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
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
