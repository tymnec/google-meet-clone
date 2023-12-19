import { Button } from "@/components/ui/button";
import React from "react";

const JoinMeet = () => {
  return (
    <div className="mx-20 " style={{marginTop:'150px'}}>
      {/* heading */}
      <div>
      <h1 style={{fontSize:'40px',fontWeight:'50px'}}>Secure video conferencing for everyone</h1>
      </div>
      {/* sub-heading */}
      <div>
      <h3 style={{fontSize:'17px',color:'grey',marginTop:'15px',marginBottom:'100px'}}>
        Connect, collaborate, and celebrate from anywhere with Google Meet
      </h3>
      </div>
      <div className="d-flex">

      {/* new meeting button */}
       <Button >New meeting</Button>
      {/* MEETING CODE INPUT */}
    <input className="mx-3" type="text" placeholder="Enter a code or nickname"/>
      {/* Join button */}
       <button>Join</button>
      </div> 

      {/* Learn more */}
      <span>
      <a
        href="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
      >
        Learn more
      </a>
       <span className="mx-1">about Google Meet</span> 
      </span>
    </div>
  );
};

export default JoinMeet;
