import React from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { documentEndpoints } from "../services/apis";

const RejectRequest = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const email = useQuery().get("email");

  const [requestRejected, setRequestRejected] = React.useState(null);

  const rejectRequest = async () => {
    const toastId = toast.loading("Rejecting request...");
    try {
      await apiConnector(
        "GET",
        documentEndpoints.REJECTREQUEST_API,
        null,
        null,
        { email }
      );
      setRequestRejected(true);
    } catch (error) {
      console.log("Error while rejecting request", error);
      setRequestRejected(false);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-auto mx-auto">
        {requestRejected === null && (
          <h1 className="text-xl font-semibold text-gray-700">
            Are you sure you want to reject the request?
          </h1>
        )}
        {requestRejected && (
          <h1 className="text-xl font-semibold text-green-600  text-balance text-center">
            Request Rejected. Thank you for using Docdispenser!
          </h1>
        )}
        {requestRejected === false && (
          <h1 className="text-xl font-semibold text-red-600">
            Failed to Reject Request
          </h1>
        )}
        <button
          onClick={() => rejectRequest()}
          disabled={requestRejected}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600
          disabled:hidden"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RejectRequest;
