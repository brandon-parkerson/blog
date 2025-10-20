import "./App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegistered, setIsRegistered] = useState(false);

  const checkRegistered = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const result = await response.json();
      console.log(result);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  function addName(e) {
    const name = e.target.value;
    setName(name);
  }

  function addEmail(e) {
    const email = e.target.value;
    setEmail(email);
  }

  function addPassword(e) {
    const password = e.target.value;
    setPassword(password);
  }
  return (
    <>
      <form onSubmit={checkRegistered}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={addName}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={addEmail}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={addPassword}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <Link to="/">Back to login</Link>
      {isRegistered ? (<p>Success!</p>) : (<p>Not registered yet</p>)} 
    </>
  );
}

export default Register;
