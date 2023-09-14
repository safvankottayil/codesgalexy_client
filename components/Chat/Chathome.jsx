"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserAxios from "@/Axios/client";
import { BsFillSendFill, BsSearch } from "react-icons/bs";

import Cookies from "js-cookie";
import "./style.css";
import { useRef } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function Chathome() {
  const image = useSelector((state) => state.Client.Image);
  const msgScroll = useRef(null);
  const token = Cookies.get("token");
  const [UserId, SetuserID] = useState("");
  const [myId, setMyId] = useState("");
  const [User, SetUser] = useState({});
  const [users, setusers] = useState([]);
  const [socket, Setsocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomId, SetRoomID] = useState("");
  const search = useRef(null);
  const msg = useRef(null);
  const router=useRouter()
  useEffect(() => {
    if (messages[0]) {
      msgScroll.current.scrollTop = msgScroll.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    UserAxios.get("/chat/users", { headers: { Authorization: token } }).then(
      (res) => {
        if (res.data.status) {
          setusers(res.data.Users);
          setMyId(res.data.UserID);
        }else{
          if(res.data.type=='user'){
            router.push('/?login=true')
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (UserId) {
      const newSocket = io("https://codesgalaxy/chat");
      Setsocket(newSocket);
      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [UserId]);
  useEffect(() => {
    if (socket) {
      let roomid;
      UserAxios.get("/chat?id=" + UserId, {
        headers: { Authorization: token },
      }).then((res) => {
        if (res.data.status) {
          setMessages(res.data.messages);
          SetRoomID(res.data.ChatId);
          roomid = res.data.ChatId;
          socket.emit("joinRoom", res.data.ChatId);
        }
      });

      socket.on("message", (message, v) => {
        if (v == roomid) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
      socket.on("error", (err) => {
        console.log("error", err);
      });
    }
  }, [socket]);

  function SendMsg() {
    const message = msg.current.value;
    socket.emit("chatMessage", roomId, {
      text: message,
      ID: myId,
      timestamp: new Date(),
    });
  }
  function SearchUsers() {
    const char=search.current.value
    UserAxios.get('/chat/usersearch?char='+char,{headers:{Authorization:token}}).then((res)=>{
      if(res.data.status){
      setusers(res.data.Users)
      }else{

      }
    })
  }
  return (
    <div className="bg-black h-screen pt-16 fixed flex w-full z-20">
      <div className="grid grid-cols-12 w-full">
        <div className="col-span-3 flex flex-col  bg-emerald-100">
          <div className="w-full relative px-2 border-b-[1px] border-slate-400 pb-2 mt-2">
            <input
              ref={search}
              onChange={SearchUsers}
              type="text"
              className="flex h-10 text-base focus:outline-none border-[1px] border-slate-500 pl-5 rounded-md  w-full"
            />
            <BsSearch className="absolute right-5 top-2 h-6 text-slate-400 w-6"/>
          </div>
          <div className="h-[82vh] overflow-y-scroll">
            {users.map((v) => {
              if (myId != v._id) {
                return (
                  <div
                    onClick={() => {
                      SetuserID(v._id), SetUser(v);
                    }}
                    className="w-full border-b-[1px] border-slate-300"
                  >
                    <div className="flex">
                      <img
                        src={v.image}
                        className="w-12 my-2 ml-2 bg-black rounded-full h-12"
                        alt="ds"
                      />
                      <div className="flex flex-col relative pl-1 mt-3">
                        <span className="font-bold capitalize">{v.name}</span>
                        <span className="text-sm absolute top-4 font-medium ">
                          {v.email}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-span-9 flex flex-col relative bg-yellow-200">
          {UserId ? (
            <>
              <div className="w-full flex h-fit row-span-1  bg-emerald-200">
                <img
                  src={User.image}
                  className="w-14 my-2 ml-2 mb-2 bg-black rounded-full h-14"
                  alt="ds"
                />
                <div className="flex flex-col relative pl-1 mt-3">
                  <span className="font-bold">{User.name}</span>
                  <span className="text-sm absolute top-4 font-medium ">
                    {User.email}
                  </span>
                </div>
              </div>
              <div
                ref={msgScroll}
                className="bg-emerald-100  flex flex-col flex-grow h-[70vh] overflow-y-scroll "
              >
                {messages.map((text, i) => {
                  let reversedDate = null;
                  let prev = messages[i - 1]?.timestamp.slice(0, 10);
                  let date = text.timestamp?.slice(0, 10);
                  const time = text.timestamp?.slice(11, 16);

                  if (prev == date) {
                  } else {
                    const parts = date?.split("-");
                    const reversedParts = parts?.reverse();
                    reversedDate = reversedParts?.join("-");
                  }

                  console.log(reversedDate);
                  return (
                    <>
                      {reversedDate ? (
                        <div className="flex justify-center  text-sm font-semibold">
                          <i
                            className="px-3 py-1 bg-emerald-300
                         rounded-xl mt-1"
                          >
                            {reversedDate}
                          </i>
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        className={`${
                          text.ID == myId ? "flex-row-reverse" : ""
                        } flex mt-2 justify-start h-fit relative`}
                      >
                        <img
                          src={text.ID == myId ? image : User.image}
                          className="w-12 h-12 mx-2 rounded-full bg-black"
                          alt=""
                        />
                        <div
                          className={`p-2 pb-0 h-fit ${
                            text.ID == myId ? "ml-16" : "mr-20"
                          }   bg-emerald-300 text-black px-3  rounded-md relative`}
                        >
                          {text.text}
                          <br />
                          <span className="text-xs ">{time}</span>
                        </div>
                      </div>
                    </>
                  );
                })}

                {/*  */}
              </div>
              <div className="w-full px-5 py-2 row-span-1 relative bg-emerald-200 ">
                <input
                  ref={msg}
                  type="text"
                  className="w-full h-12 pl-4  rounded-md"
                />
                <div
                  onClick={SendMsg}
                  className="p-2 w-fit rounded-xl absolute z-10 hover:bg-gray-400 right-6 top-3"
                >
                  <BsFillSendFill className="w-6 h-6" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-[92vh] bg-emerald-100 flex justify-center items-center">
              <div className="relative">
                <BiMessageDetail className="w-20 h-20" />
                <BiMessageDetail className="w-20 h-20 -top-5 left-[70px] absolute" />
                <p className="font-semibold text-lg text-slate-700">
                  Select Your User
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chathome;
