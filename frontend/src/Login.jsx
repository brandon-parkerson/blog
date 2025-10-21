import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      const message = data.message;
      console.log(data);
      console.log(message);
      setServerMessage(message);
    } catch {
      console.log(error);
    }
  };
  // the problem was that i did not use the .json() func to read the data the server was sending back

  function handleChangeEmail(e) {
    const email = e.target.value;
    setEmail(email);
  }

  function handleChangePassword(e) {
    const password = e.target.value;
    setPassword(password);
  }

  return (
    <>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" onChange={handleChangeEmail} />
        </label>
        <label htmlFor="password">
          password
          <input type="password" name="password" id="password" onChange={handleChangePassword}/>
        </label>
        <button type="submit" className="login-form-submit-btn">
          Submit
        </button>
        <p>{serverMessage}</p>
      </form>
      <Link to="/register">Register</Link>
      
    </>
  );
}

export default Login;
