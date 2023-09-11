import ShowDocuments from "@/components/Learn/ShowDocuments";
import SideBar from "@/components/Learn/SideBar";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div className="flex">
      <SideBar/>
       <ShowDocuments/>
      </div>
    </div>
  );
}

export default page;
