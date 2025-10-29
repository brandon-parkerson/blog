import { useState, useEffect } from "react";
import { Link, Navigate, redirect, useRoutes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Posts() {
  const URL = "http://localhost:3000/api/posts";
  const writerUrl = "http://localhost:3000/api/writer";
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [redirectUser, setRedirectUser] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  let navigate = useNavigate();

  // on render, get posts from server

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data.posts);
        setPosts(data.posts);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  function handleWriteLink(e) {
    e.preventDefault();
    // set a get route for writer where it checks user writer status
    try {
      async function goToWriter() {
        const id = localStorage.getItem("id");
        const response = await fetch(writerUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
          },
        });
        const data = await response.json();
        console.log(data);
        setServerMessage(data.message);
      }
      goToWriter();
    } catch (error) {
      console.log(error);
    }
  }
  if (serverMessage === "Access Granted") {
    navigate("/write");
  }
  return (
    <>
      <h1>Posts</h1>
      <Link to={"/write"} onClick={handleWriteLink}>
        Write a post
      </Link>
      <p>{serverMessage}</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <Link to={`/article/${post.id}`}>Read</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
