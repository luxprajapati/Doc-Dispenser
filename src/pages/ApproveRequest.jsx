import React, {  useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { documentEndpoints } from "../services/apis";
// import { FaRegCircleCheck } from "react-icons/fa6";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ApproveRequest = () => {
  const query = useQuery();
  const documents = query.get("documents");
  const email = query.get("email");
  const [approved, setApproved] = useState(null);

  const approveRequest = async () => {
    const toastId = toast.loading("Approving request...");
    try {
      await apiConnector(
        "GET",
        documentEndpoints.APPROVEREQUEST_API,
        null, // No body data for GET request
        null, // No custom headers
        {
          documents: encodeURIComponent(JSON.stringify(documents)),
          email,
        }
      );
      setApproved(true);
    } catch (error) {
      console.log("Error while approving request", error);
      setApproved(false);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-auto mx-auto">
        {approved === null && (
          <h1 className="text-xl font-semibold text-gray-700">
            Are you sure you want to Approved the request?
          </h1>
        )}
        {approved && (
          <h1 className="text-xl font-semibold text-green-600  text-balance text-center">
            Request Approved. Thank you for using Docdispenser!
          </h1>
        )}
        {approved === false && (
          <h1 className="text-xl font-semibold text-red-600">
            Failed to Approve Request
          </h1>
        )}
        <button
          onClick={() => approveRequest()}
          disabled={approved}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600
          disabled:hidden"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default ApproveRequest;
