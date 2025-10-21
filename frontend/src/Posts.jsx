import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const URL = "http://localhost:3000/api/posts";
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);

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

  return (
    <>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}<Link to={`/article/${post.id}`}>Read</Link></li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
