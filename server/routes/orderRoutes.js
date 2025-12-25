import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { initiatePayment, paymentSuccess, paymentFail, paymentCancel } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         qty: { type: number }
 *         image: { type: string }
 *         price: { type: number }
 *         product: { type: string }
 *     ShippingAddress:
 *       type: object
 *       properties:
 *         address: { type: string }
 *         city: { type: string }
 *         postalCode: { type: string }
 *         country: { type: string }
 *         phoneNumber: { type: string }
 *     Order:
 *       type: object
 *       properties:
 *         orderItems:
 *           type: array
 *           items: { $ref: '#/components/schemas/OrderItem' }
 *         shippingAddress: { $ref: '#/components/schemas/ShippingAddress' }
 *         paymentMethod: { type: string }
 *         itemsPrice: { type: number }
 *         taxPrice: { type: number }
 *         shippingPrice: { type: number }
 *         totalPrice: { type: number }
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payments
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get logged in user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/myorders').get(protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: Success
 */
router.route('/:id').get(protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}/pay:
 *   post:
 *     summary: Initiate SSLCommerz payment for an order
 *     tags: [Orders]
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
 *         description: Payment URL returned
 */
router.route('/:id/pay').post(protect, initiatePayment);

/**
 * @swagger
 * /api/orders/{id}/deliver:
 *   put:
 *     summary: Update order to delivered (Admin only)
 *     tags: [Orders]
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
 *         description: Order updated
 */
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

/**
 * @swagger
 * /api/orders/payment/success/{id}:
 *   post:
 *     summary: SSLCommerz Success Callback
 *     tags: [Orders]
 *     responses:
 *       302:
 *         description: Redirects to frontend order screen
 */
router.post('/payment/success/:id', paymentSuccess);

/**
 * @swagger
 * /api/orders/payment/fail/{id}:
 *   post:
 *     summary: SSLCommerz Fail Callback
 *     tags: [Orders]
 *     responses:
 *       302:
 *         description: Redirects to frontend order screen
 */
router.post('/payment/fail/:id', paymentFail);

/**
 * @swagger
 * /api/orders/payment/cancel/{id}:
 *   post:
 *     summary: SSLCommerz Cancel Callback
 *     tags: [Orders]
 *     responses:
 *       302:
 *         description: Redirects to frontend order screen
 */
router.post('/payment/cancel/:id', paymentCancel);

export default router;
