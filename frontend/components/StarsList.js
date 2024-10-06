import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StarsList() {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token=localStorage.getItem("token")
    if (!token) {
      console.log('no token...')
      logout();
    } else {
      const fetchStars = async () => {
        try {
          const { data } = await axios.get("http://localhost:3003/api/stars", {
            headers: { authorization: localStorage.getItem("token") }
          });
          setStars(data);
        } catch (err) {
          const errMsg=err?.response?.data?.message
          console.log("Error: ", err.message);
          if(err.message=='Request failed with status code 401') {
            console.log('logging out')
            logout()
          }
        }
      };
      fetchStars();
    }
  }, []);

  return (
    <div className="container">
      <h3>
        StarsList
        <button onClick={()=>logout()}>Logout</button>
      </h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div
              key={star.id}
              style={{ marginBottom: "20px" }}
              className="star"            >
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  );
}
