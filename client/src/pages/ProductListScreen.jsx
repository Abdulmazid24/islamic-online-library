import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, createProduct, resetProductState } from '../redux/productSlice';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageNumber } = useParams();

    const productList = useSelector((state) => state.products);
    const { loading, error, products, loadingDelete, successDelete, loadingCreate, successCreate, productCreate, page, pages } = productList;

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(resetProductState());

        if (successCreate) {
            navigate(`/admin/product/${productCreate._id}/edit`);
        } else {
            dispatch(fetchProducts({ pageNumber }));
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, productCreate, pageNumber]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id)); // Dispatch delete action
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct()); // Dispatch create action to make a sample product
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary font-arabic">Products</h1>
                <button
                    className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-opacity-90 transition-colors"
                    onClick={createProductHandler}
                >
                    <Plus size={20} className="mr-2" />
                    Create Product
                </button>
            </div>

            {loadingDelete && <div className="text-center text-blue-500">Deleting...</div>}
            {loadingCreate && <div className="text-center text-blue-500">Creating...</div>}

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-neutral-200">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product._id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">৳{product.price}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.category}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.author}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-900">
                                                    <Edit size={20} />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => deleteHandler(product._id)}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </div>
    );
};

export default ProductListScreen;
