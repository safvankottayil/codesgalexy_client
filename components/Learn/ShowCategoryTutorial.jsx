import React from "react";
import "./style.css";
import DocumentSearch from "./DocumentSearch";
import CreateButton from "./CreateButton";
import { userUrl } from "@/url";
import Link from "next/link";
import { MdStar } from "react-icons/md";
import MobileFilter from "./MobileFilter";
export async function generateStaticParams() {
  const res = await fetch(`${userUrl}/tutorialcategory`, {
    next: { revalidate: 1 },
  });
  const { category } = await res.json();
  return category.map((post) => ({
    slug: post.category,
  }));
}
async function GetTutorial(slag) {
  const res = await fetch(`${userUrl}/tutorial/${slag}`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

const ratingStar = [1, 2, 3, 4, 5];
async function ShowCategoryTutorial({ slag }) {
  const { Tutorials } = await GetTutorial(slag);
  console.log(Tutorials);
  return (
    <div className="bg-emerald-50 flex  w-full  min-h-[92vh] ">
      <div className="flex flex-col w-full  md:pl-10 pr-3 py-4">
        <div className="flex md:flex-row flex-col w-full">
          <DocumentSearch />
          <div className="flex flex-grow justify-between md:justify-end">
            <MobileFilter/>
            <CreateButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 pl-3 gap-5 mt-3">
          {Tutorials.map((tuto) => {
            const reviews = tuto?.reviews
              ? tuto.reviews.length == 0
                ? 1
                : tuto.reviews.length
              : 1;
            const rate = Math.floor(tuto.rating / reviews);
            return (
              <>
                <div className=" shadow-md shadow-slate-700 rounded-xl">
                  <Link href={`/learn/tutorial/${tuto._id}/home`}>
                    <img
                      className="w-full h-60 rounded-t-md"
                      src={tuto.image}
                      alt=""
                    />
                  </Link>
                  <div className="flex h-24 pr-1 py-1">
                    <div className="px-1">
                      {tuto.UserId.image ? (
                        <Link href={`/user/${tuto.UserId._id}`}>
                          <div className="w-14 h-14 mt-1 rounded-full ">
                            <img
                              src={tuto.UserId.image}
                              className="w-full h-14 rounded-full"
                              alt=""
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className="bg-black w-14 mt-1  h-14 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold truncate capitalize pt-1">
                          {tuto.title}
                        </p>
                        <p className="flex">
                          {ratingStar.map((rating) => {
                            if (rating <= rate) {
                              return (
                                <MdStar className="text-orange-300 w-6 h-6" />
                              );
                            } else {
                              return (
                                <MdStar className="text-gray-400 w-6 h-6" />
                              );
                            }
                          })}
                        </p>{" "}
                      </div>
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                        }}
                        className="overflow-y-hidden capitalize text-sm  h-[60px] font-sans"
                      >
                        {tuto.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowCategoryTutorial;
