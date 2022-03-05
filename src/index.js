import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { checkValue } from "./utils";

const appName = "rick_morty_api";
const version = "0.1";
checkValue("appName", appName);
checkValue("version", version);
localStorage.setItem("appName", appName);
localStorage.setItem("version", version);

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0C9EB0",
    },
    secondary: {
      main: "#BBD665",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
