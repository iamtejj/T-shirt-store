const express = require('express');
const router = express.Router();

const {getProductById ,createProduct ,getProduct, photo ,deleteProduct ,updateProduct ,getAllProducts ,getAllUniqueCategories } = require('../controllers/product');
const {isSignedIn,isAuthenitcated , isAdmin} = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// all of params
router.param("userId",getUserById);
router.param("productId",getProductById);

// all of actual routes
// Create Route
router.post('/product/create/:userId',isSignedIn, isAuthenitcated , isAdmin ,createProduct);

//Read Route
router.get('/product/:productId',getProduct);
router.get('/product/photo/:productId',photo);

//delete Route
router.delete('/product/:productId/:userId', isSignedIn , isAuthenitcated , isAdmin, deleteProduct);

//Update Route
router.put('/product/:productId/:userId', isSignedIn , isAuthenitcated , isAdmin, updateProduct);

//listing Route
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;