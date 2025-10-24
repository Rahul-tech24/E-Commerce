import express from 'express';
import { getAllProducts, createProduct, deleteProduct, getFeaturedProducts, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct } from '../controllers/product.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/', getFeaturedProducts);
router.get('/recommendations', getRecommendedProducts);
router.get('/category/:id', getProductsByCategory);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);

export default router;