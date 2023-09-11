import React from "react";
import { AiFillTwitterSquare } from "react-icons/ai";
import { BiLogoWhatsappSquare } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex justify-center bg-gray-800">
      <div className="w-4/5">
        <div className="flex flex-col items-center md:justify-between">
          <div className="flex items-center py-4 flex-shrink-0  ">
            <img
              className="w-10  h-10 "
              src="/logo-icon.png"
              alt="Your Company"
            />
            <p className="text-white text-3xl -mt-1 font-sans font-bold">
              Codesgalaxy
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center flex-grow">
            <div className="space-x-3 flex justify-center md:justify-end items-center">
              <FaInstagramSquare className="text-white         w-9 h-9" />
              <FaFacebookSquare className="text-white    w-9 h-9" />
              <AiFillTwitterSquare className="text-white w-10 h-10" />
              <BiLogoWhatsappSquare className="text-white w-10 h-10" />
            </div>

            {/* <FaSquareWhatsapp/> */}
          </div>
        </div>
        <div className="flex flex-col md:text-base text-xs whitespace-nowrap items-center mb-5 justify-center text-white">
          <p >
            CodePen Home ©2023 CodePen Demo or it didn't happen. </p><p> Terms of
            Service · Privacy Policy
           </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
