import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Posts from "./Posts";
import "./App.css";

function App() {
  const URL = "http://localhost:3000/";
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
      </Routes>
    </>
  );
}

export default App;
