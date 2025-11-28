import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function Blog() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/posts/first-post.md")
      .then((res) => res.text())
      .then((txt) => setContent(txt));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Blog</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Blog;
