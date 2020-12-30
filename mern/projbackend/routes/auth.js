var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");


router.post("/signup", [ 
check("name", "name should be at least 3 char").isLength({ min: 3 }),
check('email','email is required').isEmail(),
check('password')
.isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
.matches(/\d/).withMessage('must contain a number')

],  signup);


router.post("/signin", [check('password')
.isLength({ min: 1 }).withMessage('Password field is required'),
check('email','email is required').isEmail()
],  signin);


router.get("/signout", signout);



module.exports = router;