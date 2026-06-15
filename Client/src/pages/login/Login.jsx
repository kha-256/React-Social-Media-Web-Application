import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../store/slices/Userslice";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FloatingLabelField from "../../components/floatingLabelField/FloatingLabelField";

const LOGIN_HERO_IMAGE =
  "https://static.xx.fbcdn.net/rsrc.php/yB/r/83zWJdc6PJI.webp";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const formItemSx = { width: "80%" };

const loginMainSx = {
  flex: 1,
  width: "100%",
  minHeight: 0,
  alignItems: { xs: "center", md: "flex-start" },
  justifyContent: { md: "center", sm: "flex-start" },
  flexDirection: { xs: "column", md: "row" },
  marginBottom: 3,
  
  };

const loginLeftSx = {
  flex: 1,
  minWidth: 0,
  maxWidth: {lg:"60%", md:"50%"},
  justifyContent: "flex-start",
  alignItems: "center",
  display: "flex",
  marginTop: { lg: -6, md: 0 },
 
};

const loginLeftContentSx = {
  minWidth: 0,
  
};

const loginHeadlineWrapSx = {
  flex: "0 0 auto",
  minWidth: 0,
  
};

const loginRightSx = {
  flex: { xs: "0 0 auto", md: 1 },
  width: { xs: "100%", md: "auto" },
  minWidth: 0,
  maxWidth: { xs: "420px", md: "50%", lg: "40%" },
  justifyContent: { xs: "center", md: "flex-start" },
  alignItems: "center",
  marginTop: { md: 0, sm: 5, xs: 5 },
};

const loginRightContentSx = {
  width: { xs: "100%", md: "80%" },
  maxWidth: "420px",
  alignItems: "stretch",
 
};

const loginFormTitleSx = {
  width: "100%",
  mb: 4,
  textAlign: "center",
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: { xs: "1.3rem", md: "1.3rem" },
  fontWeight: 450,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  color: "#1e293b"
};

const loginFieldsGroupSx = {
  ...formItemSx,
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const loginFieldClasses = {
  wrapper: "loginInputWrapper",
  wrapperActive: "loginInputWrapperActive",
  wrapperError: "loginInputWrapperError",
  label: "loginLabel",
  input: "loginInput",
  inputWithAdornment: "loginInputWithAdornment",
  error: "loginFieldError",
};

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();
  const showLeftSection = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (values, { resetForm }) => {
    const response = await dispatch(userLogin(values));

    if (!response.error) {
      resetForm();
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <img src="/assets/logo.png" alt="Kinnect" className="loginLogo" />

      <Stack sx={loginMainSx} component="div">
        {showLeftSection && (
          <Stack sx={loginLeftSx} component="div">
            <Stack
              sx={loginLeftContentSx}
              direction="row"
              alignItems="center"
              component="div"
            >
              <Stack sx={loginHeadlineWrapSx}>
                <h1 className="loginHeadline">
                  <span>Connect</span>
                  <span>with</span>
                  <span>friends on</span>
                  <span className="loginHeadlineAccent">Kinnect.</span>
                </h1>
              </Stack>
              <img src={LOGIN_HERO_IMAGE} alt="" className="loginHero" />
            </Stack>
          </Stack>
        )}

        <Stack sx={loginRightSx} component="div">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Stack sx={loginRightContentSx} component="div">
                <Typography variant="body1"  sx={loginFormTitleSx}>
                  Log in to Kinnect
                </Typography>
                <Form className="loginForm">
                <Stack sx={loginFieldsGroupSx}>
                  <FloatingLabelField
                    label="Email"
                    name="email"
                    type="email"
                    classes={loginFieldClasses}
                  />

                  <FloatingLabelField
                    label="Password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    classes={loginFieldClasses}
                    endAdornment={
                      <button
                        type="button"
                        className="loginPasswordToggle"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        aria-label={
                          passwordVisible ? "Hide password" : "Show password"
                        }
                      >
                        {passwordVisible ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </button>
                    }
                  />
                </Stack>

                {error && (
                  <Stack sx={formItemSx}>
                    <span className="loginError">{error}</span>
                  </Stack>
                )}

                <button
                  className="loginButton"
                  type="submit"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? "Loading" : "Log in"}
                </button>

                <span className="loginForget">Forget Password?</span>

                <button
                  className="loginRegistrationButton"
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  Create a New Account
                </button>
                </Form>
              </Stack>
            )}
          </Formik>
        </Stack>
      </Stack>
    </div>
  );
}
