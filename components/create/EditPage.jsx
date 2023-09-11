"use client";
import React, { useEffect, useState } from "react";
import Title from "../EditComponents/Title";
import List from "../EditComponents/List";
import Paragraphs from "../EditComponents/Paragraphs";
import UserAxios from "@/Axios/client";
import ShowTitle from "../EditComponents/ShowTitle";
import ShowParagraphs from "../EditComponents/ShowParagraphs";
import { SaveTutorial } from "@/Services/client";

function Editpage({ Tutorial_id, pagename }) {
  const [count, SetCount] = useState(0);
  const [data, SetData] = useState([]);
  const [show, SetShow] = useState([]);
  const [UserShow, SetUserShow] = useState([]);

  useEffect(() => {
    UserAxios.get(`/page/${Tutorial_id}/${pagename}`).then((res) => {
      if (res.data.status) {
        // SetData(res.data.page.ShowPage.map((value)=>value.value.props.value))
        const promises = res.data.page.ShowPage.map((data, i) => {
          if (data.value.props.value.type == "title") {
            return new Promise((resolve, reject) => {
              resolve(Addtext(i, data.value.props.value));
            });
          } else if (data.value.props.value.type == "para") {
            return new Promise((resolve, reject) => {
              resolve(AddParagraph(i, data.value.props.value));
            });
          }
        });
        Promise.all(promises).then(res=>{
          SetShow(res)
        })
      }
    });
  }, []);

  function SetShowdeatieals() {
   
   const promises= data.map((value, i) => {
        if (value.type == "title") {
          return new Promise((resolve, reject) => {
            resolve(ShowText(i, value)); // Assuming ShowText returns something
          });
        } else if (value.type == "para") {
          return new Promise((resolve, reject) => {
            resolve(ShowParagraph(i, value));
          });
        }
      })
      Promise.all(promises).then(res=>{
        SetUserShow(res)
      })
  }
  function ShowText(index, value) {
    return { value: <ShowTitle key={index} value={value} /> }
    }
  
  function ShowParagraph(index, value) {
    return { value: <ShowParagraphs key={index} value={value} /> }
  }
  function Addtext(index, value) {
    return {value: (
        <Title
          key={index}
          data={data}
          value={value}
          Update={SetData}
          index={index}
        />
      )}
  }
  function AddList(index) {
    return {
      value: <List key={index} data={data} Update={SetData} index={index} />,
    };
  }
  function AddParagraph(index, value) {
    return {
      value: (
        <Paragraphs
          key={index}
          data={data}
          value={value}
          Update={SetData}
          index={index}
        />
      ),
    };
  }
  console.log(data);
  // save and submit
  async function SaveTutorials() {
    SetShowdeatieals();
    if (UserShow[0]) {
      console.log(UserShow,11);
      const data=await SaveTutorial(Tutorial_id,pagename,show,UserShow)
    }
  }
  return (
    <div className="grid grid-cols-10 w-full bg-black">
      <div className="col-span-8 pl-[36px] flex flex-col bg-white">
        {show.map((value) => {
          return value.value;
        })}
      </div>
      {/* Edit  buttons */}
      <div className="col-span-2 bg-emerald-50">
        <div>
          <button
            className="p-3 bg-yellow-300  "
            onClick={() => {
              SetShow([...show, Addtext(show.length)]);
            }}
          >
            T
          </button>

          <button
            className="p-3 bg-yellow-600"
            onClick={() => SetShow([...show, AddParagraph(show.length)])}
          >
            P
          </button>
          {/* Add List  */}
          <button
            onClick={() => SetShow([...show, AddList(show.length)])}
            className="p-3 bg-yellow-200"
          >
            L
          </button>
          <button
            onClick={() => SetCount(count + 1)}
            className="p-3 bg-yellow-900"
          >
            {count}
          </button>
        </div>
        
        <div className="flex justify-between px-3 lg:px-10 pt-3">
          <button
            onClick={SaveTutorials}
            className="capitalize p-1 text-white font-serif px-2 mr-3 bg-emerald-600 rounded-sm"
          >
            save
          </button>
          <button className="capitalize p-1 text-white font-serif bg-sky-700 rounded-sm">
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
