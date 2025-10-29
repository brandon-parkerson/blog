import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Article() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const URL = `http://localhost:3000/api/content`;
  const token = localStorage.getItem("token");
  // get comments for the current article on page load
  useEffect(() => {
    try {
      async function fetchContent() {
        console.log(id);
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            id: id,
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        console.log(data.post.content);

        setContent(data.post.content);
        // setContent(data.content);
      }
      fetchContent();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // get content

  return (
    <>
      <h1>Article</h1>
      <p>content of: {id}</p>

      <Link to={"/posts"}>Home</Link>
      <div className="comment-section"></div>
      <div>{content}</div>
    </>
  );
}

export default Article;
