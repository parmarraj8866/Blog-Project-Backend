import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  // async function login(data) {
  //   try {
  //     const res = await Api.post("/api/userpass/login", data);
  //     if (res.data.success) {
  //       alert(res.data.message);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  async function login(data) {
    const res = await Api.post("/api/userpass/login", data);
    if (!res.data.success) {
      return alert(res.data.message);
    }
    alert("Login");
    reset();
    redirect("/");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 shadow p-4">
          <h4 className="mb-3 text-center">User Login Form</h4>

          <form method="post" onSubmit={handleSubmit(login)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email")}
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <div className="mb-2 mt-2">
                <span>
                  Don't have an account? <a href="/signup">Signup</a>
                  {/* “Have an account? Sign in <a href="/login">Login</a>” */}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <a href="/sendOtp">Forget Password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
