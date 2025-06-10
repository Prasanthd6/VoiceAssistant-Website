import React, { useEffect, useState } from "react";
import "./Gigs.css";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";


function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    rating: "",
  });
  

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const keyword = query.get("search");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", filters, sort, keyword],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?search=${keyword}&sort=${sort}&location=${filters.location}&experience=${filters.experience}&rating=${filters.rating}`
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [sort, filters,keyword]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

const navigate =useNavigate();
  const [input, setInput] = useState(keyword || "");
  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Domate &gt; Services &gt;</span>
        <div className="search">
            <div className="searchInput">
              <input
              id="search"
                type="text"
                value={input}
                placeholder="Search by service, skills"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                height: "40px",
                cursor: "pointer",
                borderRadius: "15px",
              }}
            >
              <CiSearch size={30} /> Search
            </button>
          </div>
        <h1>Results for '{keyword || "All Services"}'</h1>
        <p>Find skilled professionals and reliable help near you.</p>

        <div className="menu">
          <div className="left">
            <label>Location</label>
            <select name="location" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>

            <label>Experience</label>
            <select name="experience" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>

            <label>Rating</label>
            <select name="rating" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="5">5 ★</option>
              <option value="4">4 ★ & Up</option>
              <option value="3">3 ★ & Up</option>
            </select>
          </div>

          <div className="right">
            <span className="sortBy">Sort by:</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : sort === "createdAt" ? "Newest" : "Popular"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("createdAt")}>Newest</span>
                <span onClick={() => reSort("popular")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;

