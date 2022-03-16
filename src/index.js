import React,{Suspense} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./routes/store";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Suspense fallback={<p>Loading...</p>}>
  <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider></Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
