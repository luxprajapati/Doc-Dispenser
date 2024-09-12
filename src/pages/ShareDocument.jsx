import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { shareFormLink } from "../services/operations/docAPI";

const ShareDocument = () => {
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(`Sending invite to: ${data.email}`);
    shareFormLink(data, token);
    reset();
  };

  return (
    <div className="flex flex-col justify-center items-center h-[400px] md:h-[200px] w-full  font-poppins">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-6 sm:space-x-4 bg-zinc-900 border border-gray-500 w-[90%] md:w-[70%]  p-4 rounded-lg shadow-lg"
      >
        <label
          htmlFor="email"
          className="text-white font-semibold flex relative justify-between items-center gap-6 w-[100%] sm:w-[60%]"
        >
          Email
          <input
            type="email"
            id="email"
            placeholder="contact@email.com"
            {...register("email", { required: "Email is required" })}
            className="p-2 border w-[100%] border-gray-300 rounded-md focus:outline-none focus:border-indigo-500
           bg-zinc-100 text-zinc-700 transition duration-300 font-poppins
            "
          />
          {errors.email && (
            <span className="text-red-500 absolute top-[-40px] left-0">
              {errors.email.message}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition duration-300"
        >
          Send Form
        </button>
      </form>
    </div>
  );
};

export default ShareDocument;
