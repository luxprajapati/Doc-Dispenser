import React from "react";
import { useSelector } from "react-redux";
import { deleteDocument } from "../../services/operations/docAPI";
// import toast from "react-hot-toast";

const ConfirmModal = ({ onClose, setIsModalOpen, getAllDocs, docId }) => {
  const { token } = useSelector((state) => state.auth);

  const handleDelete = async (docId) => {
    // const toastId = toast.loading("Deleting document...");
    try {
      await deleteDocument({ documentId: docId }, token);
      // Fetch the updated list of documents
      await getAllDocs();
      // toast.success("Document deleted successfully");
    } catch (error) {
      console.log("Error deleting document:", error);
      // toast.error("Failed to delete document");
    } finally {
      // toast.dismiss(toastId);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-[17px]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-zinc-900 opacity-10 cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-lg absolute shadow-lg z-60 max-w-sm w-full p-6 mx-4">
        <p className="text-gray-700 font-semibold mb-6 text-[17px] leading-[24px]">
          Are you sure you want to delete this document? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-zinc-900  rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(docId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
