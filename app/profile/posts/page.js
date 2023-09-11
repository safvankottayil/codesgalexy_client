import React from "react";

import ShowDesignPosts from "@/components/ShowDesignPosts/ShowDesignPosts";
import Profile from "@/components/Profile/Profile";
import Navbar from "@/components/Navbar/Navbar";
function page() {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="flex">
          <div className="w-[250px]">
            <Profile />
          </div>
          <ShowDesignPosts />
        </div>
      </div>
    </>
  );
}

export default page;
