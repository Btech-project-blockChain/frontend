import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="column">
        <div className="identity">
          <h2>Wallet ID:</h2>
          <b>
            <p>1234567890</p>
          </b>
        </div>
        <button
          className="new-agreement-btn"
          onClick={() => navigate("/uploader")}
        >
          New Agreement
        </button>
      </div>
      <div className="column">
        <div className="old-agreement">
          <h2>Your Agreement</h2>
          <div className="user-details">
            <b>
              <p>Your Ethereium ID: 1123445565677789</p>
            </b>
            <b>
              <p>Your Name: kuchh bhi rakh lo</p>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
