import { useForm } from "react-hook-form";
import Api from "../Api";
import { useNavigate } from "react-router-dom";

export default function ForgetOtpPass() {
  const { register, handleSubmit, reset } = useForm();

  const redirect = useNavigate();

  async function forgetPass(data) {
    console.log(data);
    try {
      if (data.new_pass === data.confirm_pass) {
        await Api.post("/api/userpass/updatePassword", data);
      }
      reset();
      redirect("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h4 className="text-center mb-4">Reset Password</h4>

        <form onSubmit={handleSubmit(forgetPass)}>
          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              {...register("otp")}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              {...register("new_pass")}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              {...register("confirm_pass")}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Password
          </button>
          <div className="text-center mt-3">
            <a href="/sendOtp" className="text-decoration-none text-secondary">
              ← Back to Email
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
