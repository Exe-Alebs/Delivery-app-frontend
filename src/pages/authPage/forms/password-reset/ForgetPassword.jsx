import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { SendResetLink } from "./paswordService";
import { Toast } from "../../../../utils/toast/toast";
import FormikField from "../../../../components/forms/FormikField";
import TextInput from "../../../../components/inputs/Input";

const ForgetPassword = ({ Back }) => {
  const handleSubmit = (values) => {
    SendResetLink(values)
      .then((res) => {
        Toast("success", "Reset link sent successfully");
      })
      .catch((err) => {
        Toast("error", "Error sending reset link");
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: "",
    onSubmit: (values) => handleSubmit(values),
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
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
          Forgot Password?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "300",
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          Enter your email address to reset your password
        </Typography>
        <div className="input">
          <FormikField
            label="Email Address:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            touched={formik.touched.email}
            name="email"
            Component={TextInput}
            formikBag={formik}
          />
        </div>
        <div
          style={{
            marginBottom: "10px",
            color: "var(--light-primary-main, #282F75)",
            fontWeight: "300",
            fontSize: "14px",
            fontStyle: "normal",
            marginTop: "10px",
            textAlign: "end",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={Back}
        >
          Back to Login
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
          Send Reset Link
        </Button>
      </Box>
    </form>
  );
};

export default ForgetPassword;
