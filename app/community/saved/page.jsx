import Saved from "@/components/Community/Saved";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

function page() {
  return (
    <>
      <div className="fixed z-10">
        <Navbar />
      </div>
      <Saved/>
    </>
  );
}

export default page;
