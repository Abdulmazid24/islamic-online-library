import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopProducts } from '../redux/productSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const { topProducts, loading, error } = useSelector((state) => state.products);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchTopProducts());
    }, [dispatch]);

    useEffect(() => {
        if (topProducts?.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [topProducts]);

    if (loading) return null;
    if (error) return null;
    if (!topProducts || topProducts?.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts?.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topProducts?.length) % topProducts?.length);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-emerald-900 to-teal-800 rounded-3xl mb-12 shadow-2xl group">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {topProducts?.map((product) => (
                    <div key={product._id} className="min-w-full h-full flex items-center justify-center relative overflow-hidden">
                        {/* Decorative Circles */}
                        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-2xl"></div>

                        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 gap-8">
                            <div className="text-left max-w-xl animate-fade-in-up">
                                <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-4 border border-emerald-500/30">
                                    Editor's Choice
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-arabic leading-tight">
                                    {product.name}
                                </h2>
                                <p className="text-emerald-100 text-lg md:text-xl mb-8 opacity-90 line-clamp-2">
                                    Discover the literary masterpiece by <span className="text-emerald-300 font-semibold">{product.author}</span>. A must-read for seekers of knowledge.
                                </p>
                                <div className="flex items-center gap-6">
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Read More
                                    </Link>
                                    <div className="text-white">
                                        <span className="text-sm opacity-70 block">Starting from</span>
                                        <span className="text-2xl font-bold">৳{product.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group/image pt-8 md:pt-0">
                                <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 group-hover/image:opacity-40 transition-opacity rounded-full scale-75"></div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-48 md:w-72 h-auto object-contain rounded-lg shadow-[25px_25px_50px_rgba(0,0,0,0.4)] transform -rotate-6 group-hover/image:rotate-0 transition-transform duration-500 z-10 relative"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/book-placeholder.png';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-md"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-md"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {topProducts?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-8' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
