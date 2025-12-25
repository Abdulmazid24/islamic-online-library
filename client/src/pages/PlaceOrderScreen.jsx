import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrder } from '../redux/orderSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, CreditCard, Package, ArrowLeft, Info, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { order, success, error } = useSelector((state) => state.order);

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 50);
    const taxPrice = addDecimals(Number((0.02 * itemsPrice).toFixed(2))); // 2% for example
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (success && order) {
            navigate(`/order/${order._id}`);
            dispatch(resetOrder());
        }
    }, [success, navigate, order, dispatch]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    };

    return (
        <div className="bg-neutral-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                <CheckoutSteps step1 step2 step3 step4 />

                <div className="flex flex-col lg:flex-row gap-10 mt-8">
                    {/* Left Side: Order Details */}
                    <div className="lg:w-2/3 space-y-8">
                        {/* Shipping Info Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800 font-arabic">Shipping Information</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-neutral-700 leading-relaxed">
                                    <span className="font-semibold block mb-1 text-neutral-900">Address</span>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-neutral-500 text-sm">
                                    <Info size={14} /> Registered Phone: <span className="text-neutral-900 font-medium">{cart.shippingAddress.phoneNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <CreditCard size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800 font-arabic">Payment Method</h2>
                            </div>
                            <div className="pl-14 flex items-center justify-between">
                                <p className="text-neutral-700">
                                    Selected Method: <span className="font-bold text-neutral-900 ml-2">{cart.paymentMethod}</span>
                                </p>
                                <Link to="/payment" className="text-primary hover:underline text-sm font-semibold">Change</Link>
                            </div>
                        </div>

                        {/* Order Items Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                    <Package size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-neutral-800 font-arabic">Order Contents</h2>
                            </div>

                            {cart.cartItems.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-neutral-500">Your cart is empty</p>
                                    <Link to="/" className="text-primary font-bold">Go Shopping</Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-50 pl-0 md:pl-14">
                                    {cart.cartItems.map((item, index) => (
                                        <div key={index} className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 first:pt-0 last:pb-0 group">
                                            <div className="flex items-center gap-6">
                                                <div className="relative w-24 h-32 bg-neutral-100 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-neutral-800 hover:text-primary transition-colors block mb-1">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-neutral-500">Qty: {item.qty} × ৳{item.price}</p>
                                                </div>
                                            </div>
                                            <div className="text-lg font-bold text-neutral-900 font-arabic">
                                                ৳{item.qty * item.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Order Summary Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-primary sticky top-24">
                            <div className="flex items-center gap-3 mb-8 border-b border-neutral-100 pb-4">
                                <ShoppingBag className="text-primary" size={24} />
                                <h2 className="text-2xl font-bold text-neutral-800 font-arabic">Review Summary</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500">Items Total</span>
                                    <span className="font-semibold text-neutral-800">৳{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500">Estimated Shipping</span>
                                    <span className={`font-semibold ${Number(shippingPrice) === 0 ? 'text-emerald-600' : 'text-neutral-800'}`}>
                                        {Number(shippingPrice) === 0 ? 'Free' : `৳${shippingPrice}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500">Service Fee / Tax</span>
                                    <span className="font-semibold text-neutral-800">৳{taxPrice}</span>
                                </div>

                                <div className="pt-6 border-t border-neutral-100 mt-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-lg font-bold text-neutral-900">Final Total</span>
                                        <span className="text-3xl font-black text-primary font-arabic">৳{totalPrice}</span>
                                    </div>
                                    <p className="text-xs text-neutral-400">Include all applicable taxes and shipping fees.</p>
                                </div>

                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 animate-shake">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className="w-full mt-8 py-5 bg-neutral-900 text-white rounded-2xl font-bold text-xl hover:bg-primary transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Confirm Order <CheckCircle2 size={24} />
                                </button>

                                <Link to="/payment" className="flex items-center justify-center gap-2 text-neutral-500 hover:text-primary transition-colors text-sm font-semibold mt-4">
                                    <ArrowLeft size={16} /> Back to Payment
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
