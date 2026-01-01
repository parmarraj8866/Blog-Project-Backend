import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../Api";

export default function MyForm() {
  const [blogs, setBlogs] = useState([]);

  async function getData() {
    const res = await Api.get("/api/blog");
    setBlogs(res.data.blogs);
  }

  async function trash(id) {
    await Api.delete(`/api/blog/${id}`);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2 className="mt-5 text-center">Blog List</h2>

      <div className="container mt-4">
        <div className="row">
          {blogs &&
            blogs.map((blog, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card h-100 shadow">
                  <div className="p-2 d-flex flex-wrap justify-content-center">
                    {blog.image?.map((ele, i) => (
                      <img
                        key={i}
                        src={`${import.meta.env.VITE_IMAGE_URL}/${ele}`}
                        width="100%"
                        height="250px"
                        className="mb-2"
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                      />
                    ))}
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>

                    <p className="text-muted mb-1">
                      <strong>Created:</strong>{" "}
                      {new Date(blog.createdAt).toLocaleString()}
                    </p>
                    <p className="text-muted">
                      <strong>Updated:</strong>{" "}
                      {new Date(blog.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="card-footer text-center">
                    <button
                      onClick={() => trash(blog._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>

                    <a
                      href={`/form/${blog._id}`}
                      className="btn btn-warning btn-sm mx-2"
                    >
                      Update
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
