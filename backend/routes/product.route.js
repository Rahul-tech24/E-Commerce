import express from 'express';
import { getAllProducts, createProduct, deleteProduct, getFeaturedProducts, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct } from '../controllers/product.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/recommendations', getRecommendedProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);

export default router;
