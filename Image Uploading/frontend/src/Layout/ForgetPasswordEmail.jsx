import { useForm } from "react-hook-form";
import Api from "../Api";
import {  useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate()

  async function sendOtp(data) {
    console.log(data);
    await Api.post("/api/userpass/sendOtp", data);
       reset()
       redirect("/forgetpass")
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-sm p-4 rounded-3"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="text-center fw-bold mb-2">Forgot Password</h4>
        <p className="text-center text-muted mb-4">
          Enter your registered email to receive OTP
        </p>

        <form onSubmit={handleSubmit(sendOtp)}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="form-control"
              placeholder="example@email.com"
              required
            />
          </div>

          <button className="btn btn-primary w-100 fw-semibold">
            Send OTP
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none text-secondary">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
