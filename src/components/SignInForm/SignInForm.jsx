import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signin } from "../../services/authService";
import { UserContext } from "../../context/UserContext";
import LoginIcon from "../../assets/images/login.svg";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext)
  const { username, password } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the browser from refreshing on form submit
    console.log(formData);
    try {
        const user = await signin(formData)
        console.log(user)
        setUser(user)
        navigate('/')
    } catch (error) {
        console.log(error)
        setMessage(error.message)
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main className={styles.container}>
      <section>
        <img src={LoginIcon} alt="An owl sitting on a sign" />
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button disabled={isFormInvalid()}>Sign In</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignInForm;
