import ShowCategoryTutorial from '@/components/Learn/ShowCategoryTutorial';
import { userUrl} from '@/url'
import SideBar from '@/components/Learn/SideBar';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react'

async function page({params:{slag}}) {
   
    return (
      <div>
        <Navbar />
        <div className="flex">
        <SideBar/>
         <ShowCategoryTutorial slag={slag} />
        </div>
      </div>
    );
  }

export default page
