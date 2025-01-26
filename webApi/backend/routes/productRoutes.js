const router = require('express').Router();
const productController = require('../controllers/productController');


router.post('/create', productController.createProduct);

// fetch all products
router.get('/get_all_products', productController.getAllProducts);


//fetch single product
router.get('/get_single_product/:id', productController.getSingleProduct);

//delete single product
router.delete('/delete_product/:id', productController.deleteProduct);

//upodate product
router.put('/update_product/:id'    , productController.updateProduct);

//pagination 
router.get('/pagination', productController.paginationProducts);

router.get('/search', productController.searchProducts);


module.exports = router