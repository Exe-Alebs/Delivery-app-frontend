import { Box, Button, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import FormikField from "../../../components/forms/FormikField";
import TextInput from "../../../components/inputs/Input";
import PasswordInput from "../../../components/inputs/PasswordInput";
import useAuth from "./../../../config/hooks/useAuth";
import ForgetPassword from "../forms/password-reset/ForgetPassword";
import { loginSchema } from "./authSchema";
import "./authforms.css";

const LoginForm = () => {
  const [resetPasswordPage, setResetPasswordPage] = React.useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <>
      {resetPasswordPage ? (
        <ForgetPassword />
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                textAlign: "left",
                padding: "10px",
                width: "350px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  fontFamily: "Mena Grotesk",
                  fontSize: "20px",
                  fontStyle: "normal",
                  lineHeight: "32px",
                }}
              >
                Welcome Back!
              </Typography>
              <div className="input">
                <FormikField
                  label={"Username:"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  touched={formik.touched.email}
                  name="username"
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
                  marginBottom: "10px",
                  color: "var(--light-primary-main, #282F75)",
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
    </>
  );
};

export default LoginForm;
