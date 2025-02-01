import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../sidebar/sidebar";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return user != null && user?.isAdmin ? (
    <Sidebar />
  ) : (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-0 mt-0">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            {/* <span className="font-weight-bold h4 mb-0">Closet</span> */}
            <img
              src="../assets/images/sanosansar1.png"
              alt="logo"
              width="190"
              height="40"
              className="d-inline-block align-text-top ms-2"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/product" className="nav-link" activeClassName="active">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/my_cart" className="nav-link" activeClassName="active">
                  My Cart
                </NavLink>
              </li>
  
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                  Contact
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/favourites" className="nav-link" activeClassName="active">
                  Favorites
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/orderlist" className="nav-link" activeClassName="active">
                  orderlist
                </NavLink>
              </li>            
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>   

            ) : (
              <>
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "../sidebar/sidebar";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();

//   // Safely parse the user object
//   const user = (() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//     } catch (e) {
//       console.error("Error parsing user data", e);
//       return null;
//     }
//   })();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return user !== null && user?.isAdmin ? (
//     <Sidebar />
//   ) : (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-0 mt-0">
//         <div className="container-fluid">
//           <Link to="/" className="navbar-brand d-flex align-items-center">
//             <img
//               src="../assets/images/sanosansar1.png"
//               alt="logo"
//               width="190"
//               height="40"
//               className="d-inline-block align-text-top ms-2"
//             />
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <NavLink to="/product" className="nav-link">
//                   Products
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/my_cart" className="nav-link">
//                   My Cart
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/contact" className="nav-link">
//                   Contact
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/favourites" className="nav-link">
//                   Favorites
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/orderlist" className="nav-link">
//                   Order List
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           <div className="d-flex align-items-center">
//             {user ? (
//               <>
//                 <button className="btn btn-primary" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="btn btn-primary me-2">
//                   Login
//                 </Link>
//                 <Link to="/register" className="btn btn-primary">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
