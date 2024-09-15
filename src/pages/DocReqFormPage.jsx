import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const DocReqFormPage = () => {
  const { token } = useParams();
  console.log("token->", token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // Dummy document list for the checkboxes
  const documentList = [
    "Document 1",
    "Document 2",
    "Document 3",
    "Document 4",
    "Document 5",
    "Document 6",
    "Document 7",
    "Document 8",
    "Document 9",
    "Document 10",
    "Document 11",
    "Document 12",
  ];

  return (
    <div className="flex justify-center items-center my-16 bg-zinc-900">
      {token ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 bg-zinc-900 text-slate-300 p-6 rounded-lg shadow-lg border border-slate-500 font-poppins"
        >
          <div className="mb-6">
            <label className="block text-slate-300 text-lg mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 bg-zinc-800 text-slate-300 border border-slate-500 rounded focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-slate-300 text-lg mb-2"
              htmlFor="email"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 bg-zinc-800 text-slate-300 border border-slate-500 rounded focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-lg mb-2 ">
              Select Documents <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 h-[130px] overflow-y-scroll border border-slate-500 rounded pl-4 pt-1 custom-scrollbarrr">
              {documentList.map((doc, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`doc-${index}`}
                    {...register("documents")}
                    value={doc}
                    className="mr-2 text-green-500 border-slate-500 bg-zinc-800 focus:ring-green-500"
                  />
                  <label htmlFor={`doc-${index}`} className="text-slate-300">
                    {doc}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded focus:outline-none"
          >
            Submit
          </button>
        </form>
      ) : (
        <h1 className="text-red-500 text-3xl font-bold">
          Link expired, Request to the owner for new form
        </h1>
      )}
    </div>
  );
};

export default DocReqFormPage;
