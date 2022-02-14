import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './views/Login/Login.js'
import Member from './views/Member/Member.js'
import Employee from './views/Employee/Employee.js'
import Admin from './views/Admin/Admin';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="member" element={<Member />} />
        <Route path="employee" element={<Employee />} />
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);