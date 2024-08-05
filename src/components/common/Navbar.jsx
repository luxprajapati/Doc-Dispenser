import React from "react";
import { matchPath, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  // console.log("token", token);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div
      className={`flex flex-row  w-full mx-auto text-slate-300 
        ${
          matchRoute(`login`) || matchRoute(`signup`)
            ? "shadow-[0px_6px_6px_rgba(21,_22,_23,_0.6)] bg-slate-100"
            : "shadow-[0px_4px_6px_rgba(155,_175,_189,_0.6)] bg-zinc-900"
        }`}
    >
      <div className="flex flex-row w-10/12 justify-between items-center mx-auto my-3">
        <div className="text-slate-300 text-3xl font-extrabold  select-none ">
          <NavLink
            to={"/"}
            className={`${matchRoute(`login`) || matchRoute(`signup`) ? "text-zinc-900" : "text-slate-300"}`}
          >
            docDispenser
          </NavLink>
        </div>
        <div className=" flex-row justify-center gap-x-3 items-center flex ">
          {token === null && (
            <NavLink to="/login">
              <button
                className={`border hidden sm:flex  px-[12px] py-[8px] rounded-md hover:scale-95 transition-all duration-200 
                  ${matchRoute(`login`) || matchRoute(`signup`) ? "text-zinc-900 border-zinc-900" : "text-slate-300 border-slate-300"} font-bold `}
              >
                Log in
              </button>
            </NavLink>
          )}
          {token === null && (
            <NavLink to="/signup">
              <button
                className={`border hidden sm:flex px-[12px] py-[8px] rounded-md hover:scale-95 transition-all duration-200
                ${matchRoute(`login`) || matchRoute(`signup`) ? "text-zinc-900 border-zinc-900" : "text-slate-300 border-slate-300"} font-bold
                `}
              >
                Sign Up
              </button>
            </NavLink>
          )}
          {token !== null && (
            <button
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className={`border hidden sm:flex px-[12px] py-[8px] rounded-md hover:scale-95 transition-all duration-200
                ${matchRoute(`login`) || matchRoute(`signup`) ? "text-zinc-900 border-zinc-900" : "text-slate-300 border-slate-300"} font-bold
                `}
            >
              Logout
            </button>
          )}
          {token !== null && <ProfileDropdown />}

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
