import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signup } from "../../services/authService";
import { UserContext } from "../../context/UserContext";
import SignUpIcon from "../../assets/images/signup.svg";
import styles from "./SignUpForm.module.css";


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext)
  const { username, password, passwordConf } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the browser from refreshing on form submit
    console.log(formData);
    try {
        const user = await signup(formData)
        console.log(user)
        setUser(user)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className={styles.container}>
      <section>
        <img src={SignUpIcon} alt="An owl sitting on a sign" />
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
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
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
