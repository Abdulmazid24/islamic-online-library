import asyncHandler from 'express-async-handler';
import SSLCommerzPayment from 'sslcommerz-lts';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';

dotenv.config();

const store_id = process.env.STORE_ID || 'test67bc6479590da';
const store_passwd = process.env.STORE_PASSWD || 'test67bc6479590da@ssl';
const is_live = false; // true for live, false for sandbox

// @desc    Initiate SSLCommerz payment
// @route   POST /api/orders/:id/pay
// @access  Private
const initiatePayment = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    const trans_id = `TRANS_${Date.now()}`;

    const data = {
        total_amount: order.totalPrice,
        currency: 'BDT',
        tran_id: trans_id,
        success_url: `${process.env.BACKEND_URL}/api/orders/payment/success/${order._id}`,
        fail_url: `${process.env.BACKEND_URL}/api/orders/payment/fail/${order._id}`,
        cancel_url: `${process.env.BACKEND_URL}/api/orders/payment/cancel/${order._id}`,
        ipn_url: `${process.env.BACKEND_URL}/api/orders/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'Books',
        product_category: 'Islamic Books',
        product_profile: 'general',
        cus_name: order.user.name,
        cus_email: order.user.email,
        cus_add1: order.shippingAddress.address,
        cus_add2: order.shippingAddress.address,
        cus_city: order.shippingAddress.city,
        cus_state: order.shippingAddress.city,
        cus_postcode: order.shippingAddress.postalCode,
        cus_country: order.shippingAddress.country,
        cus_phone: order.shippingAddress.phoneNumber,
        cus_fax: order.shippingAddress.phoneNumber,
        ship_name: order.user.name,
        ship_add1: order.shippingAddress.address,
        ship_add2: order.shippingAddress.address,
        ship_city: order.shippingAddress.city,
        ship_state: order.shippingAddress.city,
        ship_postcode: order.shippingAddress.postalCode,
        ship_country: order.shippingAddress.country,
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
        res.status(200).json({ url: apiResponse.GatewayPageURL });
        console.log('Redirecting to: ', apiResponse.GatewayPageURL);
    } else {
        res.status(400);
        throw new Error('Failed to initiate payment');
    }
});

// @desc    Payment success callback
// @route   POST /api/orders/payment/success/:id
// @access  Public
const paymentSuccess = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.tran_id,
        status: req.body.status,
        update_time: req.body.tran_date,
        email_address: req.body.store_id,
    };

    await order.save();
    res.redirect(`${process.env.FRONTEND_URL}/order/${order._id}?payment=success`);
});

// @desc    Payment fail callback
// @route   POST /api/orders/payment/fail/:id
// @access  Public
const paymentFail = asyncHandler(async (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/order/${req.params.id}?payment=fail`);
});

// @desc    Payment cancel callback
// @route   POST /api/orders/payment/cancel/:id
// @access  Public
const paymentCancel = asyncHandler(async (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/order/${req.params.id}?payment=cancel`);
});

export { initiatePayment, paymentSuccess, paymentFail, paymentCancel };
