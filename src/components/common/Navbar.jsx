import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex flex-row  w-full mx-auto text-slate-300 border-b border-slate-300">
      <div className="flex flex-row w-10/12 justify-between items-center mx-auto my-3">
        <div className="text-slate-300 text-3xl font-extrabold  select-none ">
          <NavLink to={"/"} className="text-slate-300">
            docDispenser
          </NavLink>
        </div>
        <div className=" flex-row justify-center gap-x-3 items-center flex ">
          {
            // token === null &&
            <NavLink to="/login">
              <button className="border hidden sm:flex border-slate-300 px-[12px] py-[8px] rounded-md hover:scale-95 transition-all duration-200">
                Log in
              </button>
            </NavLink>
          }
          {
            // token === null &&
            <NavLink to="/signup">
              <button className="border hidden sm:flex border-slate-300 px-[12px] py-[8px] rounded-md hover:scale-95 transition-all duration-200">
                Sign Up
              </button>
            </NavLink>
          }
          {
            // token !== null &&
            // <ProfileDropdown user={user} />
          }

          <button
            className="sm:hidden flex flex-row justify-center items-center"
            onClick={() =>
              alert(
                "Please visit us on desktop for better experience. Thank you!"
              )
            }
          >
            <AiOutlineMenu fontSize={26} fill="#AFB2BF" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
