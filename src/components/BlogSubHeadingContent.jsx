import React, { useState } from "react";
import { chatGPTBlogSHContent } from "../utils/chatGPT";

export default function BlogSubHeadingContent() {
  const [titleInput, setTitleInput] = useState("");
  const [titleResponse, setTitleResponse] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await chatGPTBlogSHContent(titleInput);
    if (response === "Please copy and paste your subheading from above")
      setError(true);
    else setError(false);
    setLoading(false);
    setTitleResponse(response);
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
            3. Generate Content for each Subheading
          </label>
          <p className="text-center text-sm text-gray-600">
            Instruction: copy and paste one subheading at a time
          </p>
          <div className="flex justify-center relative">
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 
                rounded-lg py-2 px-4 sm:text-lg block w-full appearance-none leading-normal"
              type="text"
              id="blogTitle"
              placeholder="Paste your subheading here"
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
            Generate Subheading content
          </button>
        </div>
        <div>
          {loading && (
            <p
              className={`bg-green-500 py-3 px-4 mt-6 text-white block w-full leading-normal rounded`}
            >
              Please wait while your subheading's content is being generated...
            </p>
          )}
          {titleResponse && !loading && (
            <>
              {!error && (
                <h3 className="mt-5 text-lg">
                  Here is the content for this subheading:
                  <span className="text-lg font-semibold">{titleInput}</span> 😉
                </h3>
              )}
              <div
                className={`${
                  error ? "bg-red-500" : "bg-purple-400"
                } py-3 px-4 mt-6 text-white block w-full leading-normal rounded`}
              >
                {titleResponse}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
