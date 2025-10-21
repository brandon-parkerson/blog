import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { use } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  let navigate = useNavigate();

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
      const token = data.token;
      if (message === "email not found") {
        setServerMessage(message);
      } else if (message === "wrong password") {
        setServerMessage(message);
      } else {
        setServerMessage(message);
        localStorage.setItem("token", token);
        setRedirect(true);
        console.log(data);
        console.log(message);
        console.log(token);
      }
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

  if (redirect === true) {
    navigate("/posts");
  }

  return (
    <>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChangeEmail}
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChangePassword}
          />
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
