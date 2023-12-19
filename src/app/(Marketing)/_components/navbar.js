import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      {/* Section First */}
      <div>{/* TODO : Logo */} Logo</div>
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
