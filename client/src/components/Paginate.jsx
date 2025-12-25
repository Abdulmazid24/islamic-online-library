import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}`
                        }
                    >
                        <button
                            className={`w-10 h-10 rounded-full font-bold transition-all ${x + 1 === page
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                                }`}
                        >
                            {x + 1}
                        </button>
                    </Link>
                ))}
            </div>
        )
    );
};

export default Paginate;
