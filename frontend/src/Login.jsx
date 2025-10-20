import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      console.log(response);
    } catch {
      console.log(error);
    }
  };

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
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;
