import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, product: product._id, qty: 1 }));
        toast.success(`'${product.name}' added to cart`);
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-700 border border-slate-100 flex flex-col group overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[3/4] p-6 bg-[#f8fafc] overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        No Image
                    </div>
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center gap-4">
                    <Link
                        to={`/product/${product._id}`}
                        className="p-4 bg-white text-slate-900 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl transform translate-y-4 group-hover:translate-y-0"
                        title="View Details"
                    >
                        <Info size={22} strokeWidth={2.5} />
                    </Link>
                    <button
                        onClick={addToCartHandler}
                        className="p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all duration-300 shadow-xl transform translate-y-4 group-hover:translate-y-0 delay-75"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={22} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-md text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-white/50">
                        {product.category}
                    </span>
                    {product.binding === 'Hardcover' && (
                        <span className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                            {product.binding}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-grow flex flex-col">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1 leading-tight" title={product.name}>
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-[2px] bg-emerald-200"></div>
                    <p className="text-sm text-slate-500 font-bold tracking-tight">{product.author}</p>
                </div>

                <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 mr-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                strokeWidth={3}
                                className={i < Math.floor(product.rating) ? "" : "text-slate-100"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-slate-400 font-black uppercase tracking-widest">({product.numReviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Price</span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-slate-900">৳{product.price}</span>
                            {product.price > 400 && <span className="text-sm text-slate-300 line-through">৳{Math.round(product.price * 1.2)}</span>}
                        </div>
                    </div>
                    <button
                        onClick={addToCartHandler}
                        className="p-3 bg-slate-50 text-slate-900 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm border border-slate-100 group/btn"
                    >
                        <ShoppingCart size={20} strokeWidth={2.5} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
