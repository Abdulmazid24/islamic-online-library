import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, History, Heart, GraduationCap, Quran, Languages } from 'lucide-react';

const CategoryRibbon = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Quran & Hadith', icon: <Quran className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-700' },
        { name: 'Islamic History', icon: <History className="w-6 h-6" />, color: 'bg-blue-100 text-blue-700' },
        { name: 'Children', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-amber-100 text-amber-700' },
        { name: 'Fiqh', icon: <Book className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-700' },
        { name: 'Tasawwuf', icon: <Heart className="w-6 h-6" />, color: 'bg-rose-100 text-rose-700' },
        { name: 'Translations', icon: <Languages className="w-6 h-6" />, color: 'bg-teal-100 text-teal-700' },
        { name: 'Biography', icon: <Book className="w-6 h-6" />, color: 'bg-violet-100 text-violet-700' },
    ];

    const categoryHandler = (category) => {
        // We'll use the search functionality for now, as we don't have a dedicated category page yet
        navigate(`/search/${category}`);
    };

    return (
        <div className="py-8 overflow-x-auto no-scrollbar">
            <div className="flex gap-4 md:gap-6 px-4 min-w-max mx-auto justify-center">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => categoryHandler(cat.name)}
                        className="flex flex-col items-center gap-3 group transition-transform hover:-translate-y-1"
                    >
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                            {cat.icon}
                        </div>
                        <span className="text-sm font-semibold text-neutral-600 group-hover:text-primary transition-colors">
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryRibbon;
