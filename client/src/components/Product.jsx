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
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col group overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        No Image
                    </div>
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Link
                        to={`/product/${product._id}`}
                        className="p-3 bg-white text-neutral-800 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg"
                        title="View Details"
                    >
                        <Info size={20} />
                    </Link>
                    <button
                        onClick={addToCartHandler}
                        className="p-3 bg-primary text-white rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm border border-neutral-100">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-bold text-neutral-800 mb-1 group-hover:text-primary transition-colors line-clamp-2" title={product.name}>
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-neutral-500 mb-3">{product.author}</p>

                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500 mr-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                strokeWidth={2}
                                className={i < Math.floor(product.rating) ? "" : "text-neutral-200"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-neutral-400">({product.numReviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <span className="text-sm text-neutral-400 block -mb-1">Price</span>
                        <span className="text-xl font-bold text-neutral-900 font-arabic">৳{product.price}</span>
                    </div>
                    <button
                        onClick={addToCartHandler}
                        className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-semibold hover:bg-primary transition-colors shadow-sm"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
