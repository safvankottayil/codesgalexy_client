import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Fontfamilly, Size, fontweight, PM } from "@/components/Tools/Tools";
import Color from "../Tools/Color";
import { CiMenuKebab } from "react-icons/ci";
 function Title({ data, Update, index,Delete,swap}) {
  // console.log(value);
 
  const [text, SetText] = useState("Title");
  const [color, SetColor] = useState("#000");
  const [showColor, Setshowcolor] = useState(false);
  const [showbg, Setshowbg] = useState(false);
  const [sizeShow, SetfontShow] = useState(false);
  const [fontWeightshow, SetfontWeight] = useState(false);
  const [fontfamilyshow, Setfontfamily] = useState(false);
  const [paddingShow, Setpadding] = useState(false);
  const [marginShow, SetmarginShow] = useState(false);
  const [ML, SetML] = useState(false);
  const [MT, SetMT] = useState(false);
  const [MR, SetMR] = useState(false);
  const [MB, SetMB] = useState(false);
  const [PL, SetPL] = useState(false);
  const [PT, SetPT] = useState(false);
  const [PR, SetPR] = useState(false);
  const [PB, SetPB] = useState(false);
  const [bg, SetBg] = useState("#fff");
  const [MARGIN,SetMARGIN]=useState([' ml-0 ',' mr-0 ',' mt-0 ',' mb-0 '])
  const [PADDING,SetPADDING]=useState([' pl-0 ',' pr-0 ',' pt-0 ',' pb-0 '])
  const [editer, SetEditer] = useState(false);
  const [ShowEditer,SetShowEditer]=useState(false)
  const [style,SetStyle]=useState([' text-lg ',' font-sans ',' font-bold '])
  const [css,Setcss]=useState([...PADDING,...MARGIN,...style])

  useEffect(()=>{
    if(data[index]){
     SetText(data[index].data.text)
     SetBg(data[index].bg)
     SetColor(data[index].color)
     SetPADDING(data[index].css.slice(0,4))
     SetMARGIN(data[index].css.slice(4,8))
     SetStyle(data[index].css.slice(8,11))
     Setcss(data[index].css)
    }
   },[])
  useEffect(() => {
    Setcss([...PADDING,...MARGIN,...style])
    Update(data.map((value,i)=>{
      if(i==index){
        return {data:value.data,css:css,bg:bg,color:color,type:'title'}
      }else{
        return value
      }
    }))
  }, [PADDING,MARGIN,style])
  if (!data[index]) {
    Update(
      data.filter((data) => {
        return (data.isEdit = false);
      })
    );
    Update([...data, { data: { text: text },css:css,bg:bg,color:color, isEdit: true,type:'title' }]);
  }


  function handleText(e) {
    SetText(e.target.value);
    Update(
      data.filter((element, i) => {
        if (i == index) {
          return (element.data.text = text);
        } else {
          return element;
        }
      })
    );
  }
 
 

  return (
    <div className="relative w-full">
      <div style={{ backgroundColor: bg }} className="flex  justify-between">
        <h6 style={{ color: color }} className={...css}>
          {text}
        </h6>
        <div>
      <CiMenuKebab onClick={()=>SetShowEditer(!ShowEditer)} fill="black" className="w-7 mt-2 h-7"/>
      </div>
      {ShowEditer? <span className="flex flex-col px-1 absolute -right-7 z-20 bg-gray-400 rounded-md top-9  items-center">
          <AiFillEdit onClick={()=>SetEditer(!editer)} className="w-6 h-6 m-1" />
          <MdDelete onClick={()=>{ Delete(index),SetShowEditer(false)}} className="w-6 h-6 m-1" />
          <MdOutlineSwapVert onClick={()=>{swap(index+1)}} className="w-6 h-6 m-1" />
        </span> :""}
       
      </div>
      {/* Editer */}
      {editer?
      <div className="bg-slate-200 rounded-md w-72 flex flex-col  z-50 absolute right-0 ">
        <div>
          <div className="flex justify-start w-full">
            <p className="m-1 font-bold">Edit</p>
            <AiOutlineClose onClick={()=>SetEditer(false)} className="w-6 h-6 m-1" />
          </div>
          <ul className="capitalize">
            {/* Color */}
            <li
              onMouseOver={() => Setshowcolor(true)}
              onMouseLeave={() => Setshowcolor(false)}
              className="flex px-2 hover:bg-emerald-200 justify-between"
            >
              <span>Color</span>
              <span className="flex">
                <p
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-full `}
                ></p>
                {color}
              </span>
              {showColor ? (
                <Color show={Setshowcolor} hex={color} setHex={SetColor} />
              ) : (
                ""
              )}
            </li>
            {/* backgoundColor */}
            <li
              onMouseOver={() => Setshowbg(true)}
              onMouseLeave={() => Setshowbg(false)}
              className="flex px-2 justify-between"
            >
              <span>BackgroundColor</span>
              <span className="flex">
                <p
                  style={{ backgroundColor: bg }}
                  className={`w-5 h-5 rounded-full `}
                ></p>
                {bg}
              </span>
              {showbg ? <Color show={Setshowbg} hex={bg} setHex={SetBg} /> : ""}
            </li>
            {/* font size */}
            <li
              onMouseOver={() => SetfontShow(true)}
              onMouseLeave={() => SetfontShow(false)}
              className="flex px-2 hover:bg-emerald-200 justify-between"
            >
              <span>Size</span>
              {sizeShow ? (
                <div
                  onMouseOver={() => SetfontShow(true)}
                  onMouseLeave={() => SetfontShow(false)}
                  className="flex bg-yellow-100 px-2 py-2 rounded-md w-fit h-fit absolute -right-[165px]"
                >
                  <ul>
                    {Size.map((size) => {
                      return <li onClick={()=>SetStyle(style.map((value,i)=>{
                        if(i==0){
                          return ` ${size} `
                        }else{
                          return value
                        }
                      }))} className={` ${size} `}>Title</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </li>
            {/* font family */}
            <li
              onMouseOver={() => Setfontfamily(true)}
              onMouseLeave={() => Setfontfamily(false)}
              className="flex px-2 hover:bg-emerald-200 justify-between"
            >
              <span>font family</span>

              {fontfamilyshow ? (
                <div
                  onMouseOver={() => Setfontfamily(true)}
                  onMouseLeave={() => Setfontfamily(false)}
                  className="flex bg-yellow-100 px-2 py-2 rounded-md w-fit h-fit absolute -right-[60px]"
                >
                  <ul>
                    {Fontfamilly.map((font) => {
                      return <li onClick={()=>SetStyle(style.map((value,i)=>{
                        if(i==1){
                          return ` ${font} `
                        }else{
                          return value
                        }
                      }))} className={`${font}`}>Title</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </li>
            {/* font weight */}
            <li
              onMouseOver={() => SetfontWeight(true)}
              onMouseLeave={() => SetfontWeight(false)}
              className="flex px-2  hover:bg-emerald-200 justify-between"
            >
              <span>font weight</span>
              {fontWeightshow ? (
                <div
                  onMouseOver={() => SetfontWeight(true)}
                  onMouseLeave={() => SetfontWeight(false)}
                  className="flex bg-yellow-100 px-2 py-2 rounded-md w-fit h-fit absolute -right-[52px]"
                >
                  <ul>
                    {fontweight.map((font) => {
                      return <li onClick={()=>SetStyle(style.map((value,i)=>{
                        if(i==2){
                          return ` ${font} `
                        }else{
                          return value
                        }
                      }))} className={`${font}`}>Title</li>;
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </li>
            {/* margin */}
            <li className="flex  hover:bg-emerald-200 justify-between">
              <div
                onMouseOver={() => SetmarginShow(true)}
                onMouseLeave={() => SetmarginShow(false)}
                className="flex flex-col w-full  capitalize justify-between"
              >
                <span className="m-0 py-0 h-full">margin</span>
                {marginShow ? (
                  <ul className="capitalize my-0 py-0">
                    <li
                      onMouseOver={() => SetML(true)}
                      onMouseLeave={() => SetML(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Left</span>
                      {ML ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li onClick={()=>SetMARGIN(MARGIN.map((v,i)=>{
                              if(i==0){
                                return ` ml-${value} `
                              }else{
                                return v
                              }
                         
                            }))}>ML-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* MR */}
                    <li
                      onMouseOver={() => SetMR(true)}
                      onMouseLeave={() => SetMR(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Right</span>
                      {MR ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li onClick={()=>SetMARGIN(MARGIN.map((v,i)=>{
                              if(i==1){
                                return ` mr-${value} `
                              }else{
                                return v
                              }
                            }))}>MR-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* MT */}
                    <li
                      onMouseOver={() => SetMT(true)}
                      onMouseLeave={() => SetMT(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>top</span>
                      {MT ? (
                        <ul className="absolute mb bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li onClick={ ()=>SetMARGIN(MARGIN.map((v,i)=>{
                              if(i==2){
                                return ` mt-${value} `
                              }else{
                                return v
                              }
                            }))}>MT-{value}</li>;
                          })} 
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* MB */}
                    <li
                      onMouseOver={() => SetMB(true)}
                      onMouseLeave={() => SetMB(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Bottom</span>
                      {MB ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li onClick={()=>SetMARGIN(MARGIN.map((v,i)=>{
                              if(i==3){
                                return ` mb-${value} `
                              }else{
                                return v
                              }
                            }))}>MB-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li
              onMouseOver={() => Setpadding(true)}
              onMouseLeave={() => Setpadding(false)}
              className="flex flex-col  hover:bg-emerald-200 justify-between"
            >
               <span className="m-0 px-2 py-0 h-full">padding</span>
                {paddingShow ? (
                  <ul className="capitalize my-0 py-0">
                    <li
                      onMouseOver={() => SetPL(true)}
                      onMouseLeave={() => SetPL(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Left</span>
                      {PL ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li  onClick={()=>SetPADDING(PADDING.map((v,i)=>{
                              if(i==0){
                                return ` pl-${value} `
                              }else{
                                return v
                              }
                         
                            }))}>PL-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* PR */}
                    <li
                      onMouseOver={() => SetPR(true)}
                      onMouseLeave={() => SetPR(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Right</span>
                      {PR ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li  onClick={()=>SetPADDING(PADDING.map((v,i)=>{
                              if(i==1){
                                return ` pr-${value} `
                              }else{
                                return v
                              }
                         
                            }))}>PR-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* PT */}
                    <li
                      onMouseOver={() => SetPT(true)}
                      onMouseLeave={() => SetPT(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>top</span>
                      {PT ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li  onClick={()=>SetPADDING(PADDING.map((v,i)=>{
                              if(i==2){
                                return ` pt-${value} `
                              }else{
                                return v
                              }
                         
                            }))} >PT-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    {/* PB */}
                    <li
                      onMouseOver={() => SetPB(true)}
                      onMouseLeave={() => SetPB(false)}
                      className="flex pr-2 hover:bg-slate-50 justify-end"
                    >
                      <span>Bottom</span>
                      {PB ? (
                        <ul className="absolute bg-yellow-200 px-1 -right-[50px] rounded-md ">
                          {PM.map((value) => {
                            return <li   onClick={()=>SetPADDING(PADDING.map((v,i)=>{
                              if(i==0){
                                return ` pb-${value} `
                              }else{
                                return v
                              }
                         
                            }))}>PB-{value}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                ) : (
                  ""
                )}
            </li>
          </ul>

          <div className="flex justify-center mb-1">
            <input
            placeholder="Add text"
              className="w-64 bg-transparent border-b-2 border-black h-9 focus:outline-none "
              onChange={handleText}
              type="text"
            />
          </div>
        </div>
      </div>
      :""}
    </div>
  );
}

export default Title;
