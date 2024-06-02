import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../config/hooks/useAuth";
import { useFormik } from "formik";
import { RegisterSchema } from "./authPage/forms/authSchema";
import { strengthColor, strengthIndicator } from "../utils/validatePassword";
import FormikField from "../components/forms/FormikField";
import TextInput from "../components/inputs/Input";
import PasswordInput from "../components/inputs/PasswordInput";

const RegisterPage = () => {
  const [level, setLevel] = useState();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      register(values);
    },
    validateOnMount: true,
    enableReinitialize: true,
  });

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            marginTop: "40px",
            textAlign: "left",
            padding: "10px",
            width: "450px",
          }}
        >
          <Typography variant="h6" sx={{}}>
            Create Account
          </Typography>

          <FormikField
            label={"First Name:"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            touched={formik.touched.firstName}
            name="firstName"
            Component={TextInput}
            error={formik.errors}
            formikBag={formik}
            id="firstName"
          />

          <FormikField
            label={"Last Name:"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            touched={formik.touched.lastName}
            name="lastName"
            Component={TextInput}
            error={formik.errors}
            formikBag={formik}
            id="lastName"
          />

          <FormikField
            label={"Email Address:"}
            placeholder="johndoe@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            touched={formik.touched.email}
            error={formik.errors.email}
            name="email"
            Component={TextInput}
            formikBag={formik}
            id="email"
          />

          <FormikField
            label={"Password:"}
            placeholder="Enter Password"
            onChange={(e) => {
              formik.handleChange(e);
              changePassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            touched={formik.touched.password}
            name="password"
            Component={PasswordInput}
            error={formik.errors.password}
            formikBag={formik}
            id="password"
          />

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Box
                sx={{
                  bgcolor: level?.color,
                  width: 85,
                  height: 8,
                  borderRadius: "9px",
                }}
              />
            </Grid>
            <Grid item>
              <Typography fontSize="0.75rem">{level?.label}</Typography>
            </Grid>
          </Grid>

          {/* <FormikField
            label={"Confirm Password:"}
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            touched={formik.touched.confirmPassword}
            name="confirmPassword"
            Component={PasswordInput}
            error={formik.errors.confirmPassword}
            formikBag={formik}
            id="confirmPassword"
          /> */}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              marginTop: "20px",
              borderRadius: "8px",
              fontFamily: "Mena Grotesk",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "15px",
              lineHeight: "26px",
              letterSpacing: "0.46px",
              fontFeatureSettings: "'clig' off, 'liga' off",
            }}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default RegisterPage;
