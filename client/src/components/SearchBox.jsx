import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={submitHandler} className="relative w-full max-w-md hidden lg:block">
            <input
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search for books or authors..."
                className="w-full bg-neutral-100 border-none rounded-full py-2 px-6 pr-12 focus:ring-2 focus:ring-primary/20 text-neutral-800 placeholder-neutral-400 transition-all font-sans"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-primary transition-colors"
            >
                <Search size={18} />
            </button>
        </form>
    );
};

export default SearchBox;
