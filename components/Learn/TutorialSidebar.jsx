import React from "react";
import { userUrl } from "@/url";
import Link from "next/link";
async function Getpage(id) {
  const res = await fetch(userUrl + "/pages/" + id, {
    next: { revalidate: 10 },
  });
  return res.json();
}

async function TutorialSidebar({ id }) {
  const { pages } = await Getpage(id);
  return (
    <div className=" col-span-2">
      <ul className="w-64 flex flex-col h-screen fixed bg-emerald-200 ">
        {pages.map((page) => {
          return (
            <Link className="" href={`/learn/tutorial/${id}/${page.name}`}>
              <li className="capitalize pl-4 hover:bg-emerald-100 bg-emerald-200 h-9  flex items-center font-bold">
                {page.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default TutorialSidebar;
