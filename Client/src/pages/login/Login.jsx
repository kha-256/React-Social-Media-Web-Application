import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/slices/Userslice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in the required fields");
      return;
    }

    const response = await dispatch(userLogin(formData));

    if (!response.error) {
      setFormData({ email: "", password: "" });
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1 className="loginLeftTitle">Social Media App</h1>
          <span className="loginLeftDesc">
            Connect with your friends and the world around you on Social Media App.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginForm" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              className="loginInput"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
            <span onClick={() => setPasswordVisible(!passwordVisible)} className="password-toggle">
              {passwordVisible ? "Hide Password" : "Show Password"}
            </span>
            {error && <span className="loginError">{error}</span>}
            <button className="loginButton" type="submit">
              {loading ? "Loading" : "Login"}
            </button>
            <span className="loginForget">Forget Password?</span>
            <button
              className="loginRegistrationButton"
              type="button"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
