import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

export default function SimpleForm() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  async function signup(data) {
    const res = await Api.post("/api/userpass/signup", data);
    if (!res.data.success) {
      return alert(res.data.message);
    }
    alert("SignUp");
    reset();
    redirect("/login");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 shadow p-4">
          <h4 className="mb-3 text-center">User Signup Form</h4>

          <form method="post" onSubmit={handleSubmit(signup)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                {...register("username")}
                className="form-control"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="number"
                {...register("mobile")}
                className="form-control"
                placeholder="Enter Mobile"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <div className="mb-2 mt-2">
                <span>
                  Already have an account? <a href="/login">Login</a>
                  {/* “Already have an account? <a href="/login">Login</a>” */}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
