"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import AdminAxios from "@/Axios/client";
import { Chart } from "react-google-charts";
export const datapi = [
  ["Task", "Hours per Day"],
  ["Sleep", 7], // CSS-style declaration
];

export const optionspi = {
  pieHole: 0.7,
  is3D: false,
  legend: "none",
  backgroundColor: "transparent",
  chartArea: { width: "99%", height: "99%" },
};

export const data = [
  ["Year", "Sales"],
  ["1", 1000],
  ["2", 170],
  ["3", 660],
  ["4", 130],
  ["2", 170],
  ["3", 660],
  ["4", 130],
];

export const calenderdata = [
  [
    {
      type: "date",
      id: "Date",
    },
    {
      type: "number",
      id: "Won/Loss",
    },
  ],
  [new Date(2012, 3, 13), -37032],
  // [new Date(2012, 3, 14), 384],
  // [new Date(2012, 3, 15), 38024],
  // [new Date(2012, 3, 16), 38108],
  // [new Date(2012, 3, 17), 38229],
  //
  [new Date(2011, 3, 13), -37032],
  [new Date(2011, 3, 14), 384],
  [new Date(2011, 3, 15), 38024],
  [new Date(2011, 3, 16), 38108],
  [new Date(2011, 3, 17), 38229],
  //  [new Date(2012, 3, 13), -37032],
  [new Date(2010, 3, 14), 384],
  [new Date(2010, 3, 15), 38024],
  [new Date(2010, 3, 16), 38108],
  [new Date(2010, 3, 17), 38229],
  // Many rows omitted for brevity.
];

export const options = {
  backgroundColor: "transparent",
  colors: ["#fff"],
  title: "Dialy Users",
  curveType: "function",
  titleTextStyle: { color: "#FFF" },
  lineWidth: 4,
  pointSize: 7,
  series: { 0: { color: "red" } },
  legend: { position: "bottom" },
  chartArea: { width: "90%", height: "80%" },
  vAxis: {
    textStyle: { color: "#ffffff", fontSize: 12 },
    gridlines: { color: "transparent" },
    baselineColor: "#fff",
  },
  hAxis: {
    textStyle: { color: "#ffffff", fontSize: 12 },
    gridlines: { color: "#2a261d" },
    minorGridlines: { color: "#2a261d" },
    baselineColor: "#b19c72",
  },
};

function Dashboard() {
  const [designs,setdesigns]=useState({})
  const [tutorials,settutorials]=useState({})
  const [cld, setcld] = useState([]);
  console.log(cld);
  useEffect(() => {
    let data = [];
    AdminAxios.get("/admin").then((res) => {
      const tutorial = res.data.tutorial;
      setuser(res.data.users)
      setdesigns(res.data.designs)
      settutorials(res.data.tutorials)
      let prev = [];
      let count = 1;
      tutorial.forEach((value, i) => {
        let date = value.date;
        date = date.slice(0, 10);
        date = date.split("-");
        if (prev[0] == date[0] && prev[1] == date[1] && prev[2] == date[2]) {
          count++;
          data[data.length - 1] = [
            new Date(Number(date[0]), Number(date[1]), Number(date[2])),
            count,
          ];
        } else {
          prev = date;
          count = 1;
          data.push([
            new Date(Number(date[0]), Number(date[1]), Number(date[2])),
            1,
          ]);
        }
      });
      setcld([
        [
          {
            type: "date",
            id: "Date",
          },
          {
            type: "number",
            id: "Won/Loss",
          },
        ],
        ...data,
      ]);
    });
  }, []);
  const [user, setuser] = useState([1, 2, 3, 2, 2, 2, 2]);
  return (
    <div className="flex flex-grow bg-gray-800 overflow-y-auto h-screen">
      <div className="flex flex-col flex-grow mt-20">
        <div className="flex  ">
          <div className="flex col-span-1 flex-grow justify-center ">
            <div className="bg-gray-700 flex justify-between rounded-md h-40 w-11/12">
              <div className="flex flex-grow px-2 text-white pl-3  flex-col">
                <h1 className="font-bold text-lg pt-2 pl-2">Designs</h1>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800  pl-2 pt-6">
                  total<span className="pl-11">:{designs?.total}</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  puplished<span className="pl-2">:{designs?.published}</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  saved<span className="pl-9">:{designs?.saved}</span>
                </p>
              </div>
              <div className="flex items-end pb-4 pr-2">
                <Chart
                  chartType="PieChart"
                  data={datapi}
                  options={optionspi}
                  height={"80px"}
                  width={"80px"}
                />
              </div>
            </div>
          </div>
          <div className="flex   col-span-1 flex-grow  justify-center">
            <div className="bg-gray-700 flex justify-between rounded-md h-40 w-11/12">
              <div className="flex flex-grow px-2 text-white pl-3  flex-col">
                <h1 className="font-bold text-lg pt-2 pl-2">Community</h1>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800  pl-2 pt-6">
                  total<span className="pl-11">:20</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  puplished<span className="pl-2">:20</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  reported<span className="pl-3">:20</span>
                </p>
              </div>
              <div className="flex items-end pb-4 pr-2">
                <Chart
                  chartType="PieChart"
                  data={datapi}
                  options={optionspi}
                  height={"80px"}
                  width={"80px"}
                />
              </div>
            </div>
          </div>
          <div className="flex   col-span-1 flex-grow  justify-center ">
            <div className="bg-gray-700 flex justify-between rounded-md h-40 w-11/12">
              <div className="flex flex-grow px-2 text-white pl-3  flex-col">
                <h1 className="font-bold text-lg pt-2 pl-2">Tutorials</h1>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800  pl-2 pt-6">
                  total<span className="pl-11">:{tutorials?.total}</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  verifyed<span className="pl-4">:{tutorials?.verifyed}</span>
                </p>
                <p className="capitalize font-semibold  shadow-sm shadow-slate-800 pl-2">
                  puplished<span className="pl-2">:{tutorials?.reported}</span>
                </p>
              </div>
              <div className="flex items-end pb-4 pr-2">
                <Chart
                  chartType="PieChart"
                  data={datapi}
                  options={optionspi}
                  height={"80px"}
                  width={"80px"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-3 mt-5">
          <div className="bg-gray-700 flex justify-center rounded-lg p-2">
            {cld[0] ? (
              <Chart
                chartType="Calendar"
                width="98%"
                height="450px"
                data={cld}
                options={options}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-96 px-2 ">
        <div className="bg-gray-700 w-full flex flex-col dashbord overflow-y-auto h-96 mt-20 rounded-md">
          <div>
            <h1 className="text-white font-bold underline-offset-2 underline decoration-double pl-3 pt-3">
              Latest Users
            </h1>
          </div>
          {user.map((value) => {
            return (
              <>
                <div className="flex border-b-[1px] border-slate-400 mx-2 py-2">
                  {value?.image?<img className="rounded-full h-12 w-12" src={value.image} alt="" />:
                  <div className="rounded-full h-12 w-12 bg-black"></div>}
                  <div className="flex-col flex text-white text-sm pt-1 pl-2">
                    <span className="font-semibold">@{value.name?value.name:'Name'}</span>{" "}
                    <span>{value.email?value.email:'email@gmail.com'}</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="bg-gray-700 w-full  h-20 mt-2 rounded-md"></div>
      </div>
    </div>
  );
}

export default Dashboard;
