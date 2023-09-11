"use client";
import React from "react";
import { Editor } from "@monaco-editor/react";
function ShowCode({ value }) {
    console.log(value);
  return (
    <div className="flex px-7 mt-2 h-max ">
      <div className="flex flex-col flex-grow p-2  rounded-2xl bg-black">
        <div className="flex ">
            <p className="w-5 h-5 mx-1 mb-2  rounded-full bg-red-500"></p>
            <p className="w-5 h-5 mx-1 mb-2 rounded-full bg-yellow-200"></p>
            <p className="w-5 h-5 mx-1 mb-2 rounded-full bg-green-400"></p>
           
        </div>
        <Editor
          height={`${value.height}px`}
          language={value.language}
          value={value.data.text}
          options={{ readOnly: true }}
          width={''}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}

export default ShowCode;
