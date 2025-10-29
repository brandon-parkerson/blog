import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const id = localStorage.getItem("id");
      console.log(id);
      const response = await fetch("http://localhost:3000/api/writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, title: title, post: post }),
      });
      const data = response.json();
      const message = data.message;
      setServerMessage(message);
    } catch (error) {
      console.log(error);
    }
  }
  function handleTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }

  function handlePost(e) {
    const post = e.target.value;
    setPost(post);
  }

  function handleHome() {
    navigate("/posts");
  }

  return (
    <>
      <h1>Write a post</h1>
      <form>
        <input
          type="text"
          placeholder="title"
          id="title"
          name="title"
          onChange={handleTitle}
        />
        <textarea
          name="article"
          id="article"
          rows={20}
          cols={50}
          placeholder="Write your post..."
          onChange={handlePost}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Publish
        </button>
      </form>
      <p>{serverMessage}</p>
      <button onClick={handleHome}>Home</button>
    </>
  );
}
