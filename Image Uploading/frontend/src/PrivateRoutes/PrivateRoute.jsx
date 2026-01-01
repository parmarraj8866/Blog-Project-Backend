import React, { useEffect, useState } from "react";
import Api from "../Api";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const res = await Api.get("/api/userpass/checkauth");
      console.log(res.data);
      if (res.data.success) {
        setUser(res.data.user);
        setLoading(false);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}
