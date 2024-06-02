import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import FormikField from "../components/forms/FormikField";
import TextInput from "../components/inputs/Input";
import MultiLineInput from "../components/inputs/MultilineInput";
import { CreateFeedbakck } from "../services/feedbackservice";
import { Toast } from "../utils/toast/toast";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  const submitForm = (values) => {
    CreateFeedbakck(values)
      .then((res) => {
        Toast("success", "Feedback sent successfully");
        navigate("/contact");
      })
      .catch((err) => {
        Toast("error", "Failed to send feedback");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: "",
    onSubmit: (values) => {
      submitForm(values);
    },
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            <Typography variant="h6">Contact Us!</Typography>
            <div>
              <FormikField
                placeholder={"Name"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                touched={formik.touched.name}
                name="name"
                Component={TextInput}
                formikBag={formik}
              />
            </div>
            <div>
              <FormikField
                placeholder={"Email"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                touched={formik.touched.email}
                Component={TextInput}
                formikBag={formik}
                name={"email"}
              />
            </div>
            <div>
              <FormikField
                placeholder={"Message"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                touched={formik.touched.message}
                Component={MultiLineInput}
                multiLine={true}
                formikBag={formik}
                name={"message"}
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
              Submit
            </Button>
          </Box>
        </form>
      </>
    </div>
  );
};

export default ContactPage;
