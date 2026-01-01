import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../Api";

export default function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [id, setId] = useState(null);
  const [image, setImage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const redirect = useNavigate();

  async function getData() {
    const res = await Api.get("/api/blog");
    setBlogs(res.data.blogs);
  }

  async function add(data) {
    const formData = new FormData();

    const images = data.image;
    for (var i in images) {
      formData.append("image", images[i]);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);

    if (id === null) {
      await Api.post("/api/blog", formData);
    } else {
      await Api.put(`/api/blog?id=${id}`, formData);
      setId(null);
      setImage("");
    }

    redirect("/");
    reset({
      title: "",
      description: "",
      image: "",
    });
  }

  const params = useParams();

  async function update(blogId) {
    setId(blogId);

    const singleBlog = blogs.find((blog) => blog._id == blogId);
    if (!singleBlog) return;

    reset(singleBlog);

    const img = `${import.meta.env.VITE_IMAGE_URL}/${singleBlog.image}`;
    setImage(img);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (params.id && blogs.length > 0) {
      update(params.id);
    }
  }, [params.id, blogs]);

  return (
    <div className="container mt-4 shadow p-5">
      <h3 className="mb-3">Blog Form</h3>

      <form onSubmit={handleSubmit(add)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
            placeholder="Enter title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            {...register("description", { required: true })}
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            {...register("image", { required: false })}
            multiple
            accept="image/*"
          />

          {image !== "" && (
            <img
              src={image}
              className="my-2"
              width="100"
              height="100"
              alt=""
            />
          )}
        </div>

        {id === null ? (
          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-warning me-2">
            Update
          </button>
        )}
      </form>
    </div>
  );
}
