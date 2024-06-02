import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import FormikField from "../../../components/forms/FormikField";
import TextInput from "../../../components/inputs/Input";
import PasswordInput from "../../../components/inputs/PasswordInput";
import useAuth from "../../../config/hooks/useAuth";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/validatePassword";
import { RegisterSchema } from "./authSchema";
import "./authforms.css";

const RegisterForm = () => {
  const [level, setLevel] = useState();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
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

  const { handleChange } = formik;

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
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "32px",
            letterSpacing: "0.15px",
            fontFeatureSettings: "'clig' off, 'liga' off",
            color: "#32475CDE",
          }}
        >
          Create Account
        </Typography>
        <div className="input">
          <FormikField
            label={"Username:"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            touched={formik.touched.id}
            name="username"
            Component={TextInput}
            error={formik.errors}
            formikBag={formik}
            id="username"
          />
        </div>
        <div className="input">
          <FormikField
            label={"Phone Number:"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            touched={formik.touched.id}
            name="phoneNumber"
            Component={TextInput}
            error={formik.errors}
            formikBag={formik}
            id="phoneNumber"
          />
        </div>
        <div className="input">
          <FormikField
            label={"Email Address:"}
            placeholder="johndoe@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            touched={formik.touched.id}
            error={formik.errors}
            name="email"
            Component={TextInput}
            formikBag={formik}
          />
        </div>
        <div className="input">
          <FormikField
            label={"Password:"}
            placeholder="Enter Password"
            onChange={(e) => {
              handleChange(e);
              changePassword(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            touched={formik.touched.password}
            Component={PasswordInput}
            error={formik.errors}
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
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
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
  );
};

export default RegisterForm;
