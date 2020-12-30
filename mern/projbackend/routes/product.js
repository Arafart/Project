const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getAProduct, photo, updateProduct, deleteProduct, getAllProduct, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get("/product/:productId", getAProduct)
router.get("/product/photo/:productId", photo)

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn, 
  isAuthenticated, 
  isAdmin, 
  deleteProduct
  );

//update routes
router.put(
  "/product/:productId/:userId", 
  isSignedIn, 
  isAuthenticated, 
  isAdmin, 
  updateProduct
  );

//listing routes
router.get("/products", getAllProduct);

router.get("/products/categories", getAllUniqueCategories)

module.exports = router;
