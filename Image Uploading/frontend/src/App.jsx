import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from "./Layout/BlogList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Layout/Form";
import Navbar from "./Layout/Navbar";
import SimpleForm from "./Layout/UserSignupForm";
import LoginForm from "./Layout/UserLoginForm";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import ChangePassword from "./Layout/ChangePassword";
import ForgetPasswordEmail from "./Layout/ForgetPasswordEmail";
import ForgetOtpPass from "./Layout/ForgetOtp&Pass";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <BlogList />
                </>
              }
            />
            <Route
              path="/form"
              element={
                <>
                  <Navbar />
                  <Form />
                </>
              }
            />
            <Route
              path="/changePass"
              element={
                <>
                  <Navbar />
                  <ChangePassword />
                </>
              }
            />
            <Route
              path="/form/:id"
              element={
                <>
                  <Navbar />
                  <Form />
                </>
              }
            />
          </Route>
          <Route path="/signup" element={<SimpleForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sendOtp" element={<ForgetPasswordEmail />} />
          <Route path="/forgetpass" element={<ForgetOtpPass />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
