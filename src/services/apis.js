const BASE_URL = process.env.REACT_APP_BASE_URI;
console.log("BASE_URL:- ", BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  GOOGLEAUTH_API: BASE_URL + "/google-auth/google",
  RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API: BASE_URL + "/auth/change-password",
};

// DOCUMENT ENDPOINTS
export const documentEndpoints = {
  CREATEDOC_API: BASE_URL + "/document/create-document",
  GETALLDOCS_API: BASE_URL + "/document/get-all-documents",
  EDITDOC_API: BASE_URL + "/document/edit-document",
  DELETEDOC_API: BASE_URL + "/document/delete-document",
  GETDOCDETAILS_API: BASE_URL + "/document/get-document-details",
  GETUSERDOCUMENTS_API: BASE_URL + "/document/get-all-documents-of-user",
  SHARE_FORM_LINK_API: BASE_URL + "/document/share-form-link",
  GET_DOCUMENT_FOR_FORM_API:
    BASE_URL + "/document/get-documents-for-form/:token",
  SUBMIT_REQUEST_API: BASE_URL + "/document/send-mail-to-owner/:token",

  APPROVEREQUEST_API: BASE_URL + "/document/approve-request",
  REJECTREQUEST_API: BASE_URL + "/document/reject-request",

  REQUESTDOC_API: BASE_URL + "/document/request-documents",
  VIEWDOC_API: BASE_URL + "/document/view-document",
};
