import React from 'react'
import './style.css'
import DocumentSearch from './DocumentSearch'
import CreateButton from './CreateButton'
import {userUrl} from  '@/url'
import Link from 'next/link'
export async function generateStaticParams() {
    const res = await fetch(`${userUrl}/tutorialcategory`,{next:{revalidate:1}})
    const {category}=await res.json()
   
    return category.map((post) => ({
      slug: post.category
    }))
  }
  async function GetTutorial(slag){
    const res =await fetch(`${userUrl}/tutorial/${slag}`,{next:{revalidate:10}})
    return res.json()
  }


async function ShowCategoryTutorial({slag}) {
  const {Tutorials}=await GetTutorial(slag)
  return (
    <div className="bg-emerald-50 flex  w-full  min-h-[92vh] ">
          <div className="flex flex-col w-full pl-10 pr-3 py-4">
            <div className="flex w-full">
            <DocumentSearch/>
              <div className="flex flex-grow justify-end">
               <CreateButton/>
              </div>
            </div>
            <div className="grid grid-cols-3 pl-3 gap-5 mt-3">
              {Tutorials.map((tuto)=>{
                return (
                <Link href={`/learn/tutorial/${tuto._id}/home`}>
                <div className=" shadow-md shadow-slate-700 rounded-xl">
                  <img className='w-full h-60 rounded-t-md' src={tuto.image} alt="" />
                  <div className='flex flex-col h-24 px-2 py-1'>
                    <p className='font-bold capitalize'>{tuto.title}</p>
                    <p className='overflow-y-auto capitalize'>{tuto.description}</p>

                  </div>
                </div>
                </Link>
                )
              })}
             
             
            </div>
          </div>
        </div>
  )
}

export default ShowCategoryTutorial
