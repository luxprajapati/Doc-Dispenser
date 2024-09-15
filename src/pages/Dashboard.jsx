import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegShareFromSquare } from "react-icons/fa6";

import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { documentEndpoints } from "../services/apis";
import { setEditDocument } from "../redux/slices/docSlice";

import ConfirmModal from "../components/common/ConfirmModal";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const [docList, setDocList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docId, setDocId] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const getAllDocs = async () => {
  //   const toastId = toast.loading("Loading Documents...");

  //   let documentList = [];
  //   try {
  //     const response = await apiConnector(
  //       "GET",
  //       documentEndpoints.GETALLDOCS_API
  //     );
  //     if (!response.data.success) {
  //       throw new Error(response.data.message);
  //     }
  //     documentList = response.data.data;

  //     // const userDocumentList = documentList.filter();

  //     setDocList(documentList);
  //   } catch (error) {
  //     console.log("GETALLDOCS_API ERROR..................", error);
  //     toast.error("Failed to get all documents");
  //   } finally {
  //     toast.dismiss(toastId);
  //   }
  // };

  // useEffect(() => {
  //   getAllDocs();
  // }, []);

  const getUserAllDocs = async () => {
    const toastId = toast.loading("Loading your documents...");
    let documentList = [];
    const userDocResponse = await apiConnector(
      "GET",
      documentEndpoints.GETUSERDOCUMENTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!userDocResponse.data.success) {
      throw new Error(userDocResponse.data.message);
    }
    documentList = userDocResponse.data.data;
    setDocList(documentList);
    try {
    } catch (error) {
      console.log("GETUSERDOCUMENTS_API ERROR..................", error);
      toast.error("Failed to get all documents");
    } finally {
      toast.dismiss(toastId);
    }
  };
  useEffect(() => {
    getUserAllDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event listener for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable common screenshot keyboard shortcuts
    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "p") ||
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "Shift" && e.key === "s")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log("docList->", docList);
  return (
    <div className=" flex flex-col justify-center items-start gap-y-10  w-11/12 md:w-10/12 mx-auto my-9 ">
      {/* Create documents */}
      <div
        className="flex flow-row justify-between w-full"
        // onClick={() => navigate("/create-document")}
      >
        <NavLink to="/create-document">
          <div className="flex flow-row gap-x-1 justify-start items-center border border-slate-300 text-slate-300 px-5 py-2 rounded-md cursor-pointer hover:scale-95 transition-all duration-300 shadow-[rgba(135,_135,_44,_0.4)_0px_0px_0px_2px,_rgba(136,_124,_144,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <HiOutlineDocumentPlus className="text-2xl font-bold " />
            <p className="text-xl font-poppins font-bold">Add Document</p>
          </div>
        </NavLink>
        <NavLink
          to="/share-document"
          onClick={() => navigate("/share-document")}
        >
          {docList.length > 0 && (
            <div className="flex flow-row gap-x-1 justify-start items-center border border-slate-300  hover:text-yellow-400 hover:border-yellow-400 text-slate-300 px-5 py-2 rounded-md cursor-pointer hover:scale-95 transition-all duration-300 shadow-[rgba(135,_135,_44,_0.4)_0px_0px_0px_2px,_rgba(136,_124,_144,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
              <FaRegShareFromSquare className="text-2xl font-bold  " />
              {/* <p className="text-xl font-poppins font-bold">Add Document</p> */}
            </div>
          )}
        </NavLink>
      </div>
      {/* documents */}
      <div className="min-w-full text-xl md:text-2xl h-[70vh] overflow-y-scroll custom-scrollbar ">
        <div className="flex flex-col gap-y-6">
          {docList.map((doc) => (
            <div
              className="flex flex-row justify-between border-l-0 border-r-0 border-t border-slate-400 border-opacity-50 rounded-md p-4 text-slate-300"
              key={doc._id}
            >
              <div
                className=" md:w-[75%] w-[60%] cursor-pointer font-poppins"
                onClick={() => {
                  window.open(doc.file);
                }}
              >
                {windowWidth <= 375
                  ? doc.documentName.length > 15
                    ? `${doc.documentName.slice(0, 12)}...`
                    : doc.documentName
                  : doc.documentName}
              </div>
              <div className="md:w-[25%] w-[40%] flex flex-row justify-evenly  ">
                <button
                  onClick={() => {
                    dispatch(setEditDocument(true));
                    navigate(`/edit-document/${doc._id}`);
                  }}
                  className="text-yellow-400 p-2 rounded-lg bg-yellow-700 
                hover:bg-transparent hover:border border border-yellow-700 hover:border-yellow-700 transition-all duration-300 sm:w-auto sm:h-auto w-[40px] h-[40px]
                "
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setDocId(doc._id);
                  }}
                  className="text-red-600 p-2 rounded-lg  bg-red-400
                hover:bg-transparent hover:border border border-red-400 hover:border-red-400 transition-all duration-300 sm:w-auto sm:h-auto w-[40px] h-[40px]
                "
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          ))}

          {docList.length === 0 && (
            <div className="flex flex-row  justify-center items-center capitalize text-center text-slate-300 font-poppins font-semibold text-2xl">
              No document Found. You need to Add Document First.
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {isModalOpen && (
        <ConfirmModal
          onClose={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          getAllDocs={getUserAllDocs}
          // getAllDocs={getAllDocs}
          docId={docId}
          BB
        />
      )}
    </div>
  );
};

export default Dashboard;
