"use client";
import React, { useState } from "react";
import './styles/style.css';

const FetchWebsite = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const fetchWebsiteContent = async () => {
    try {
      const encodedUrl = encodeURIComponent(url);
      console.log("Encoded URL:", encodedUrl);

      const response = await fetch(`/api/fetch-website?url=${encodedUrl}`);
      
      if (response.ok) {
        const data = await response.text();
        console.log("Fetched content:", data);
        setContent(data);
      } else {
        console.error("Error response:", response);
        setContent("<p>An error occurred while loading the website.</p>");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setContent("<p>An error occurred while fetching the website.</p>");
    }
  };

  return (
    <div>
      <h1 className="title">Webpage Viewer</h1>
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button onClick={fetchWebsiteContent}>Fetch Website</button>
      </div>
      <div>{content && <FetchWebsite content={content} />}</div>
    </div>
  );
};

export default Home;
