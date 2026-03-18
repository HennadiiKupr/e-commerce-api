const express = require('express');
const router = express.Router();

const { 
  getAllProduct, 
  createProduct, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct, 
  uploadImage 
} = require('../controller/productController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProduct);
  
router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router.route('/:id')
  .get(getSingleProduct)
  .put([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);



module.exports = router;