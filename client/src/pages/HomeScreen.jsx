import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import CategoryRibbon from '../components/CategoryRibbon';
import FilterSidebar from '../components/FilterSidebar';

const HomeScreen = () => {
    const { keyword: urlKeyword, pageNumber: urlPageNumber } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.products);
    const { loading, error, products, page, pages } = productList;

    // Filter State Sync with URL
    const filters = {
        keyword: searchParams.get('keyword') || urlKeyword || '',
        category: searchParams.get('category') || '',
        author: searchParams.get('author') || '',
        publisher: searchParams.get('publisher') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        binding: searchParams.get('binding') || '',
        sortBy: searchParams.get('sortBy') || '',
        pageNumber: searchParams.get('pageNumber') || urlPageNumber || 1
    };

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, searchParams, urlKeyword, urlPageNumber]);

    const handleFilterChange = (newFilters) => {
        const cleanFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([_, v]) => v !== '')
        );
        setSearchParams(cleanFilters);
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            {!filters.keyword && !urlPageNumber && !searchParams.toString() ? (
                <div className="container mx-auto px-4 pt-8">
                    <ProductCarousel />
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Explore Categories</h2>
                            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                        </div>
                        <CategoryRibbon />
                    </div>
                </div>
            ) : null}

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <FilterSidebar
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 mb-1">
                                    {filters.keyword ? `Search Results for "${filters.keyword}"` : 'Premium Book Collection'}
                                </h1>
                                <p className="text-slate-500 text-sm">
                                    Showing {products.length} of our hand-picked titles
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Sort By:</label>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-semibold transition-all"
                                >
                                    <option value="">Latest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="top-rated">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl aspect-[3/4] animate-pulse border border-slate-100 shadow-sm"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <div className="text-red-500 text-xl font-semibold mb-2">Something went wrong</div>
                                <div className="text-slate-500">{error}</div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <div className="text-emerald-500 text-6xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">No books found</h3>
                                <p className="text-slate-500 mb-8">Try adjusting your filters or search keywords.</p>
                                <button
                                    onClick={() => handleFilterChange({})}
                                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                                    {products.map((product) => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                                <div className="flex justify-center">
                                    <Paginate
                                        pages={pages}
                                        page={page}
                                        keyword={filters.keyword}
                                    />
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
