import React from "react";
import {userUrl} from '@/url'
import Link from "next/link";
async function GetTutorialCategorys(){
 const  res = await fetch(`${userUrl}/tutorialcategory`,{next:{revalidate:10}})
 return  res.json()
}
async function SideBar() {
  const {category}=await GetTutorialCategorys()
   console.log(category);
  return (
    <div className="w-64">
      <ul className="w-64 flex flex-col h-screen fixed bg-emerald-200 ">
        {category.map((data)=>{
          return <Link href={`/learn/${data.category}`}>
            <li className="h-9  pl-2 flex items-center capitalize m-[1px] rounded-md hover:bg-emerald-100 font-bold font-sans">{data.category}</li>
          </Link>
        })}
      </ul>
    </div>
  );
}

export default SideBar;
