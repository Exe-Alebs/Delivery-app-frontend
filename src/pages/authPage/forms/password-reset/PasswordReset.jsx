import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  strengthColor,
  strengthIndicator,
} from "../../../../utils/validatePassword";
import FormikField from "../../../../components/forms/FormikField";
import PasswordInput from "../../../../components/inputs/PasswordInput";

const PasswordReset = (props) => {
  const [level, setLevel] = useState();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => handleSubmit(values.password),
    validateOnMount: true,
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
  });
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  const handleSubmit = (password) => {
    console.log(
      // eslint-disable-next-line no-template-curly-in-string
      `New Password
      ${password}`
    );
  };
  const { handleChange } = formik;
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Card sx={{ height: "450px", maxWidth: "100%", width: "450px" }}>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <div style={{ marginBottom: "10px" }}></div>
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
                  Create A New Password
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
                  Enter your new password below:
                </Typography>
                <div className="input">
                  <FormikField
                    label="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    touched={formik.touched.password}
                    Component={PasswordInput}
                    formikBag={formik}
                    id="password"
                    name="password"
                  />
                </div>
                <div className="input">
                  <FormikField
                    label="Confirm Password"
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    touched={formik.touched.confirmPassword}
                    Component={PasswordInput}
                    formikBag={formik}
                    name="confirmPassword"
                    id="confirmPassword"
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
                <div
                  style={{
                    marginBottom: "10px",
                    color: "var(--light-primary-main, #282F75)",
                    fontWeight: "300",
                    fontSize: "14px",
                    fontStyle: "normal",
                  }}
                ></div>
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
                  Create New Password
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

PasswordReset.propTypes = {};

export default PasswordReset;
