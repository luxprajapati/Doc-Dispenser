import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  // const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: { "doc/*": [".pdf", ".docx"] },
  //   onDrop,
  // });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop,
  });

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-300" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-600">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-gray-800" : "bg-zinc-800"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-slate-300`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            }
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-slate-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-zinc-700">
              <FiUploadCloud className="text-2xl text-yellow-400" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-slate-300">
              Drag and drop an pdf or docx, or click to{" "}
              <span className="font-semibold text-yellow-400 ">Browse</span> a
              file
            </p>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-600">
          {label} is required
        </span>
      )}
    </div>
  );
}
