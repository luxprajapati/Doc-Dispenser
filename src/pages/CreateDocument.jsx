import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {
  createDocument,
  editDocumentDetails,
  getDocumentDetails,
} from "../services/operations/docAPI";
import { setDocument, setEditDocument } from "../redux/slices/docSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
// import Upload from "../components/common/Upload";

const CreateDocument = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { document, editDocument } = useSelector((state) => state.doc);
  const { documentId } = useParams();

  const isFormUpdated = () => {
    const currentValues = getValue();
    console.log("CurrentValue for edit document: - ", currentValues);
    if (
      currentValues.documentName !== document.documentName ||
      currentValues.doc !== document.doc
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (editDocument) {
      if (isFormUpdated()) {
        const currentValues = getValue();
        const formData = new FormData();
        formData.append("documentId", document._id);
        if (currentValues.documentName !== document.documentName) {
          formData.append("documentName", currentValues.documentName);
        }
        if (currentValues.doc !== document.doc) {
          formData.append("doc", currentValues.doc[0]);
        }

        const result = await editDocumentDetails(formData, token);
        if (result) {
          dispatch(setDocument(result));
        } else {
          toast.error("No changes done to the document");
        }
        navigate("/dashboard");
      }
    }

    const formData = new FormData();
    formData.append("documentName", data.documentName);
    formData.append("doc", data.doc[0]);

    const result = await createDocument(formData, token);
    if (result) {
      dispatch(setDocument(result));
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    (async () => {
      console.log("DocumentId CreateDocument.jsx:- ", documentId);
      const result = await getDocumentDetails(documentId, token);
      console.log("Document Details:- ", result);
      if (result) {
        // dispatch(setEditDocument(true));
        dispatch(setDocument(result));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-11/12 md:w-10/12 mx-auto">
      <div className="text-2xl text-slate-300 font-semibold font-poppins my-5 mt-16">
        {editDocument ? "Edit" : "Create"} Document
      </div>
      <div className="min-w-full text-xl md:text-2xl  rounded-xl  overflow-y-scroll custom-scrollbar text-slate-300 border border-dotted shadow-[0px_0px_5px_rgba(157,_227,_217,_0.8)] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-y-5 m-7"
        >
          {/* Document name */}
          <div>
            <label className="text-sm text-richblack-5" htmlFor="documentName">
              Document Name <sup className="text-pink-600">*</sup>
            </label>
            <input
              id="documentName"
              placeholder="Enter document name"
              {...register("documentName", { required: true })}
              className="form-style w-full"
            />
            {errors.documentName && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Document name is required
              </span>
            )}
          </div>
          {/* Document File */}
          <div>
            <label htmlFor="doc" className="text-sm ">
              Document File <sup className="text-pink-600">*</sup>
            </label>
            <input
              id="doc"
              type="file"
              {...register("doc", { required: true })}
              className="form-style w-full cursor-pointer"
              accept=".pdf,.docx"
            />
            {errors.doc && (
              <span className="ml-2 text-xs tracking-wide text-pink-600">
                Document File is required
              </span>
            )}
          </div>

          {/* Add document butn */}
          <div className="flex flex-row justify-end w-full">
            <button
              type="submit"
              className="bg-slate-300 hover:bg-slate-400  transition-all duration-200 text-zinc-900 p-2 font-semibold font-poppins rounded-md w-full text-sm mt-5"
            >
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
