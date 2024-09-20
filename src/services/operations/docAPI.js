import { documentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
  CREATEDOC_API,
  // GETALLDOCS_API,
  EDITDOC_API,
  DELETEDOC_API,
  // REQUESTDOC_API,
  // APPROVEREQUEST_API,
  // REJECTREQUEST_API,
  // VIEWDOC_API,
  GETDOCDETAILS_API,
  SHARE_FORM_LINK_API,
  // SUBMIT_REQUEST_API,
} = documentEndpoints;

export const deleteDocument = async (data, token) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector("DELETE", DELETEDOC_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("DELETE DOC RESPONSE...............", response.data);
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

// export const getAllUserDocuments = async(token);

export const createDocument = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Creating Document...");
  try {
    const response = await apiConnector("POST", CREATEDOC_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("Create Doc Response:- ", response.data.data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Document added successfully");
    result = response.data.data;
  } catch (error) {
    console.log("CREATE DOC ERROR..................", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const editDocumentDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Editing Document...");
  try {
    const response = await apiConnector("POST", EDITDOC_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("Edit Doc Response:- ", response.data.data);
    if (!response.data.success) {
      throw new Error("Failed to edit document");
    }
    toast.success("Document edited successfully");
    result = response.data.data;
  } catch (error) {
    console.log("EDIT DOC ERROR..................", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const getDocumentDetails = async (documentId, token) => {
  const toastId = toast.loading("Fecthing Document Details...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GETDOCDETAILS_API,
      { documentId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("GET DOC DETAILS RESPONSE...............", response.data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET DOC DETAILS ERROR..................", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const shareFormLink = async (data, token) => {
  const toastId = toast.loading("Sharing Form Link...");
  try {
    const response = await apiConnector("POST", SHARE_FORM_LINK_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Form link shared successfully");
  } catch (error) {
    console.log("SHARE FORM LINK ERROR..................", error);
    toast.error("Failed to share form link");
  }
  toast.dismiss(toastId);
};

// export const getDocumentForForm = async (data, token) => {
//   const toastId = toast.loading("Fetching Documents...");
//   try {
//     const response = await apiConnector(
//       "GET",
//       GET_DOCUMENT_FOR_FORM_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );
//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }
//     toast.success("Documents fetched successfully");
//     return response.data.data;
//   } catch (error) {
//     console.log("GET DOCUMENT FOR FORM ERROR..................", error);
//     toast.error("Failed to fetch documents");
//   }
//   toast.dismiss(toastId);
// };
