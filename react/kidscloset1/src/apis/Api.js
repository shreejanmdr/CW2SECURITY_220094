import axios from "axios";

// creating backend Config!
const Api = axios.create({
    baseURL : "https://localhost:5000",
    withCredentials : true,
    headers : {
        "Content-Type" : "multipart/form-data"
    }
})

//make config for token
const config={
    headers:{
      "Content-Type": "application/json",
       'authorization'  : `Bearer ${localStorage.getItem("token")}`
    }
}
const getToken = () => localStorage.getItem('token');
const jsonConfig = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  };






// Test API
export const testApi = () => Api.get('/test')

// Register Api
export const registerUserApi = (data) => Api.post('/api/user/create', data)

// // login api
// export const loginUserApi = (data) => Api.post('/api/user/login', data)
export const loginUserApi = (data) => {
  return axios.post("https://localhost:5000/api/user/login", data, {
    // or your actual endpoint
    validateStatus: () => true,
  });
};

// create prodcuct API
export const createProductApi = (data) => Api.post('/api/product/create', data)

// get all products api
export const getAllProducts = () => Api.get('/api/product/get_all_products',config)

//get single product api
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`,config)

//delete product api
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`,config)

//update product api
export const updateProduct= (id,data) => Api.put(`/api/product/update_product/${id}`, data,config)


//forgot password
export const forgotPasswordApi = (data) => Api.post('/api/user/forgot_password', data)

export const verifyOtpApi = (data) => Api.post('/api/user/verify_otp', data)

export const searchProductsApi=(query) => Api.get(`/api/product/search?q=${query}`,config);


//add to cart

//export const addToCartApi = (data) => Api.post('/api/cart/add_to_cart', data, config);

//get cart

//export const getCartApi = () => Api.get('/api/cart/get_cart', config);
//////////////////////////////////////////////////////////////////////////////////////////////////////
// add to cart
export const addToCartApi = (data) => Api.post("/api/cart/add", data, config);

// get all cart
export const getAllCartApi = () => Api.get("/api/cart/all", config);

// update cart
export const updateCartApi = (id, data) =>
  Api.put(`/api/cart/update/${id}`, data, config);

// delete cart
export const deleteCartApi = (id) =>
  Api.delete(`/api/cart/delete/${id}`, config);



// delete favorite
export const deleteFromFavoriteApi = (id) =>
  Api.delete(`/api/favourite/delete/${id}`, config);

// get orders/bills
export const getOrdersApi = () => Api.get("/api/order/get", config);

// get user orders
export const getUserOrdersApi = () => Api.get("/api/order/user", config);

// create order
export const createOrderApi = (data) =>
  Api.post("/api/order/create", data, jsonConfig);

// update order
export const updateOrderApi = (id, data) =>
  Api.put(`/api/order/update/${id}`, data, config);

// update Status order
export const updateOrderStatusApi = (id, data) =>
  Api.put(`/api/order/update/${id}`, data, config);

// update carts status
export const updateCartStatusApi = (data) =>
  Api.put(`/api/cart/status`, data, config);

// get favorite by user
export const getFavoriteByUserApi = () => Api.get("/api/favourite/get", config);

//add fav
export const addToFavoriteApi = (data) =>Api.post("/api/favourite/add", data, config);

// get all favorite
export const getAllFavoriteApi = () => Api.get("/api/favourite/all", config);

//contact us
export const getAllContacts = () => Api.get('/api/contact/all', config);
// export const addReviewApi = (data) => Api.post('/api/rating/add', data);
// export const getReviewsApi = (productId) => Api.get(`/api/rating/get_review/${productId}`);


// Review APIs
 
export const addReviewApi = (data) => Api.post('/api/rating/add', data,config);
export const getReviewsApi = (productId) => Api.get(`/api/rating/product/${productId}`);


// Get user profile API
export const getUserProfileApi = () => Api.get('/api/profile', config);


  
