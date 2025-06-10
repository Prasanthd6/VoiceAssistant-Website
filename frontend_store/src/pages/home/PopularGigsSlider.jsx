import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Slide from "../../components/slide/Slide";
import GigCard from "../../components/gigCard/GigCard";

const categories = ["gardening", "painter", "carpenter", "cleaning"];

const PopularGigsSlider = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularGigs"],
    queryFn: () =>
      newRequest
        .get("/gigs")
        .then((res) =>
          res.data.filter((gig) => categories.includes(gig.category))
        ),
  });

  if (isLoading) return <div>Loading gigs...</div>;
  if (error) return <div>Failed to load gigs</div>;

  return (
    <Slide slidesToShow={4} arrowsScroll={4}>
      {data.map((gig) => (
        <GigCard key={gig._id} item={gig} />
      ))}
    </Slide>
  );
};

export default PopularGigsSlider;
