import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import CategoryRibbon from '../components/CategoryRibbon';

const HomeScreen = () => {
    const { keyword, pageNumber } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.products);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(fetchProducts({ keyword, pageNumber: pageNumber || 1 }));
    }, [dispatch, keyword, pageNumber]);

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Conditional Hero/Carousel/Categories */}
            {!keyword && !pageNumber ? (
                <div className="container mx-auto px-4 pt-8">
                    <ProductCarousel />
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">Explore Categories</h2>
                            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <CategoryRibbon />
                    </div>
                </div>
            ) : null}

            <div className="container mx-auto px-4 py-8">
                {keyword ? (
                    <Link to="/" className="inline-flex items-center text-primary hover:text-emerald-700 font-semibold mb-6 transition-colors">
                        ← Back to Home
                    </Link>
                ) : null}

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                            {keyword ? `Search Results for "${keyword}"` : 'New Arrivals'}
                        </h1>
                        <p className="text-neutral-500">
                            {keyword ? `${products.length} books found` : 'Hand-picked Islamic books curated just for you.'}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-neutral-100 shadow-sm"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-neutral-100">
                        <div className="text-red-500 text-xl font-semibold mb-2">Error Occurred</div>
                        <div className="text-neutral-500">{error}</div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-neutral-100">
                        <div className="text-neutral-400 text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-2">No product found</h3>
                        <p className="text-neutral-500 mb-8">Try adjusting your search or browse our categories.</p>
                        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg">
                            Go Back Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
