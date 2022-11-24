const express = require('express');
const router = express.Router();
const { getCategoryById , createCategory , getCategory , getAllCategory ,updateCategory ,removeCategory } = require('../controllers/category');
const { isSignedIn , isAdmin , isAuthenitcated } = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

//params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById);

//Routes goes Here

//create
router.post('/category/create/:userId',isSignedIn,isAuthenitcated,isAdmin,createCategory);

//read
router.get('/category/:categoryId',getCategory);
router.get('/categories',getAllCategory);

//update
router.put('/category/:categoryId/:userId',isSignedIn,isAuthenitcated,isAdmin,updateCategory);

//delete
router.delete('/category/:categoryId/:userId',isSignedIn,isAuthenitcated,isAdmin,removeCategory);

module.exports = router;