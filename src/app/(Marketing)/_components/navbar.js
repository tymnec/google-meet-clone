import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      {/* Section First */}
      <div className="ml-4 flex" >
       <img src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" alt="" />
      <span className="text-[24px]  ml-1 font-normal text-slate-600 ">Meet</span>
      </div>
      {/* Section Second */}
      <div className="flex gap-3 mx-2 place-items-center">
        {/* TODO: REAL TIME CLOCK */}
        <div>
          {/* Clock */}
          Clock
        </div>
        <div>
          {/* Support Button */}
          Support Button
        </div>
        <div>
          {/* Report Button */}
          Report Button
        </div>
        <div>
          {/* Setting Button */}
          Setting
        </div>
        <div>
          {/* Profile Menu */}
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
