import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Article() {
  const [articleDate, setArticleDate] = useState("");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const URL = `http://localhost:3000/api/content`;
  const commentURL = `http://localhost:3000/api/comments`;
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
        setTitle(data.post.title);
        // setArticleDate(data.post.createdAt);
        const date = new Date(data.post.createdAt);
        setArticleDate(date.toDateString());
      }

      async function fetchComments() {
        const response = await fetch(commentURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            postId: id,
          },
        });
        const data = await response.json();
        console.log(data.comments);
        setComments(data.comments);
      }

      fetchComments();
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
    const userId = localStorage.getItem("id");
    try {
      const response = await fetch("http://localhost:3000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: comment,
          postId: id,
          userId: userId,
        }),
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
      <div className="write-page">
        <Link to={"/posts"}>Home</Link>
        <h1>{title}</h1>
        <h2>{articleDate}</h2>
        <div>{content}</div>
        <form onSubmit={handleCommentSubmit} className="">
          <input
            type="text"
            placeholder="Leave a comment..."
            onChange={handleComment}
          ></input>
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <i>-{comment.author.name}</i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Article;
