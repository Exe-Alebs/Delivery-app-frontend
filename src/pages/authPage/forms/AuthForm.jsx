import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {
  const [pageType, setPageType] = useState("LOGIN");

  const toggleForm = () => {
    setPageType(pageType === "LOGIN" ? "REGISTER" : "LOGIN");
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        {pageType === "LOGIN" ? (
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <LoginForm />

            <Typography variant="body2">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  New to Ordering App?
                  <Link
                    underline="hover"
                    onClick={toggleForm}
                    style={{ cursor: "pointer", marginLeft: "7px" }}
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <RegisterForm />

            <Typography variant="body2">
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  Already have an account?
                  <Link
                    underline="hover"
                    onClick={toggleForm}
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AuthForm;
