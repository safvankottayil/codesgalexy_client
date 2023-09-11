import React, { useEffect, useRef } from "react";
// import {AiOutlineClose} from 'react-icons/ai'
import userAxios from "@/Axios/client";
import Cookies from "js-cookie";
function CommentReport({ update, design_id, id }) {
  const btnRef = useRef(null);
  const token = Cookies.get("token");
  useEffect(() => {
    btnRef.current.click();
  }, []);
  async function reportSubmit() {
    try {
      alert(1);
      const res = await userAxios.patch(
        "/commentReport",
        { id, design_id },
        { headers: { Authorization: token } }
      );
      if (res.data.status) {
      }
    } catch (err) {}
  }
  return (
    <div className="h-screen w-screen flex justify-center z-10 bg-black bg-opacity-50 top-0 left-0 fixed">
      <div className="bg-white rounded-md w-96 h-[270px] transition delay-1000 flex flex-col translate-y-2/4">
        <div className="flex justify-start font-bold pl-4 pt-2">
          Report Comment
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center mt-2 mb-2">
            <input
              ref={btnRef}
              className="h-5 w-5 ml-5 m-2 "
              name="report"
              type="radio"
            />
            <span className="font-semibold text-sm">
              Unwanted commercial content or spam
            </span>
          </div>
          <div className="flex items-center mb-2">
            <input className="h-5 w-5 ml-5 m-2 " name="report" type="radio" />
            <span className="font-semibold text-sm">Copy Right</span>
          </div>
          <div className="flex items-center mb-2">
            <input className="h-5 w-5 ml-5 m-2 " name="report" type="radio" />
            <span className="font-semibold text-sm">I just don't like it</span>
          </div>
          <div className="flex items-center mb-2">
            <input className="h-5 w-5 ml-5 m-2 " name="report" type="radio" />
            <span className="font-semibold text-sm">Other</span>
          </div>
          
          <div className="flex justify-end mt-2">
            <button
              onClick={() => update(false)}
              className="font-semibold px-2 py-1 mx-2 rounded-full hover:bg-slate-200 text-md"
            >
              Cancel
            </button>
            <button
              onClick={reportSubmit}
              className="text-blue-500 py-1 px-2 mx-2 rounded-full hover:bg-slate-300 text-md font-semibold"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentReport;
