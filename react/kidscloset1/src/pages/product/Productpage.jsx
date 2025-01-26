import React, { useEffect, useState } from "react";
import { getAllProducts, searchProductsApi } from "../../apis/Api";
import ProductCard from "../../components/Productcard/ProductCard";
import "./Productpage.css";

const Productpage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page, adjust as needed

  useEffect(() => {
    fetchData();
  }, [searchQuery, currentPage]); // Reload products when searchQuery or currentPage changes

  const fetchData = () => {
    if (searchQuery) {
      searchProductsApi(searchQuery)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllProducts()
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page when clearing search
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="">
{/* Carousel */}
<div className="row">
<div className="col">
  <div
    id="carouselExampleCaptions"
    className="carousel slide carousel-fade"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="/assets/images/a.png"
          className="d-block w-100"
          alt=""
        />
        <div className="carousel-caption d-none d-md-block">
          {/* <h5>20% off</h5>
          <p>On kids Summer Wear</p> */}
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="/assets/images/b.png"
          className="d-block w-100"
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          {/* <h5>Hottest Sale</h5>
          <p>With Best Offers & Discounts</p> */}
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="/assets/images/c.png"
          className="d-block w-100"
          alt="..."
        />
        <div className="carousel-caption d-none d-md-block">
          
        </div>
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>
</div>

{/* Search Bar */}
<div className="row justify-content-center mt-4">
<div className="col-md-6">
  <div className="input-group">
    <span className="input-group-text">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="text"
      className="form-control"
      placeholder="Search for products..."
      value={searchQuery}
      onChange={handleSearch}
    />
    <button
      className="btn btn-icon btn-danger ms-2 rounded-pill"  
      type="button"
      onClick={clearSearch}
    >
      Clear
    </button>
  </div>
</div>
</div>
        {/* Products */}
        <h2 className="text-center mt-3">Available Products</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3 ms-5">
          {currentProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard productInformation={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-4" aria-label="Product navigation">
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Productpage;
