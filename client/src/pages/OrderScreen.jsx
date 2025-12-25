import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, deliverOrder, payOrder } from '../redux/orderSlice';
import { MapPin, CreditCard, Package, Truck, CheckCircle, XCircle, Mail, User, Phone, Clock, FileText, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { order, loading, error, loadingPay } = useSelector((state) => state.order);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'success') {
            toast.success('Payment completed successfully!');
        } else if (paymentStatus === 'fail') {
            toast.error('Payment failed. Please try again.');
        } else if (paymentStatus === 'cancel') {
            toast.info('Payment was cancelled.');
        }

        if (!order || order._id !== id) {
            dispatch(getOrderDetails(id));
        }
    }, [order, id, dispatch, searchParams]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    const payHandler = () => {
        dispatch(payOrder(id));
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-500 font-medium">Fetching order details...</p>
        </div>
    );

    if (error) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 max-w-lg mx-auto">
                <XCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Error Loading Order</h2>
                <p>{error}</p>
                <Link to="/profile" className="inline-block mt-6 text-primary font-bold hover:underline">← Back to Profile</Link>
            </div>
        </div>
    );

    return order ? (
        <div className="bg-neutral-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm font-bold uppercase tracking-wider mb-2">
                            <FileText size={16} /> Order Receipt
                        </div>
                        <h1 className="text-3xl font-black text-neutral-800 font-arabic">ID: {order._id.substring(0, 18)}...</h1>
                    </div>
                    <div className="flex gap-3">
                        {order.isPaid ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold border border-emerald-200">
                                <CheckCircle size={16} /> Fully Paid
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold border border-amber-200">
                                <Clock size={16} /> Payment Pending
                            </span>
                        )}
                        {order.isDelivered ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold border border-blue-200">
                                <Truck size={16} /> Delivered
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-600 rounded-full text-sm font-bold border border-neutral-300">
                                <Truck size={16} /> In Transit
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-8">
                        {/* Customer & Shipping Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <h2 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
                                        <User size={18} className="text-primary" /> Customer Info
                                    </h2>
                                    <div className="space-y-4 text-neutral-600">
                                        <p className="flex items-center gap-3"><span className="w-8 flex justify-center"><User size={16} /></span> <span className="font-bold text-neutral-900">{order.user.name}</span></p>
                                        <p className="flex items-center gap-3"><span className="w-8 flex justify-center"><Mail size={16} /></span> <a href={`mailto:${order.user.email}`} className="text-primary hover:underline">{order.user.email}</a></p>
                                        <p className="flex items-center gap-3"><span className="w-8 flex justify-center"><Phone size={16} /></span> {order.shippingAddress.phoneNumber}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
                                        <MapPin size={18} className="text-primary" /> Shipping Address
                                    </h2>
                                    <p className="text-neutral-600 leading-relaxed pl-2">
                                        {order.shippingAddress.address}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                    <div className="mt-6">
                                        {order.isDelivered ? (
                                            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 inline-block">
                                                Confirmed Delivered on: {new Date(order.deliveredAt).toLocaleString()}
                                            </div>
                                        ) : (
                                            <div className="text-xs font-bold text-neutral-400 bg-neutral-50 p-3 rounded-xl border border-neutral-100 inline-block">
                                                Package is being prepared for shipment
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Status Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
                                <CreditCard size={18} className="text-primary" /> Payment Status
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-neutral-600 mb-1">Method: <span className="font-bold text-neutral-900 uppercase">{order.paymentMethod}</span></p>
                                    {order.isPaid ? (
                                        <p className="text-xs font-bold text-emerald-600">Transaction ID: {order._id.substring(10)} (Success)</p>
                                    ) : (
                                        <p className="text-xs font-bold text-amber-600 italic">Awaiting payment verification</p>
                                    )}
                                </div>
                                {order.isPaid ? (
                                    <div className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 font-bold text-center">
                                        Paid at {new Date(order.paidAt).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <div className="px-6 py-3 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold text-center">
                                        Not Paid
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items Table Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-lg font-bold text-neutral-800 mb-8 flex items-center gap-2">
                                <Package size={18} className="text-primary" /> Order Items
                            </h2>
                            <div className="divide-y divide-neutral-50">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-28 bg-neutral-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <Link to={`/product/${item.product}`} className="text-lg font-bold text-neutral-800 hover:text-primary transition-colors block mb-1">
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-neutral-500 font-medium">Quantity: {item.qty} × ৳{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="text-xl font-bold text-neutral-900 font-arabic">
                                            ৳{item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100 sticky top-24">
                            <h2 className="text-xl font-bold text-neutral-800 mb-8 pb-4 border-b border-neutral-100">Summary Breakdown</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-neutral-900">৳{order.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Shipping</span>
                                    <span className="font-bold text-neutral-900">৳{order.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Estimated Tax</span>
                                    <span className="font-bold text-neutral-900">৳{order.taxPrice}</span>
                                </div>

                                <div className="pt-6 border-t border-neutral-100 mt-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold text-neutral-900">Grand Total</span>
                                        <div className="text-right">
                                            <span className="text-3xl font-black text-primary font-arabic leading-none">৳{order.totalPrice}</span>
                                            <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-bold">Inclusive of VAT</p>
                                        </div>
                                    </div>
                                </div>

                                {!order.isPaid && (
                                    <div className="space-y-4 mt-8">
                                        <button
                                            onClick={payHandler}
                                            disabled={loadingPay}
                                            className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {loadingPay ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <CreditCard size={20} />}
                                            Pay via SSLCommerz / bKash
                                        </button>
                                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            <ShieldCheck size={14} className="text-emerald-500" /> Secure Payment Gateway
                                        </div>
                                    </div>
                                )}

                                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                    <button
                                        type="button"
                                        className="w-full mt-10 py-5 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                                        onClick={deliverHandler}
                                    >
                                        Mark as Delivered <Truck size={20} />
                                    </button>
                                )}

                                <Link to="/profile" className="flex items-center justify-center gap-2 text-neutral-400 hover:text-primary transition-colors text-sm font-bold mt-8">
                                    <ArrowLeft size={16} /> Back to My Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default OrderScreen;
