import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    deleteProductReview,
    getTopProducts,
    getFilterValues,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - author
 *         - publisher
 *         - category
 *         - price
 *         - countInStock
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         author:
 *           type: string
 *         publisher:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         countInStock:
 *           type: number
 *         rating:
 *           type: number
 *         numReviews:
 *           type: number
 *         isbn:
 *           type: string
 *         pages:
 *           type: number
 *         language:
 *           type: string
 *         binding:
 *           type: string
 *         previewUrl:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and search
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Fetch all products with filtering and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a sample product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created
 */
router.route('/').get(getProducts).post(protect, admin, createProduct);

/**
 * @swagger
 * /api/products/top:
 *   get:
 *     summary: Get top rated products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/top', getTopProducts);

/**
 * @swagger
 * /api/products/filters:
 *   get:
 *     summary: Get unique filter values (Authors, Categories, etc.)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/filters', getFilterValues);

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Create a product review
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Review added
 */
router.route('/:id/reviews').post(protect, createProductReview);

/**
 * @swagger
 * /api/products/{id}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review removed
 */
router.route('/:id/reviews/:reviewId').delete(protect, admin, deleteProductReview);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 */
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
