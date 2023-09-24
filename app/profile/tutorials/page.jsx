import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import ShowUserTutorials from "@/components/ShowDesignPosts/ShowUserTutorials";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-[250px]">
          <Profile />
        </div>
        <div className="ms-4 w-full">
          <ShowUserTutorials />
        </div>
      </div>
    </div>
  );
}

export default page;
