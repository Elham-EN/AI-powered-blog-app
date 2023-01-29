import React, { useState } from "react";
import { chatGPTBlogSH } from "../utils/chatGPT";

export default function BlogSubHeading() {
  const [titleInput, setTitleInput] = useState("");
  const [titleResponse, setTitleResponse] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await chatGPTBlogSH(titleInput);
    if (response === "Please copy your selected blog title from the above")
      setError(true);
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
    <div className="flex flex-col items-center mt-3">
      <form onSubmit={handleSubmit} className="mt-5 w-full">
        <div className="mb-3 flex flex-col gap-3">
          <label className="text-center font-medium text-lg">
            2. Generate Subheadings for you Blog Title
          </label>
          <p className="text-center text-sm text-gray-600">
            Instruction: Copy and paste your selected Blog title from above
          </p>
          <div className="flex justify-center relative">
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 
                rounded-lg py-2 px-4 sm:text-lg block w-full appearance-none leading-normal"
              type="text"
              id="blogTitle"
              placeholder="Paste your chosen blog title here"
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
            Generate Blog Subheadings
          </button>
        </div>
        <div>
          {loading && (
            <p
              className={`bg-green-500 py-3 px-4 mt-6 text-white block w-full leading-normal rounded`}
            >
              Please wait while your subheadings are being generated...
            </p>
          )}
          {titleResponse && !loading && (
            <>
              {!error && (
                <h3 className="mt-5 text-lg">
                  Here are your list of generated sub headings 😀
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
