import React from "react";
import Navbar from "./_components/navbar";
import JoinMeet from "./_components/JoinMeet";
import Carousel from "./_components/Carousel";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="">
     <JoinMeet/>
     <Carousel/>
      </div>
    </div>
  );
};

export default Home;
