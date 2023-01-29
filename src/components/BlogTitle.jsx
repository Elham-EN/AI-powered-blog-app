import React, { useState } from "react";
import { chatGPTBlogTitle } from "../utils/chatGPT";

export default function BlogTitle() {
  const [titleInput, setTitleInput] = useState("");
  const [titleResponse, setTitleResponse] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await chatGPTBlogTitle(titleInput);
    if (response === "Please write a blog topic") setError(true);
    else setError(false);
    const titles = response.split(",");
    setLoading(false);
    setTitleResponse(titles);
  };

  const handleClickClear = (e) => {
    e.preventDefault();
    setTitleInput("");
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-center text-3xl font-medium">
        AI Powered Blog App 🌈
      </h1>
      <form onSubmit={handleSubmit} className="mt-5 w-full">
        <div className="mb-3 flex flex-col gap-3">
          <label className="text-center font-medium text-lg">
            1. Generate Blog Title
          </label>
          <p className="text-center text-sm text-gray-600">
            For example try: 'The importance of hacing multiple side income'
          </p>
          <div className="flex justify-center relative">
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 
              rounded-lg py-2 px-4 sm:text-lg block w-full appearance-none leading-normal"
              type="text"
              id="blogTitle"
              placeholder="Think of a blog topic"
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <p
              className="absolute right-[15px] top-[10px] text-gray-400 transition duration-300 
            ease-in-out hover:text-gray-800 cursor-pointer"
              onClick={handleClickClear}
            >
              clear
            </p>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out 
            hover:bg-blue-800 font-medium uppercase shadow-md hover:shadow-lg active:bg-blue-800"
          >
            Generate Blog Title
          </button>
        </div>
        <div>
          {loading && (
            <p
              className={`bg-green-500 py-3 px-4 mt-6 text-white block w-full leading-normal rounded`}
            >
              Please wait while your blog titles are being generated...
            </p>
          )}
          {titleResponse && !loading && (
            <>
              {!error && (
                <h3 className="mt-5 text-lg">
                  Select a Blog title from the following list 😎
                </h3>
              )}
              <div
                className={`${
                  error ? "bg-red-500" : "bg-purple-400"
                } py-3 px-4 mt-6 text-white block w-full leading-normal rounded`}
              >
                <ul>
                  {titleResponse.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
