import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../../store/slices/Userslice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in the required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("The passwords you entered do not match. Please check and re-enter.");
      return;
    }

    const response = await dispatch(userSignUp(formData));

    if (!response.error) {
      setFormData({ userName: "", email: "", password: "", confirmPassword: "" });
      navigate("/");
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h1 className="registerLeftTitle">Social Media App</h1>
          <span className="registerLeftDesc">
            Connect with your friends and the world around you on Social Media App.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerForm" onSubmit={handleSubmit}>
            <input
              placeholder="UserName"
              className="registerInput"
              name="userName"
              value={formData.userName}
              onChange={handleInput}
            />
            <input
              placeholder="Email"
              className="registerInput"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
            <input
              placeholder="Password"
              className="registerInput"
              type="password"
              name="password"
              minLength={6}
              value={formData.password}
              onChange={handleInput}
            />
            <input
              placeholder="Confirm Password"
              className="registerInput"
              name="confirmPassword"
              type="password"
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleInput}
            />
            {error && <span className="registerError">{error}</span>}
            <button className="registerButton" type="submit">
              {loading ? "Loading" : "Sign Up"}
            </button>
            <button className="registerRegistrationButton" type="button" onClick={() => navigate("/")}>
              Go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
