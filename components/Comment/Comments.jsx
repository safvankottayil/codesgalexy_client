import React, { useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { BsFlag } from "react-icons/bs";
import userAxios from "@/Axios/client";
import Cookies from "js-cookie";
import CommentReport from "../Report/CommentReport";
function Comments({ item, design_id, Update, count }) {
  const [text,SetText]=useState(item.comment.comment)
  const EditInputRef = useRef(null);
  const token = Cookies.get("token");
  const [deleteShow, SetdeleteShow] = useState(0);
  const [reportModal, SetreportModal] = useState(false);
  const [isedit, SetIsEdit] = useState(false);
  async function isUser(id, comment_id) {
    try {
      if (deleteShow == 0) {
        const res = await userAxios.get(
          `/isUser?id=${id}&comment_id=${comment_id}&design_id=${design_id}`,
          { headers: { Authorization: token } }
        );
        if (res.data.status) {
          SetdeleteShow(1);
        } else {
          if (res.data.type == "user") {
            if (res.data.isreported) {
              SetdeleteShow(3);
            } else {
              SetdeleteShow(2);
            }
          }
        }
      } else {
        SetdeleteShow(0);
      }
    } catch (err) {}
  }
  async function DeleteComment(id) {
   
    const res = await userAxios.delete(
      `/deleteComment?comment_id=${id}&design_id=${design_id}`
    );
    if (res.data.status) {
      Update(count + 1);
    }
  }
  async function CommentSave(id) {
    try {
      const comment = EditInputRef.current.value;
      if (comment == "") {
        EditInputRef.current.style.borderColor = "red";
      } else {
        const res = await userAxios.patch("/commentEdit", {
          design_id,
          comment_id: id,
          comment,
        },{headers:{Authorization:token}});
        if (res.data.status) {
          Update(count + 1)
          SetIsEdit(false)
        } else {
          alert("error");
        }
      }
    } catch (err) {}
  }
  return (
    <>
      {reportModal ? (
        <CommentReport
          design_id={design_id}
          id={item.comment._id}
          update={SetreportModal}
        />
      ) : (
        ""
      )}
      <div key={item.comment._id} className="col-span-1 mt-3 mb-3 flex justify-end  mr-5">
        {item.user.image ? (
          <img
            src={item.user.image}
            className="w-14 h-14 bg-black rounded-full"
          />
        ) : (
          <div className="w-14 h-14 bg-black rounded-full"></div>
        )}
      </div>

      <div className="col-span-10 mt-3 flex flex-col">
        <p className="capitalize font-semibold">
          <span>@{item.user.name}</span>
          <span className="text-[10px] pl-2 text-gray-500 lowercase">
            {" "}
            2 weeks ago
          </span>{" "}
        </p>
        {isedit ? (
          <div className="flex flex-col">
            <textarea
              ref={EditInputRef}
              onChange={(e)=>SetText(e.target.value)}
              onMouseOver={() => {
                EditInputRef.current.style.borderColor = "white";
              }}
              className="capitalize border-2 rounded-md focus:outline-blue-300 pl-2  bg-slate-200"
            >
              {text}
            </textarea>
            <span className="flex justify-end">
              <button
                onClick={() => SetIsEdit(false)}
                className="text-black    px-2 py-1 hover:bg-slate-300 rounded-xl m-1 text-lg capitalize font-bold  "
              >
                cancel
              </button>
              <button
                onClick={() => CommentSave(item.comment._id)}
                className="text-blue-400 px-2 py-1 hover:bg-slate-300 rounded-xl m-1 text-lg capitalize font-bold"
              >
                save
              </button>
            </span>
          </div>
        ) : (
          <p className="break-all capitalize">{item.comment.comment}</p>
        )}
      </div>
      <div className="col-span-1 mt-3 relative ">
        <div
          onClick={() => isUser(item.comment.UserId, item.comment._id)}
          className="flex justify-center rounded-full items-center h-7 w-7 hover:bg-slate-400"
        >
          <CiMenuKebab />
        </div>
        {deleteShow == 1 ? (
          <div className="absolute top-2 left-7 bg-gray-200 rounded-lg flex flex-col w-24">
            <span
              onClick={() => {
                SetdeleteShow(0), SetIsEdit(true)
              }}
              className="flex  "
            >
              <LuClipboardEdit className="h-5 w-5 mt-1 ml-2" />
              <span className="mt-1 ml-1">Edit</span>
            </span>
            <span
              onClick={() => { SetdeleteShow(0),DeleteComment(item.comment._id)}}
              className="flex "
            >
              <MdDelete className="h-6 w-6 mt-1 ml-1" />
              <span className="mt-1 ml-1">Delete</span>
            </span>
          </div>
        ) : deleteShow == 2 ? (
          <div className="absolute top-2 left-7 bg-gray-200 rounded-lg flex flex-col w-24">
            <span
              onClick={() => {
                SetreportModal(true);
              }}
              className="flex my-1 "
            >
              <BsFlag className="h-5 w-5 mt-1 ml-2" />
              <span className="mt-1 ml-1">Report</span>
            </span>
          </div>
        ) : deleteShow == 3 ? (
          <div className="absolute top-2 left-7 bg-gray-200 rounded-lg flex flex-col w-24">
            <span className="flex my-1 ">
              <BsFlag className="h-5 w-5 mt-1 ml-1" />
              <span className="mt-0 ml-1">Reported</span>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Comments;
