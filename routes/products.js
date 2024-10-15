const express = require('express');
const productController = require('../controllers/products');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, productController.addProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
