import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-grow bg-gray-800 overflow-y-auto h-screen">
      <div className="flex flex-grow   mt-20">
        <div className="flex col-span-1 flex-grow justify-center ">
       
          <div className="bg-gray-700 rounded-md h-40 w-11/12"></div>
        </div>
        <div className="flex   col-span-1 flex-grow  justify-center">
          <div className="bg-gray-700 rounded-md h-40 w-11/12"></div>
        </div>
        <div className="flex   col-span-1 flex-grow  justify-center ">
          <div className="bg-gray-700 rounded-md h-40 w-11/12"></div>
        </div>
      </div>
      <div className="flex flex-col w-96 px-2">
        <div className="bg-gray-700 w-full  h-96 mt-20 rounded-md"></div>
         <div className="bg-gray-700 w-full  h-20 mt-2 rounded-md"></div>
      </div>
    </div>
  );
}

export default Dashboard;
