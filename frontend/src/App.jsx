import { useEffect, useState } from "react";

import "./App.css";

async function getUser() {
  const URL = "http://localhost:3000/";
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

function App() {
  getUser();
  return (
    <>
      <div>test 4</div>
    </>
  );
}

export default App;
