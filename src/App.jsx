import * as React from "react";
import BlogTitle from "./components/BlogTitle";
import BlogSubHeading from "./components/BlogSubHeading";
import BlogSubHeadingContent from "./components/BlogSubHeadingContent";
import "./App.css";

function App() {
  return (
    <div className="container max-w-4xl mx-auto mb-10">
      <BlogTitle />
      <BlogSubHeading />
      <BlogSubHeadingContent />
    </div>
  );
}

export default App;
