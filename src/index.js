import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
// import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import 'rsuite/dist/rsuite.min.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AnimatePresence exitBeforeEnter initial={true}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AnimatePresence>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();