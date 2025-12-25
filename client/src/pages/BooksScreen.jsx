import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import Product from '../components/Product';
import FilterSidebar from '../components/FilterSidebar';
import { Book, Library, LayoutGrid, Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

const BooksScreen = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // Filter State Sync with URL
    const filters = {
        keyword: searchParams.get('keyword') || '',
        pageNumber: searchParams.get('pageNumber') || 1,
        category: searchParams.get('category') || '',
        author: searchParams.get('author') || '',
        publisher: searchParams.get('publisher') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        binding: searchParams.get('binding') || '',
        sortBy: searchParams.get('sortBy') || '',
    };

    const { products, loading, error, page, pages } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, searchParams]);

    const handleFilterChange = (newFilters) => {
        const cleanFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([_, v]) => v !== '')
        );
        setSearchParams(cleanFilters);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-xs text-center">Opening the Library Shelves...</p>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Minimal Header */}
            <div className="bg-white border-b border-slate-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-3">
                                <Library size={16} /> Vast Collection
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-arabic">All <span className="text-emerald-500">Books</span></h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-100 px-4 py-2 rounded-xl text-slate-600 font-bold text-sm">
                                {products?.length} Results Found
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-24">
                            <FilterSidebar
                                onFilterChange={handleFilterChange}
                                currentFilters={filters}
                            />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="lg:w-3/4">
                        {error ? (
                            <div className="bg-red-50 text-red-600 p-8 rounded-[2.5rem] border border-red-100 text-center">
                                <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <>
                                {products?.length === 0 ? (
                                    <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center shadow-sm">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                            <Book size={48} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-400 mb-2">No books found</h3>
                                        <p className="text-slate-400 mb-8">Try adjusting your filters or search keywords.</p>
                                        <button
                                            onClick={() => handleFilterChange({})}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {products?.map((product) => (
                                            <Product key={product._id} product={product} />
                                        ))}
                                    </div>
                                )}

                                {/* Pagination could be added here if needed, 
                                    reusing Paginate component */}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BooksScreen;
