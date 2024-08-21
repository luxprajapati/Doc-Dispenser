import { setLoading, setToken } from "../../redux/slices/authSlice";
import { documentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
  CREATEDOC_API,
  GETALLDOCS_API,
  EDITDOC_API,
  DELETEDOC_API,
  REQUESTDOC_API,
  APPROVEREQUEST_API,
  REJECTREQUEST_API,
  VIEWDOC_API,
} = documentEndpoints;

export const deleteDocument = async (data, token) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector("DELETE", DELETEDOC_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE DOC RESPONSE...............", response.data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Document deleted successfully");
  } catch (error) {
    console.log("DELETE DOC ERROR..................", error);
    toast.error("Failed to delete document");
  }
  toast.dismiss(toastId);
};
