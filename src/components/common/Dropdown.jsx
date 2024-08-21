import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

// icons
import { VscDashboard, VscSignOut } from "react-icons/vsc";
// import { MdOutlineManageAccounts } from "react-icons/md";

// hooks
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function Dropdown({ setOpen, open }) {
  // const {  } = useSelector((state) => state.auth);
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  // if (!user) return null;
  // console.log("Signup Data", signupData);

  return (
    <button
      className="relative"
      // onClick={() => setOpen(true)}
    >
      <div className="flex items-center gap-x-1 ">
        {/* <div></div> */}
        {/* <AiOutlineCaretDown className="text-sm text-richblack-100" /> */}
        {/* <MdOutlineManageAccounts className="text-3xl text-richblack-100" /> */}
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[34px] right-[-30px] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-zinc-900 "
          ref={ref}
        >
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
