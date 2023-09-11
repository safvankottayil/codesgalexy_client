import React from "react";
import "./style.css";
import { BsDropbox } from "react-icons/bs";
import Link from "next/link";
import Footer from "./Footer";
const FirstList = [
  {
    url: "/add-design",
    btn: " Try the editor",
    head: " Build & Test",
    text: "Get work done quicker by building out entire projects or  isolating code to test features and animations. Want to keep it  all under wraps?",
  },
  {
    url: "/learn",
    btn: "Learn",
    head: " Learn & Discover",
    text: "Tutorials are a powerful way to share knowledge and empower  learners. Whether youre an educator, content creator, or simply  passionate about sharing your expertise",
  },
  {
    url: "/community",
    head: "Community",
    btn: "ask",
    text: " its question-and-answer format. Anyone can post a technical question, and the community responds with solutions and explanations. Its a treasure trove of programming knowledge.",
  },
];
function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-emerald-100">
      <div className="flex h-screen">
        <div className="h-full flex flex-col  items-center md:w-1/2">
          <div className="flex flex-col text-3xl md:text-4xl mt-10 md:mt-32 font-black">
            <p>The best place to build,</p>
            <p> test, and discover</p>
          </div>
          <div className="flex justify-center">
            <p className=" w-5/6 md:w-4/6 md:ml-24 mt-3 font-semibold ">
              Codesgalexy is a social development environment for front-end
              designers and developers. Build and deploy a website, show off
              your work, build test cases to learn and debug, and find
              inspiration.
            </p>
          </div>
          <div className=" w-2/4 mt-8">
            <button className="bg-sky-400 -ml-16 md:-ml-4 rounded-sm py-2 px-2">
              Sign Up for free
            </button>
          </div>
          <div className=" md:w-3/4 md:pl-20 pl-9 mt-10 ">
            <h1 className="flex  font-bold text-lg ">Communty</h1>
            <p className="font-semibold text-gray-600 pt-3">
              its question-and-answer format. Anyone can post a technical
              question, and the community responds with solutions and
              explanations. Its a treasure trove of programming knowledge.
            </p>
          </div>
        </div>
        <div className="h-full hidden md:flex overflow-hidden  justify-center pt-20 w-1/2">
          <div className="h-96  rounded-xl relative w-96 ">
            <div className="h-72 w-72 absolute -right-40 -top-16  shadow-xl shadow-black  bg-slate-800 rounded-xl">
              <div className="flex justify-start">
                <div className="flex mx-2 mt-1">
                  <p className="w-5  h-5 rounded-full bg-red-500"></p>
                  <p className="w-5 mx-1 h-5 rounded-full bg-yellow-200"></p>
                  <p className="w-5 h-5 rounded-full bg-emerald-400"></p>
                </div>
              </div>
            </div>
            <div className="h-72 w-72 absolute  shadow-xl shadow-black  bg-slate-800  top-20 -left-40 rounded-xl">
              <div className="flex justify-between">
                <div className="flex mx-2 mt-1">
                  <p className="w-5  h-5 rounded-full bg-red-500"></p>
                  <p className="w-5 mx-1 h-5 rounded-full bg-yellow-200"></p>
                  <p className="w-5 h-5 rounded-full bg-emerald-400"></p>
                </div>
                <div>
                  <p className="text-white font-sans font-bold mr-2 text-xl">
                    JS
                  </p>
                </div>
              </div>
              <div className="space-y-1 mt-4 flex flex-col text-xs font-semibold font-serif text-white whitespace-normal">
                <code className="flex pt-3 pl-3">
                  <code className="text-red-300 pr-2">let</code>
                  <code className="text-emerald-300 pr-2">data,btn</code>
                </code>
                <code className="ml-4">
                  <code className="text-emerald-300 pr-2">btn</code>
                  <code>=</code>
                  <code className="whitespace-normal ml-1">
                    document.getElementById("p2")
                  </code>
                </code>
                <code className="ml-4">
                  <code className="text-emerald-300 pr-2">data</code>
                  <code>=</code>
                  <code className="whitespace-normal ml-1">
                    document.getElementById("show")
                  </code>
                </code>
                <code className="text-red-300 ml-3">
                  <code className="text-emerald-300 ml-4">btn</code>
                  .addEventListener <code className="text-emerald-500">(</code>
                  <code className="text-yellow-200">"click"</code>
                  <code className="text-emerald-500">,</code>
                  <br />
                  <code className="text-emerald-500 ml-4">(</code>
                  <code className="text-sky-300">e</code>
                  <code className="text-emerald-500">)</code>
                  <code className="text-emerald-500 ml-4">(</code>
                  {/* <code></code> */}
                </code>
                <code className="ml-9">
                  <code className="text-blue-400">if</code>
                  <code className="text-emerald-500 ">(</code>
                  <code className="text-emerald-500 ">)</code> <br />
                  <code className="text-emerald-300 p-2">data</code>.classList.
                  <code className="text-red-300">add</code>
                  <code className="text-emerald-500 ">(</code>
                  <code>"active"</code>
                  <code className="text-emerald-500 ">)</code>
                  <br />
                  <code className="text-blue-400">else</code>
                  <code className="text-emerald-500 ">(</code>
                  <code className="text-emerald-500 ">)</code> <br />
                  <code className="text-emerald-300 p-2">data</code>.classList.
                  <code className="text-red-300">remove</code>
                  <code className="text-emerald-500 ">(</code>
                  <code>"active"</code>
                  <code className="text-emerald-500 ">)</code>
                </code>
                <code className="text-emerald-500 ml-16 ">)</code>
              </div>
            </div>
            <div className="h-72 w-72 absolute -right-20 -bottom-44  shadow-xl shadow-black  bg-slate-800  rounded-xl">
              <div className="flex flex-col justify-start">
                <img
                  src="/tutorials.png"
                  className="w-full rounded-t-lg"
                  alt=""
                />
                <div className="flex flex-col text-white px-2 py-1 ">
                  <div>
                    <p className="font-bold">Tutorials</p>
                  </div>
                  <div>
                    <p className="text-xs text-white font-thin mb-2">
                      {" "}
                      &nbsp;Explore our tutorials, roll up your sleeves, and
                      let's start crafting incredible web experiences together!
                    </p>
                  </div>
                  <div>
                    {" "}
                    <button className="bg-blue-500 rounded-sm px-3 text-sm py-1">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-grow md:px-20">
        <div className=" grid grid-cols-1 px-5 space-y-4 md:space-y-0 md:px-10 gap-y-5 gap-x-7 w-full md:grid-cols-3 mb-10">
          {FirstList.map((value) => {
            return (
              <>
                {" "}
                <div className="relative  rounded-lg shadow-md shadow-black bg-gray-800 text-white">
                  <BsDropbox className="absolute -top-6 left-5 bg-emerald-100 shadow-md shadow-black border-[1px] border-emerald-400 text-gray-500 rounded-md w-16 h-16" />
                  <div className="mt-10">
                    <h1 className="text-2xl font-black pl-4 pt-3 font-sans">
                      {value.head}
                    </h1>
                  </div>
                  <div>
                    <p className="pl-4 pr-3 h-20 overflow-hidden pt-1">
                      {value.text}
                    </p>
                  </div>
                  <div className="pl-4 pt-3">
                    <Link href={value.url}>
                      {" "}
                      <button className="capitalize px-4 mb-3 py-2 bg-emerald-600 rounded-sm ">
                        {value.btn}
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div
          style={{ borderRadius: "0px 75px" }}
          className="w-5/6 flex flex-col-reverse md:flex-row  items-center p-5 py-7 bg-gray-800 text-white "
        >
          <p className=" md:w-3/4 whitespace-normal md:px-10">
            <i className=" text-sm md:text-lg font-bold font-mono">
              Certainly! A community platform, similar to Stack Overflow, allows
              users to create and share tutorials on various topics. Users can
              contribute by adding single points, tables, paragraphs, and
              headings to create comprehensive tutorials. These tutorials are
              available for other users to read and learn from. It's a
              collaborative space where individuals can share their knowledge
              and help others in their learning journey. Whether you're looking
              to expand your skills or share your expertise, this platform
              offers a space for knowledge sharing and learning from a community
              of like-minded individuals.
            </i>
          </p>
          {/*  */}
          <div className="h-72 w-72 shadow-xl shadow-gray-950   rounded-tl-[100px] md:rounded-xl">
            <div className="flex flex-col justify-start">
              <img
                src="/tutorials.png"
                className="w-full rounded-tr-[80px] "
                alt=""
              />
              <div className="flex flex-col text-white px-2 py-1 ">
                <div>
                  <p className="font-bold">Tutorials</p>
                </div>
                <div>
                  <p className="text-xs text-white font-thin mb-2">
                    {" "}
                    &nbsp;Explore our tutorials, roll up your sleeves, and let's
                    start crafting incredible web experiences together!
                  </p>
                </div>
                <div>
                  {" "}
                  <button className="bg-blue-500 rounded-sm px-3 text-sm py-1">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      {/* ------------------------------- */}
      <div className="flex justify-center mt-10 mb-10">
        <div
          style={{ borderRadius: "100px 0px" }}
          className=" w-5/6 flex flex-col-reverse md:flex-row-reverse items-center p-5 py-7 bg-gray-800 text-white "
        >
          <p className="md:w-3/4 mt-3 whitespace-normal md:px-10">
            <i className=" text-sm  md:text-lg font-bold font-mono">
              Certainly! This website is designed to provide a user-friendly and
              visually appealing HTML front-end. It's created with the intention
              of showcasing the power and creativity of HTML in web design.
              Users can explore a variety of beautifully crafted front-end
              designs, each highlighting different aspects of HTML's
              capabilities. Whether you're a seasoned web developer looking for
              inspiration or someone new to web design, this website offers a
              collection of stunning HTML-based designs to spark your creativity
              and help you understand the possibilities of HTML in creating
              visually engaging web interfaces. It's a valuable resource for
              anyone interested in web design and HTML development.
            </i>
          </p>
          {/*  */}
          <div className="h-72 w-72 rounded-ss-[90px] pt-5 shadow-xl shadow-black  bg-slate-800  border-[1px] border-slate-300 ">
             
          <div className= "mt-10 space-y-1 md:mt-4 flex flex-col text-xs font-semibold font-serif text-white whitespace-normal">
                <code className="flex pt-3 pl-3">
                  <code className="text-red-300 pr-2">let</code>
                  <code className="text-emerald-300 pr-2">data,btn</code>
                </code>
                <code className="ml-4">
                  <code className="text-emerald-300 pr-2">btn</code>
                  <code>=</code>
                  <code className="whitespace-normal ml-1">
                    document.getElementById("p2")
                  </code>
                </code>
                <code className="ml-4">
                  <code className="text-emerald-300 pr-2">data</code>
                  <code>=</code>
                  <code className="whitespace-normal ml-1">
                    document.getElementById("show")
                  </code>
                </code>
                <code className="text-red-300 ml-3">
                  <code className="text-emerald-300 ml-4">btn</code>
                  .addEventListener <code className="text-emerald-500">(</code>
                  <code className="text-yellow-200">"click"</code>
                  <code className="text-emerald-500">,</code>
                  <br />
                  <code className="text-emerald-500 ml-4">(</code>
                  <code className="text-sky-300">e</code>
                  <code className="text-emerald-500">)</code>
                  <code className="text-emerald-500 ml-4">(</code>
                  {/* <code></code> */}
                </code>
                <code className="ml-9">
                  <code className="text-blue-400">if</code>
                  <code className="text-emerald-500 ">(</code>
                  <code className="text-emerald-500 ">)</code> <br />
                  <code className="text-emerald-300 p-2">data</code>.classList.
                  <code className="text-red-300">add</code>
                  <code className="text-emerald-500 ">(</code>
                  <code>"active"</code>
                  <code className="text-emerald-500 ">)</code>
                  <br />
                  <code className="text-blue-400">else</code>
                  <code className="text-emerald-500 ">(</code>
                  <code className="text-emerald-500 ">)</code> <br />
                  <code className="text-emerald-300 p-2">data</code>.classList.
                  <code className="text-red-300">remove</code>
                  <code className="text-emerald-500 ">(</code>
                  <code>"active"</code>
                  <code className="text-emerald-500 ">)</code>
                </code>
                <code className="text-emerald-500 ml-16 ">)</code>
              </div>
              </div>
              
          {/*  */}
        </div>
      </div>
      <Footer/>
          </div>
  );
}

export default Home;
