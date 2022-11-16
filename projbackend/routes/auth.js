const express = require('express')
const router = express.Router();
const {signout,signup,signin,isSignedIn} = require('../controllers/auth');
const { check , validationResult  } = require('express-validator');

router.post('/signup',[
    check('name').isLength({ min: 5 }).withMessage('Name must be 5 character Length'),
    check('email').isEmail().withMessage('Please Check email'),
    check('password').isLength({min:3}).withMessage('Password must be at least 3 character Long')
],signup);

router.post('/signin',[
    check('email').isEmail().withMessage('Please Check email'),
    check('password').isLength({min:3}).withMessage('Password must be at least 3 character Long')
],signin);

router.get('/signout',signout);
  
// router.get('/test',isSignedIn,(req,res) => {
//     console.log(req.auth)
//     res.json(req.auth);
// });
module.exports = router;  