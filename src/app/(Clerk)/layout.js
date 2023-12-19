import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const layout = ({ children }) => {
  return (
    <div>
      <div>
        {/* Back Button */}
        <Button variant="outline" className="my-2 absolute top-5 left-5">
          <Link href={"/"} className="flex place-items-center gap-2">
            <IoIosArrowBack />
            Back
          </Link>
        </Button>
      </div>
      <div className="flex justify-center h-screen place-items-center">
        {children}
      </div>
    </div>
  );
};

export default layout;
