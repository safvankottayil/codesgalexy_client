"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdStar } from "react-icons/md";
const ratingStar = [1, 2, 3, 4, 5];
import toast from "@/components/Toast/index";
import UserAxios from "@/Axios/client";
import { LoginShow } from "@/Redux/client";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
function AddTutoriReview({ ID }) {
  const dispatch = useDispatch();
  const [show, setshow] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [review, setreview] = useState("");
  const [reviews, setreviews] = useState([]);
  const reviewRef = useRef(null);
  const [count, setcout] = useState(0);
  useEffect(() => {
    UserAxios.get("/tutorials/review?id=" + ID).then((res) => {
      if (res.data.status) {
        console.log(res.data.reviews);
        setreviews(res.data.reviews);
      }
    });
  }, [count]);
  useEffect(() => {
    const token = Cookies.get("token");
    UserAxios.get("/tutorials/isReviewed?id=" + ID, {
      headers: { Authorization: token },
    }).then((res) => {
      if (res.data.status) {
        setshow(!res.data.isReview);
      }
    });
  }, [count]);

  function formSubmit() {
    if (userRating == 0) {
      toast({ type: "error", message: "Add rating" });
    } else if (reviewRef.current.value == "") {
      toast({ type: "error", message: "This field required" });
    } else if (reviewRef.current.value.length < 10) {
      toast({ type: "error", message: "Minimum 10 charecters" });
    } else {
      const token = Cookies.get("token");
      UserAxios.post(
        "/tutorials/review",
        { ID, rating: userRating, review },
        { headers: { Authorization: token } }
      ).then((res) => {
        if (res.data.status) {
          toast({ type: "success", message: "Successfully finshed" });
          setshow(false);
          setcout(count + 1);
        } else {
          if (res.data.type == "user") {
            dispatch(LoginShow(true));
          }
        }
      });
    }
  }
  return (
    <div className="flex flex-col flex-grow mt-10 bg-emerald-100 ">
      {show ? (
        <div className="flex flex-col flex-grow m-6 rounded-md border-[1px] border-black">
          <div className="flex  mt-4 px-10">
            {ratingStar.map((rating) => {
              if (rating <= userRating) {
                return (
                  <MdStar
                    onClick={() => setUserRating(rating)}
                    className="text-orange-300 w-6 h-6"
                  />
                );
              } else {
                return (
                  <MdStar
                    onClick={() => setUserRating(rating)}
                    className="text-gray-400 w-6 h-6"
                  />
                );
              }
            })}
          </div>
          <div className="flex justify-center">
            <textarea
              ref={reviewRef}
              onChange={() => setreview(reviewRef.current.value)}
              value={review}
              className=" focus:outline-none p-3 w-full mx-10 my-3 bg-slate-300"
              name=""
              id=""
              rows="5"
            ></textarea>
          </div>
          <div className="flex justify-end px-10 pb-2">
            <button
              onClick={formSubmit}
              className="bg-emerald-500 rounded-md py-1 font-semibold capitalize px-3"
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className=" flex flex-col  flex-grow px-7">
        {reviews.map((value) => {
          return (
            <>
              <div className="flex py-2 ">
                <div style={{width:'48px !important'}} className="">{value.user?.image?
                 <div className="w-12 h-12 rounded-full bg-black">
                     <img className="w-12 h-12 rounded-full bg-black" src={value.user?.image} alt="" />
                 </div>
               
                :
                <div className="w-12 h-12 rounded-full bg-black"></div>}
                </div>

                <div className="flex flex-col pl-2">
                  <p className="flex justify-between">
                    <span className="font-semibold">@{value.user?.name}</span>{" "}
                    <div className="flex ">
                      {ratingStar.map((rating) => {
                        if (rating <=value.rate) {
                          return (
                            <MdStar
                              onClick={() => setUserRating(rating)}
                              className="text-orange-300 w-6 h-6"
                            />
                          );
                        } else {
                          return (
                            <MdStar
                              onClick={() => setUserRating(rating)}
                              className="text-gray-400 w-6 h-6"
                            />
                          );
                        }
                      })}
                    </div>
                  </p>
                  <p className="text-justify break-words px-2 leading-5 capitalize whitespace-normal">
                   <i> {value.review}</i>
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AddTutoriReview;
