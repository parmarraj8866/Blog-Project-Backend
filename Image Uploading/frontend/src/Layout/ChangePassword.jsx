import React from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";

export default function ChangePassword() {
  const { register, handleSubmit, reset } = useForm();

  async function changePass(data) {
    try {
      if (data.new_pass != data.comfirm_pass) {
        return alert("New Password & Confirm Password Not Match!");
      }
      const res = await Api.post("/api/userpass/changePass", data);
      if (res.data.success) {
        alert(res.data.message);
        reset();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      //   alert(err.message);
      alert(err.response.data.message);
    }
  }
  return (
    <div>
      <form
        method="post"
        onSubmit={handleSubmit(changePass)}
        className="container w-50 shadow-sm border p-5 mt-5"
      >
        <h3 className="fw-normal text-center mb-4">Change Password</h3>
        <div className="mb-3">
          <label className="form-label fw-bold">Current Password : </label>
          <input
            type="password"
            {...register("curr_pass")}
            className="form-control"
            placeholder="Enter Current Password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">New Password : </label>
          <input
            type="password"
            {...register("new_pass")}
            className="form-control"
            placeholder="Enter New Password"
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Confirm Password : </label>
          <input
            type="password"
            {...register("comfirm_pass")}
            className="form-control"
            placeholder="Enter Confirm Password"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Change-Password</button>
        </div>
      </form>
    </div>
  );
}
