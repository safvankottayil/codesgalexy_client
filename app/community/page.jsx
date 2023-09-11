import CommunityHome from "@/components/Community/CommunityHome";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

function page() {
  return (
    <>
      <div className="fixed z-10">
        <Navbar />
      </div>
      <CommunityHome/>
    </>
  );
}

export default page;
