import React from "react";
import CTAbtn from "../components/common/CTAbtn";
import { GrDocumentLocked } from "react-icons/gr";

import { useSelector } from "react-redux";

const Homepage = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="text-slate-300 flex flex-row mx-auto font-poppins sm:my-auto  w-full justify-center items-center">
      <div className="flex flex-col md:flex-row mx-auto my-10 sm:w-10/12 w-11/12  justify-evenly items-center gap-x-10 select-none shadow-[0px_0px_20px_rgba(157,_227,_217,_0.8)] sm:p-16 p-10  rounded-xl">
        {/* left-section */}
        <div className="md:w-[60%] w-full flex flex-row justify-center items-center mx-auto ">
          <div className="flex flex-col justify-center mx-auto my-3 gap-y-7">
            <div className="text-4xl font-bold">
              Simplest Cloud Provider for Document Sharing in India
            </div>
            <div className="text-xl">
              Manage all your documents in one place securely. Share documents
              effortlessly with a single link, eliminating the need to store
              them on your device.
            </div>
            <div className="sm:w-[200px] flex flex-row">
              {!token && (
                <CTAbtn active={true} linkto={"/signup"}>
                  Get Started
                </CTAbtn>
              )}
              {token && (
                <CTAbtn active={true} linkto={"/dashboard"}>
                  {" "}
                  Go to Dashboard
                </CTAbtn>
              )}
            </div>
          </div>
        </div>
        {/* right-section */}
        <div className="sm:w-1/3 flex flex-row justify-center items-center mx-auto">
          <div className="flex flex-row justify-center items-center  ">
            <GrDocumentLocked className="lg:text-[300px] md:text-[200px] sm:text-[100px] text-slate-300 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
