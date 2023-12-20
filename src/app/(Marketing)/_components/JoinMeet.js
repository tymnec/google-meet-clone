import { Button } from "@/components/ui/button";
import { MdOutlineVideoCall } from "react-icons/md";
import React from "react";

const JoinMeet = () => {
  return (
    <div className=" mt-[180px] ml-12 ">
      {/* heading */}
      <div>
        <div className="text-[44px] ">
          Secure video conferencing for everyone
        </div>
      </div>

      {/* sub-heading */}
      <div>
        <div className=" text-slate-500 mt-5 mb-[40px] text-xl ">
          Connect, collaborate, and celebrate from anywhere with Google Meet
        </div>
      </div>

      <div className="flex">
        {/* new meeting button */}
        <button className=" bg-blue-500 p-3 rounded flex gap-2 text-white font-bold place-items-center">
          <MdOutlineVideoCall size={30} />
          New meeting
        </button>
        {/* MEETING CODE INPUT */}
        <input
          className="mx-3 p-4 pr-0 border-slate-500 rounded border-2  h-[50px] focus:border-sky-500"
          type="text"
          placeholder="Enter a code or nickname"
        />
        {/* Join button */}
        <button className=" text-slate-300 ">Join</button>
      </div>
      {/* Break Line */}
      <div className="my-4 border-slate-300 max-w-sm  border-b-2  "></div>
      {/* Learn more */}
      <span>
        <a
          className="text-blue-500"
          href="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
        >
          Learn more
        </a>
        <span className="mx-1 text-slate-600">about Google Meet</span>
      </span>
    </div>
  );
};

export default JoinMeet;
