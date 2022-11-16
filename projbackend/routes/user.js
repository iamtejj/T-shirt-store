const express = require('express')
const router = express.Router();
const { getUserById ,getUser ,getallUser,updateUser ,userPurchaseList } = require('../controllers/user');
const { isSignedIn ,isAuthenitcated ,isAdmin } = require('../controllers/auth');

router.param('userId',getUserById);
router.get('/user/:userId',isSignedIn,isAuthenitcated,getUser);
router.put('/user/:userId',isSignedIn,isAuthenitcated,updateUser);

router.get('/orders/user/:userId',isSignedIn,isAuthenitcated,userPurchaseList);
router.get('/getalluser',getallUser);

module.exports = router;  