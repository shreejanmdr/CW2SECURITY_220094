const path = require("path");
const productModel = require("../models/productModel");
const fs = require("fs"); // fs=filesystem


const createProduct = async (req, res) => {
  // check incomming data
  console.log(req.body);
  console.log(req.files);

  // Destructuring the body data (json)
  const { productName, productPrice, productCategory, productDescription,productQuantity } =
    req.body;

  // Validation (Task)
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription||
    !productQuantity
  ) {
    return res.status(400).json({
      success: false,
      message: "Enter all fields!",
    });
  }

  // validate if there is image
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: "Image not found!!",
    });
  }

  const { productImage } = req.files;

  // upload image
  // 1. Generate new image name (abc.png) -> (213456-abc.png)
  const imageName = `${Date.now()}-${productImage.name}`;

  // 2. Make a upload path (/path/uplad - directory)
  const imageUploadPath = path.join(
    __dirname,
    `../public/products/${imageName}`
  );

  // 3. Move to that directory (await, try-catch)
  try {
    await productImage.mv(imageUploadPath);

    // save to database
    const newProduct = new productModel({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: imageName,
      productQuantity:productQuantity
    });
    const product = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Created Successfully!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error,
    });
  }
};

// Fetch all products
const getAllProducts = async (req, res) => {
  // try catch
  try {
    const allProducts = await productModel.find({});
    res.status(201).json({
      success: true,
      message: "Product Fetched successfully!",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  // try catch
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//fetch single product
const getSingleProduct = async (req, res) => {
  //get product id from url(params)
  const productId = req.params.id;

  // try catch
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product Fetched successfully!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    //if there is image
    if (req.files && req.files.productImage) {
      //destructuring
      const {productImage} = req.files;

      //upload img to public/products folder
      // 1. Generate new image name (abc.png) -> (213456-abc.png)

      const imageName = `${Date.now()}-${productImage.name}`;

      // 2. Make a upload path (/path/uplad - directory)
      const imageUploadPath = path.join(__dirname,`../public/products/${imageName}`);

      // 3. Move to that directory (await, try-catch)
      await productImage.mv(imageUploadPath);

      //req.params(id),req.body(updated data-pn,pp,pc,pd),req.files(image)
      //add new field to req.body(productImage->name)
      req.body.productImage = imageName;//image uploaded(generated name)

      //if img is uploaded and req. body is assigned
      if(req.body.productImage){

        //finding existing product
        const existingProduct = await productModel.findById(req.params.id);

        //searching in the directory /folder
        const oldImagePath = path.join(__dirname,`../public/products/${existingProduct.productImage}`);


        //delete from filesystem
        fs.unlinkSync(oldImagePath);
    }
  }

  //update the data
  const updateProduct=await productModel.findByIdAndUpdate(req.params.id,req.body);
  res.status(201).json({
    success: true,
    message: "Product Updated successfully!",
    product: updateProduct,
  
  })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
      error: error,
    });
  }
};

//pagination
const paginationProducts = async(req,res)=>{

  //page no.
  const pageNo = req.query.page || 1;

  //how many result per page
  const resultPerPage = 4;

  try{

    //find all products,skip,limit
    const products = await productModel.find({})
    .skip((pageNo-1)*resultPerPage)
    .limit(resultPerPage);


    //if page 6 is requested,result 0(no products available)
    if(products.length===0){

     return res.status(404).json({
        success:false,
        message:"No Products Found!"
      })
    }

    //response
    res.status(201).json({
      success:true,
      message:"Products Fetched!",
      products:products
    })
    

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error!",
      error:error,
    })
  }
}
const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const products = await productModel.find({
      productName: { $regex: searchQuery, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  paginationProducts,
  searchProducts,
};
