import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Article() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [title, setTtitle] = useState("");
  const [comment, setComment] = useState("");
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
        setTtitle(data.post.title);
        // setContent(data.content);
      }
      fetchContent();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  function handleComment(e) {
    const comment = e.target.value;
    setComment(comment);
  }

  async function handleCommentSubmit() {
    // post to db
    try {
      const response = await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment, postId: id }),
      });
      const data = response.json();
      const message = data.message;
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Link to={"/posts"}>Home</Link>
      <h1>{title}</h1>
      <div>{content}</div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Leave a comment..."
          onChange={handleComment}
        ></input>
        <button type="submit">Add comment</button>
      </form>
      <div className="comment-section">{comments}</div>
    </>
  );
}

export default Article;
