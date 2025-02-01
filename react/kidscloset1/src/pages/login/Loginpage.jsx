
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../../pages/login/Loginpage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const siteKey = "6Lfdab8qAAAAADzTjd87esA4qUA1ezYJs5XLim_D"; // reCAPTCHA site key

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Lockout state and timer
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [lockTime, setLockTime] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Timer countdown for lockout time
    if (lockTime && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setLockTime(null);
      setTimer(null);
    }
  }, [lockTime, timer]);

  // Validation
  const validation = () => {
    let isValid = true;
    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification!");
      isValid = false;
    }

    return isValid;
  };

  // Handle login attempt
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
      captchaToken: captchaToken,
    };

    // Make API request
    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          if (res.data.message === "Account locked") {
            // Handle lockout message and start countdown timer
            const lockDuration = res.data.remainingTime; // in seconds
            setLockTime(lockDuration);
            setTimer(lockDuration);
            toast.error(`Your account is locked. Try again in ${lockDuration} seconds.`);
          } else if (res.data.message === "Password not matched!") {
            // Track remaining attempts
            setRemainingAttempts(res.data.remainingAttempts);
            toast.error(`Password incorrect! ${res.data.remainingAttempts} attempt(s) left.`);
          } else {
            toast.error(res.data.message);
          }
        } else {
          // Successful login
          toast.success("Login successful!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "hsl(0, 0%, 96%)",
        backgroundImage: `url("/assets/images/image.png")`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "15px",
      }}
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-center justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
            <h1 className="my-5 display-3 fw-bold ls-tight text-light">
              Bright Beginnings, Easy Shopping
              <br />
              <span className="text-warning">Discover Joyful Essentials!</span>
            </h1>
            <p style={{ color: "white" }}>
              Explore the finest selection of kids' essentials at our online
              store. Elevate your child's everyday experiences with quality
              products delivered to your doorstep, ensuring comfort and
              happiness in every purchase...
              <br />
              <br />
              <Link to="/register" className="btn btn-warning">
                Register Now
              </Link>
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card shadow-lg rounded-lg">
              <div className="card-body py-5 px-md-5">
                <h1 className="text-center fw-bold mb-4">Login</h1>
                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0"
                        style={{ backgroundColor: "transparent" }}
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={
                            passwordVisible
                              ? "fas fa-eye-slash text-primary"
                              : "fas fa-eye text-primary"
                          }
                        ></i>
                      </button>
                    </div>
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                  </div>

                  <div className="form-outline mb-4">
                    <ReCAPTCHA
                      sitekey={siteKey}
                      onChange={(value) => setCaptchaToken(value)}
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="btn btn-primary btn-block w-100 mb-4 rounded-pill"
                    style={{
                      backgroundColor: "#7849FF",
                      borderColor: "#28a745",
                      transition: "background-color 0.3s ease",
                    }}
                    disabled={lockTime > 20} // Disable button during lockout
                  >
                    SIGN IN
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-primary text-decoration-none"
                      >
                        Sign Up
                      </Link>
                    </p>
                    <Link
                      to="/forgot_password"
                      className="btn btn-link text-primary text-decoration-none"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Show lockout timer */}
                  {lockTime && timer > 0 && (
                    <div className="text-center text-danger mt-3">
                      Your account is locked. Try again in {timer} seconds.
                    </div>
                  )}

                  {/* Show remaining attempts */}
                  {remainingAttempts !== null && remainingAttempts > 0 && !lockTime && (
                    <div className="text-center text-warning mt-3">
                      You have {remainingAttempts} attempt(s) left before your account locks.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
