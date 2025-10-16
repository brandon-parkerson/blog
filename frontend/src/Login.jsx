import {Link, Route, Routes} from "react-router-dom"
function Login() {
  const URL = "http://localhost:3000/";
  return (
    <>
      <h1>Login</h1>
      <form
        action="http://localhost:3000/login"
        method="post"
        className="login-form"
      >
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          password
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit" className="login-form-submit-btn">
          Submit
        </button>
        <button type="button" className="register-btn">
          Register
        </button>
        {/* clicking should redirect to register page*/}
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;
