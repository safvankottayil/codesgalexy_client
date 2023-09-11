import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import {CiMenuKebab} from 'react-icons/ci'
import {LiaHandPointRight} from 'react-icons/lia'
import { Fontfamilly, Size, fontweight, PM } from "@/components/Tools/Tools";
import Color from "../Tools/Color";
function Table({ Delete, index, data, Update,row ,TableData}) {
  let rowNumber=Number(row)
  const [text, SetText] = useState("Write any thing ");
  const [color, SetColor] = useState("#000");
  const [showColor, Setshowcolor] = useState(false);
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
  const [PADDING,SetPADDING]=useState([' pl-6 ',' pr-6 ',' pt-3 ',' pb-0 '])
  const [editer, SetEditer] = useState(false);
  const [ShowEditer,SetShowEditer]=useState(false)
  const [style,SetStyle]=useState([' text-lg ','font-sans','font-bold'])
  const [css,Setcss]=useState([...PADDING,...MARGIN,...style])
  const [select,SetSelect]=useState([0,0])
  const [table, SetTable] = useState([[]]);
  useEffect(()=>{
    if(data[index]){
      SetColor(data[index].color)
      SetPADDING(data[index].css.slice(0,4))
      SetMARGIN(data[index].css.slice(4,8))
      SetStyle(data[index].css.slice(8,11))
      Setcss(data[index].css)
      rowNumber=data[index].row
      if(TableData){
        SetTable(TableData)
      }
    }else{
      let arr=[]
      for(let i=0;i<rowNumber;i++){
        arr[i]=i
      }
      SetTable([arr])
    }
  },[])

  useEffect(() => {
    Setcss([...PADDING, ...MARGIN, ...style]);
    Update(data.map((value,i)=>{
      if(i==index){
        return {data:table,css:css,row:rowNumber,color:color,type:'table'}
      }else{
        return value
      }
    }))
    
      SetText(table[select[0]][select[1]])
    }, [PADDING, MARGIN, style,select])
  function handleText(e) {
    SetText(e.target.value);
    SetTable(table.map((row,i)=>{
     return row.map((value,j)=>{
        if(select[0]==i&&select[1]==j){
          return text
        }else{
          return value
        }
       })
    }))
  }
  if (!data[index]) {
    Update([...data, { data:table,css:css,color:color,row:rowNumber,type:'table', isEdit: true }]);
  }else{
    Update(data.map((value,i)=>{
      if(i==index){
      return { data:table,css:css,color:color,row:rowNumber,type:'table', isEdit: true }
      }else{
      return value
      }
    }))
  }
  return (
    <div className=" ">
      <div className="relative flex flex-grow">
      <table style={{color:color,backgroundColor:bg,width:'100%',borderRadius:'8px solid'}} className={...css}>
        {table.map((cols, row) => {
          if (row == 0) {
            return (
              <thead>
                <tr className="w-full">
                  {cols.map((value,i) => (
                    <th onClick={()=>SetSelect([row,i])} className={` ${select[0]==row&&select[1]==i?'bg-slate-300':""}  border px-1 whitespace-normal break-words border-slate-600 text-start `}>{value}</th>
                  ))}
                </tr>
              </thead>
            );
          } else {
            return (
              <tr className="">
                {cols.map((value,j) => (
                  <td onClick={()=>SetSelect([row,j])} className={`${select[0]==row&&select[1]==j?'bg-slate-300':""} border whitespace-normal break-words border-slate-600 text-start`}>{value}</td>
                ))}
              </tr>
            );
          }
        })}
      </table>
    
      <div>
      <CiMenuKebab onClick={()=>SetShowEditer(!ShowEditer)} fill="black" className="w-7 mt-2 h-7"/>
      </div>
      {ShowEditer? <span className="flex flex-col px-1 absolute -right-7 z-20 bg-gray-400 rounded-md top-9  items-center">
          <AiFillEdit onClick={()=>SetEditer(!editer)} className="w-6 h-6 m-1" />
          <MdDelete onClick={()=>{ Delete(index),SetShowEditer(false)}} className="w-6 h-6 m-1" />
          <MdOutlineSwapVert onClick={()=>{swap(index+1)}} className="w-6 h-6 m-1" />
        </span> :""}
       
      </div>
      {editer?
      <div className="bg-slate-200 rounded-md w-72 flex flex-col right-72 z-10 absolute  ">
        <div>
          <div className="flex justify-start w-full">
            <p className="m-1 font-bold">Edit</p>
            <AiOutlineClose onClick={()=>SetEditer(!editer)} className="w-6 h-6 m-1" />
          </div>
          <ul className="capitalize">
            {/* add row */}
            <li onClick={()=>{
               let arr=[]
               for(let i=0;i<rowNumber;i++){
                 arr[i]=i
               }
              SetTable([...table,arr])
              }} className="my-1">
              Add row
            </li>
            {/* Color */}
            <li
              onMouseOver={() => Setshowcolor(true)}
              onMouseLeave={() => Setshowcolor(false)}
              className="flex px-2 hover:bg-emerald-200 my-1  justify-between"
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
        
            {/* font size */}
            <li
              onMouseOver={() => SetfontShow(true)}
              onMouseLeave={() => SetfontShow(false)}
              className="flex px-2 hover:bg-emerald-200 my-1 justify-between"
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
                      }))} className={`${size}`}>Title</li>;
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
              className="flex px-2 hover:bg-emerald-200 my-1 justify-between"
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
              className="flex px-2  hover:bg-emerald-200 my-1 justify-between"
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
            <li className="flex my-1 hover:bg-emerald-200 justify-between">
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
              className="flex flex-col  hover:bg-emerald-200 my-1 justify-between"
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

          <div className="flex items-center flex-col mb-1">
           <div className="flex justify-start w-full pl-5"> <label htmlFor="">Selected table column</label></div>
            <textarea 
            value={text}
              className="w-64 bg-gray-100 p-1 border-b-2 border-black h-36 focus:outline-none "
              onChange={handleText}
              type="text"
            >
               
            </textarea>
          </div>
        </div>
      </div>
      :""}
    </div>
  );
}

export default Table;
