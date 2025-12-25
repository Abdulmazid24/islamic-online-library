import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterValues } from '../redux/productSlice';
import { User, BookOpen, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthorsScreen = () => {
    const dispatch = useDispatch();
    const { filters, loadingFilters } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        dispatch(fetchFilterValues());
    }, [dispatch]);

    const authors = filters?.authors?.filter(a => a.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    if (loadingFilters) return (
        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Loading Authors...</p>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-6">
                        <User size={16} /> Knowledge Curators
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Meet the <span className="text-emerald-500">Authors</span></h1>
                    <p className="text-slate-500 text-lg">Discover the brilliant minds behind our collection of timeless Islamic wisdom and modern literature.</p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-16 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for an author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium"
                    />
                </div>

                {/* Authors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {authors.map((author, index) => (
                        <Link
                            to={`/books?author=${author}`}
                            key={index}
                            className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden"
                        >
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500 shadow-inner">
                                    <User size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{author}</h3>
                                <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                                    <BookOpen size={14} /> View Collection
                                </div>

                                <div className="flex items-center justify-center gap-2 text-emerald-500 font-black text-sm group-hover:translate-x-2 transition-transform">
                                    Browse Books <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}

                    {authors.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400">No authors found</h3>
                            <p className="text-slate-400">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthorsScreen;
