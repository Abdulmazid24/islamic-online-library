import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, createProductReview, deleteProductReview, resetProductState } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { Star, ShoppingCart, ArrowLeft, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { product, loading, error, successReview, loadingReview, errorReview, successReviewDelete, loadingReviewDelete } = useSelector(
        (state) => state.products
    );
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (successReview) {
            toast.success('Review submitted successfully');
            setRating(0);
            setComment('');
            dispatch(resetProductState());
        }
        if (successReviewDelete) {
            toast.success('Review deleted successfully');
            dispatch(resetProductState());
        }
        dispatch(fetchProductById(id));
    }, [dispatch, id, successReview, successReviewDelete]);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, product: product._id, qty }));
        toast.success('Added to cart');
        navigate('/cart');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview({
                productId: id,
                review: { rating, comment },
            })
        );
    };

    const deleteReviewHandler = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            dispatch(deleteProductReview({ productId: id, reviewId }));
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Books
            </Link>

            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex items-center justify-center h-[500px]">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                            <div className="text-neutral-300">No Image Available</div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    {product.category}
                                </span>
                                <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    {product.binding}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>
                            <p className="text-xl text-slate-500 font-semibold">
                                by <span className="text-emerald-600 underline decoration-emerald-200 decoration-2 underline-offset-4 cursor-pointer hover:text-emerald-700 transition-colors">{product.author}</span>
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={2} className={i < Math.floor(product.rating) ? "" : "text-slate-200"} />
                                ))}
                            </div>
                            <span className="text-slate-400 font-bold">({product.numReviews} Verified Reviews)</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-slate-900">৳{product.price}</span>
                            {product.price > 400 && <span className="text-lg text-slate-400 line-through">৳{Math.round(product.price * 1.2)}</span>}
                        </div>

                        {/* Specification Table */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100">
                                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Book Specifications</h3>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-2">
                                <SpecItem label="ISBN" value={product.isbn || 'N/A'} />
                                <SpecItem label="Publisher" value={product.publisher} />
                                <SpecItem label="Pages" value={product.pages} />
                                <SpecItem label="Language" value={product.language} />
                                <SpecItem label="Publication Year" value={product.publicationYear} />
                                <SpecItem label="Binding" value={product.binding} />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">Description</h3>
                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl space-y-6 shadow-2xl shadow-emerald-900/10">
                            <div className="flex justify-between items-center text-white/60">
                                <span className="font-bold uppercase tracking-widest text-xs">Availability</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${product.countInStock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex justify-between items-center text-white/60">
                                    <span className="font-bold uppercase tracking-widest text-xs">Select Quantity</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="bg-white/10 border border-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1} className="text-slate-900">
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={`flex-1 py-5 rounded-2xl flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest transition-all ${product.countInStock > 0
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-xl shadow-emerald-500/20'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                        }`}
                                >
                                    <ShoppingCart size={18} strokeWidth={3} />
                                    <span>Add to Cart</span>
                                </button>

                                <button className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group">
                                    <CheckCircle size={20} className="group-hover:text-emerald-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-neutral-100 pt-16">
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-neutral-800 font-arabic">Customer Reviews</h2>
                    {product.reviews.length === 0 && (
                        <div className="bg-neutral-50 text-neutral-500 p-8 rounded-2xl text-center italic">
                            No reviews yet. Be the first to review this book!
                        </div>
                    )}
                    <div className="space-y-6">
                        {product.reviews.map((review) => (
                            <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-neutral-800">{review.name}</h4>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-neutral-400">{review.createdAt?.substring(0, 10)}</span>
                                        {userInfo && userInfo.isAdmin && (
                                            <button
                                                onClick={() => deleteReviewHandler(review._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                title="Delete Review"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} className={i < review.rating ? "" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-neutral-600 italic">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 h-fit">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-800 font-arabic">Write a Review</h2>

                    {loadingReview && <div className="text-blue-500 mb-4 flex items-center"><span className="animate-spin mr-2 scale-75">⏳</span> Processing...</div>}
                    {errorReview && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 text-sm flex items-center"><AlertCircle size={16} className="mr-2" />{errorReview}</div>}

                    {userInfo ? (
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label className="block text-neutral-700 font-semibold mb-3">Rating</label>
                                <div className="flex items-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className={`p-2 transition-all transform hover:scale-110 ${rating >= num ? 'text-yellow-500' : 'text-neutral-300 hover:text-yellow-200'}`}
                                        >
                                            <Star size={32} fill={rating >= num ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-neutral-700 font-semibold mb-3">Your Comment</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your thoughts about this book..."
                                    className="w-full p-4 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loadingReview}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all transform active:scale-[0.98]"
                            >
                                Submit Review
                            </button>
                        </form>
                    ) : (
                        <div className="bg-blue-50 text-blue-700 p-6 rounded-2xl text-center">
                            Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SpecItem = ({ label, value }) => (
    <div className="px-6 py-4 border-b border-r border-slate-50 last:border-b-0 group">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value || '---'}</p>
    </div>
);

export default ProductScreen;
