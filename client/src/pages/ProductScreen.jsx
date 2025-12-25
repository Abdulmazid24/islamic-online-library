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
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <span className="inline-block bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-bold text-neutral-800 font-arabic">{product.name}</h1>
                            <p className="text-xl text-neutral-500 font-medium">By {product.author}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-neutral-400 font-medium">({product.numReviews} Reviews)</span>
                        </div>

                        <div className="text-3xl font-bold text-primary">৳ {product.price}</div>

                        <div className="border-t border-neutral-100 pt-6">
                            <p className="text-neutral-600 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-neutral-50 p-6 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-neutral-600">Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-neutral-600">Quantity</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="bg-white border border-neutral-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg transition-all transform active:scale-[0.98] ${product.countInStock > 0
                                    ? 'bg-primary text-white hover:opacity-90 hover:shadow-lg'
                                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                                    }`}
                            >
                                <ShoppingCart size={24} />
                                <span>Add to Cart</span>
                            </button>
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

export default ProductScreen;
