const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenitcated , isAdmin } = require('../controllers/auth');
const { getUserById ,pushOrderInPurchaseList } = require('../controllers/user');
const {updateStock} = require('../controllers/product');
const {getOrderById , createOrder , getAllOrders , updateStatus , getOrderStatus } = require('../controllers/order')

//params
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//actual Route
//create
router.post('/order/create/:userId',isSignedIn,isAuthenitcated,pushOrderInPurchaseList,updateStock,createOrder);

//read
router.post('/order/all/:userId',isSignedIn,isAuthenitcated,isAdmin,getAllOrders);

//status of order

router.get('/order/status/:userId',isSignedIn,isAuthenitcated,isAdmin,getOrderStatus);
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenitcated,isAdmin,updateStatus);
module.exports = router;