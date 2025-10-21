import { useState, useEffect } from "react";

function Posts() {
  const URL = "http://localhost:3000/api/posts";
  const token = localStorage.getItem("token");
  // on render, get posts from server
  const [posts, setPosts] = useState("");
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
        const allPosts = data.posts;

        console.log(allPosts[0].title);
        return setPosts(allPosts[0].title);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <p>{posts}</p>
    </>
  );
}

export default Posts;
