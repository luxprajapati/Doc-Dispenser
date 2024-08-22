import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { documentEndpoints } from "../services/apis";
import ConfirmModal from "../components/common/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentDetails } from "../services/operations/docAPI";
import { setDocument, setEditDocument } from "../redux/slices/docSlice";

const Dashboard = () => {
  const [docList, setDocList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docId, setDocId] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  // const { token } = useSelector((state) => state.auth);
  // const { documentId } = useParams();
  const dispatch = useDispatch();

  const getAllDocs = async () => {
    const toastId = toast.loading("Loading...");
    let documentList = [];
    try {
      const response = await apiConnector(
        "GET",
        documentEndpoints.GETALLDOCS_API
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      documentList = response.data.data;
      setDocList(documentList);
    } catch (error) {
      console.log("GETALLDOCS_API ERROR..................", error);
      toast.error("Failed to get all documents");
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleEdit = async () => {
  //   const result = await getDocumentDetails(documentId, token);
  //   console.log("Document Details:- ", result);
  //   if (result) {
  //     // dispatch(setEditDocument(true));
  //     dispatch(setDocument(result));
  //   }
  // };

  return (
    <div className=" flex flex-col justify-center items-start gap-y-10  w-11/12 md:w-10/12 mx-auto my-9 ">
      {/* Create documents */}
      <div onClick={() => navigate("/create-document")}>
        <NavLink to="/create-document">
          <div className="flex flow-row gap-x-1 justify-start items-center border border-slate-300 text-slate-300 px-5 py-2 rounded-md cursor-pointer hover:scale-95 transition-all duration-300 shadow-[rgba(135,_135,_44,_0.4)_0px_0px_0px_2px,_rgba(136,_124,_144,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <HiOutlineDocumentPlus className="text-2xl font-bold " />
            <p className="text-xl font-poppins font-bold">New Document</p>
          </div>
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
              <div className=" md:w-[75%] w-[60%] cursor-pointer font-poppins">
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
                    // handleEdit();
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
        </div>
      </div>

      {/* Confirmation modal */}
      {isModalOpen && (
        <ConfirmModal
          onClose={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          getAllDocs={getAllDocs}
          docId={docId}
        />
      )}
    </div>
  );
};

export default Dashboard;
