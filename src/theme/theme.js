import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#D3D5D4",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#32475C99",
    },
    text: {
      primary: "#32475CDE",
      secondary: "#32475C99",
      disabled: "#32475C61",
    },
    info: {
      main: "#21AEDB",
    },
    error: {
      light: "#FF5B3F",
      main: "#FF3E1D",
    },
    other: {
      ratingActive: "#FDB528",
    },
    background: {
      secondary: "#30334EE0",
    },
  },
  typography: {
    fontFamily: "Mena Grotesk, sans-serif",
    h4: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      lineHeight: "1.5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          backgroundColor: "#D3D5D4",
          color: "#32475CDE",
          textTransform: "none",
          borderRadius: "10px",
          padding: "10px",
          "&:hover": {
            backgroundColor: "#D3D5D4",
          },
        },
        contained: {},
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#32475CDE",
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          textAlign: "left",
          padding: "10px",
          margin: "10px",
          width: "100%",
        },
      },
    },
  },
});

export default theme;
