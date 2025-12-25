import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { initiatePayment, paymentSuccess, paymentFail, paymentCancel } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(protect, initiatePayment);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

// Callbacks
router.post('/payment/success/:id', paymentSuccess);
router.post('/payment/fail/:id', paymentFail);
router.post('/payment/cancel/:id', paymentCancel);

export default router;
