import React, { useEffect } from "react";
import useAuth from "../config/hooks/useAuth";
import { useFormik } from "formik";
import { loginSchema } from "./authPage/forms/authSchema";
import ForgetPassword from "./authPage/forms/password-reset/ForgetPassword";
import { Box, Button, Typography } from "@mui/material";
import FormikField from "../components/forms/FormikField";
import TextInput from "../components/inputs/Input";
import PasswordInput from "../components/inputs/PasswordInput";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [resetPasswordPage, setResetPasswordPage] = React.useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {resetPasswordPage ? (
        <ForgetPassword Back={() => setResetPasswordPage(false)} />
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginTop: "50px",
                textAlign: "left",
                padding: "10px",
                width: "450px",
              }}
            >
              <Typography variant="h6">Welcome Back!</Typography>
              <div className="input">
                <FormikField
                  label={"Email:"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  touched={formik.touched.email}
                  name="email"
                  Component={TextInput}
                  formikBag={formik}
                />
              </div>
              <div className="input">
                <FormikField
                  label={"Password:"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  touched={formik.touched.password}
                  Component={PasswordInput}
                  formikBag={formik}
                  id="password"
                />
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",

                  fontWeight: "300",
                  fontSize: "14px",
                  fontStyle: "normal",
                }}
              >
                <Link
                  underline="hover"
                  variant="body2"
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    lineHeight: "21px",
                    letterSpacing: "0.15px",
                    color: "var(--light-primary-main, #282F75)",
                  }}
                  onClick={() => setResetPasswordPage(true)}
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  borderRadius: "8px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "15px",
                  lineHeight: "26px",
                  letterSpacing: "0.46px",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
