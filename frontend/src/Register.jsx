import "./App.css";

function Register() {
    return (
        <form method="post" action="http://localhost:3000/api/register">
            <label htmlFor="name">Name: 
                <input type="text" name="name" id="name" required/>
            </label>
            <label htmlFor="email">Email:
                <input type="email" name="email" id="email" required />
            </label>
            <label htmlFor="password">Password:
                <input type="password" name="password" id="password" required />
            </label>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register