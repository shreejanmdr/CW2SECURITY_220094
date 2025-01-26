import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { testApi } from "../../apis/Api";
import './Homepage.css';

const Homepage = () => {
  useEffect(() => {
    console.log("Hello!!!");

    testApi().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center homepage-bg"
      style={{
        backgroundImage: "url(/assets/images/hp.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container text-center text-white">
        <h2 className="display-3 mb-1 homepage-title color-black ">Welcome to </h2>
        <h1 className="display-3 mb-1 homepage-title color-black "> Closet</h1>
        <p className="text-start lead homepage-descriptio color-black ">
          Discover a wide range of products for your
        </p>
        <p className="lead homepage-descriptio color-black ">
          kids from the comfort of your home.
        </p>
        <div className="d-flex justify-content-left">
          <a href="/login" className="btn btn-dark btn-lg mx-2 homepage-btn">
            Shop Now
          </a>
          {/* <a href="/about" className="btn btn-outline-dark btn-lg mx-2 homepage-btn">
            Learn More
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;