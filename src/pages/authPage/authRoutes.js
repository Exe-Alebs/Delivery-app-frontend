import React from "react";
import Auth from "./Auth";
import PasswordReset from "../authPage/forms/password-reset/PasswordReset";

export const authRoutes = [
  {
    path: "/auth",
    element: <Auth />,
    breadcrumbs: [
      // {
      //   name: 'auth',
      // },
    ],
  },
  {
    path: "/new-password",
    element: <PasswordReset />,
    breadcrumbs: [],
  },
];
