import { Button } from "@mui/material";
import React from "react";
import Modal from "./../../components/dialog/Modal";
import "./authpage.scss";
import AuthForm from "./forms/AuthForm";

const Auth = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="auth-page">
      <div className="auth-page-col1">
        <div className="">
          <h5>Usl Food</h5>
        </div>
        <div>
          <Button
            className="dialog-button"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="auth-page-col2"></div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          width={500}
          height={580}
        >
          <AuthForm />
        </Modal>
      )}
    </div>
  );
};

export default Auth;
