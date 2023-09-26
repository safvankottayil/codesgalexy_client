import React from 'react'
import {userUrl} from '@/url'
import ShowTitle from '../EditComponents/ShowTitle'
import ShowParagraphs from '../EditComponents/ShowParagraphs'
import ShowList from '../EditComponents/ShowLIst'
import ShowCode from '../EditComponents/ShowCode'
import AddTutoriReview from '../AddTutorialReview/AddTutoriReview'
import PagesButton from './PagesButton'

async function GetTutorial(id,name){
    const res =await fetch(userUrl+`/page/${id}/${name}`,{next:{revalidate:10}})
    return res.json()
}
async function  ShowTutorial({id,name}) {
  const {page}=await GetTutorial(id,name)

  return (
    <div className='col-span-12 md:col-span-8'>
      <PagesButton id={id}/>
    <div className='flex flex-col'>
      {page.Data.map((value)=>{
       if(value.type=='title'){
        return <ShowTitle value={value} />
       }else if(value.type=='para'){
        return <ShowParagraphs value={value} />
       }else if(value.type=='list'){
        return < ShowList value={value} />
       }else if(value.type=='code'){
        return < ShowCode value={value} />
       }
       
      })}
    </div>
    <AddTutoriReview ID={id} />
    </div>
  )
}

export default ShowTutorial
