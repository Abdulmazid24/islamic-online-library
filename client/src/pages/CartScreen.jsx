import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="bg-neutral-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <ShoppingBag size={24} />
                    </div>
                    <h1 className="text-4xl font-black text-neutral-800 font-arabic">My Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] shadow-sm border border-neutral-100 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-50 rounded-full mb-6">
                            <ShoppingBag size={40} className="text-neutral-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Your cart is feeling light</h2>
                        <p className="text-neutral-500 mb-8 max-w-sm mx-auto">Explore our collection of Islamic books and find something meaningful to read today.</p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl active:scale-95 text-lg">
                            Start Shopping <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.product} className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex flex-col md:flex-row items-center gap-8 group hover:shadow-md transition-shadow">
                                    <div className="relative w-32 h-44 flex-shrink-0 bg-neutral-50 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex-grow text-center md:text-left">
                                        <Link to={`/product/${item.product}`} className="text-xl font-bold text-neutral-800 hover:text-primary transition-colors block mb-2 leading-tight">
                                            {item.name}
                                        </Link>
                                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-semibold text-neutral-500 mb-4">
                                            <span className="px-3 py-1 bg-neutral-50 rounded-full uppercase tracking-wider">Book</span>
                                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                            <span className={`text-emerald-600 ${item.countInStock > 0 ? 'visible' : 'hidden'}`}>In Stock</span>
                                        </div>
                                        <div className="text-2xl font-black text-neutral-900 font-arabic">৳{item.price}</div>
                                    </div>

                                    <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                                        <div className="flex items-center bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100">
                                            <button
                                                onClick={() => dispatch(addToCart({ ...item, qty: Math.max(1, item.qty - 1) }))}
                                                className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-12 text-center font-bold text-lg">{item.qty}</span>
                                            <button
                                                onClick={() => dispatch(addToCart({ ...item, qty: Math.min(item.countInStock, item.qty + 1) }))}
                                                className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            className="inline-flex items-center gap-2 text-red-400 hover:text-red-600 font-semibold text-sm transition-colors group/del"
                                        >
                                            <Trash2 size={16} className="group-hover/del:animate-bounce" /> Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4">
                                <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary font-bold transition-colors">
                                    <ArrowLeft size={18} /> Keep Browsing
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-[32px] shadow-lg border-t-4 border-primary sticky top-24">
                                <h2 className="text-2xl font-bold text-neutral-800 mb-8 pb-4 border-b border-neutral-100">Order Summary</h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-neutral-600">
                                        <span className="font-medium">Total Items</span>
                                        <span className="font-bold text-neutral-900">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                                    </div>

                                    <div className="pt-6 border-t border-neutral-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-lg font-bold text-neutral-900">Estimated Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-primary font-arabic leading-none tracking-tight">
                                                    ৳{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-neutral-400 leading-relaxed">Shipping and taxes will be calculated during checkout.</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full mt-6 py-5 bg-neutral-900 text-white rounded-[20px] font-bold text-xl hover:bg-primary transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Next Step <ArrowRight size={20} />
                                    </button>

                                    <div className="flex items-center justify-center gap-4 pt-6">
                                        <div className="h-0.5 bg-neutral-100 flex-grow"></div>
                                        <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-black">Secure Checkout</span>
                                        <div className="h-0.5 bg-neutral-100 flex-grow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;
