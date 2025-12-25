import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterValues } from '../redux/productSlice';

const FilterSidebar = ({ onFilterChange, currentFilters }) => {
    const dispatch = useDispatch();
    const { filters, loadingFilters } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchFilterValues());
    }, [dispatch]);

    const handleFilterSelection = (type, value) => {
        const newFilters = { ...currentFilters, [type]: value, pageNumber: 1 };
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        onFilterChange({
            keyword: '',
            category: '',
            author: '',
            publisher: '',
            minPrice: '',
            maxPrice: '',
            binding: '',
            sortBy: '',
            pageNumber: 1
        });
    };

    if (loadingFilters) return <div className="p-4">Loading filters...</div>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Price Range</h4>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={currentFilters.minPrice || ''}
                        onChange={(e) => handleFilterSelection('minPrice', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={currentFilters.maxPrice || ''}
                        onChange={(e) => handleFilterSelection('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
            <FilterSection
                title="Categories"
                items={filters.categories}
                activeValue={currentFilters.category}
                onSelect={(val) => handleFilterSelection('category', val)}
            />

            {/* Authors */}
            <FilterSection
                title="Authors"
                items={filters.authors}
                activeValue={currentFilters.author}
                onSelect={(val) => handleFilterSelection('author', val)}
            />

            {/* Publishers */}
            <FilterSection
                title="Publishers"
                items={filters.publishers}
                activeValue={currentFilters.publisher}
                onSelect={(val) => handleFilterSelection('publisher', val)}
            />

            {/* Binding */}
            <FilterSection
                title="Binding"
                items={filters.bindings}
                activeValue={currentFilters.binding}
                onSelect={(val) => handleFilterSelection('binding', val)}
            />
        </div>
    );
};

const FilterSection = ({ title, items, activeValue, onSelect }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">{title}</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div
                        key={item}
                        onClick={() => onSelect(activeValue === item ? '' : item)}
                        className={`flex items-center gap-2 cursor-pointer group transition-all`}
                    >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${activeValue === item
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'bg-white border-slate-300 group-hover:border-emerald-500'
                            }`}>
                            {activeValue === item && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className={`text-sm transition-colors ${activeValue === item ? 'text-emerald-700 font-medium' : 'text-slate-600 group-hover:text-emerald-600'
                            }`}>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
