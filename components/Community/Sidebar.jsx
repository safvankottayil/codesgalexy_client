import React from 'react'
import Link from 'next/link'
function Sidebar() {
  return (
    <ul className="flex pl-2 md:pl-10 mt-3 font-semibold flex-col">
            <li className="py-1 pr-5 pl-2 border-r-4 border-emerald-200 ">
              Home
            </li>
            <Link href={'/community'} className="py-1 hover:bg-slate-300 pr-5 pl-5 border-r-4 border-emerald-100 ">
              Questions
            </Link>
            <Link href={''} className="py-1 pr-5 pl-5 border-r-4 hover:bg-slate-300  border-emerald-100">Tags</Link>
            <Link href={'/community/saved'} className="py-1 pr-5 hover:bg-slate-300  pl-5 border-r-4  border-emerald-100">Saved</Link>
          </ul>
  )
}

export default Sidebar
