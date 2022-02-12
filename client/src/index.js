import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Login from './views/Login/Login.js'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="member" element={<h2>Member</h2>} />
        <Route path="employee" element={<h2>Employee</h2>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
