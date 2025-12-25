import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct, resetProductState } from '../redux/productSlice';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const productList = useSelector((state) => state.products);
    const { loading, error, product, loadingUpdate, successUpdate } = productList;

    useEffect(() => {
        if (successUpdate) {
            dispatch(resetProductState());
            navigate('/admin/productlist');
        } else {
            if (!product || product._id !== id) {
                dispatch(fetchProductById(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setAuthor(product.author);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [product, dispatch, id, navigate, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: id,
                name,
                price,
                image,
                author,
                category,
                description,
                countInStock,
            })
        );
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post(`${BASE_URL}/api/upload`, formData, config);

            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/productlist" className="flex items-center text-gray-600 hover:text-primary mb-6">
                <ArrowLeft size={20} className="mr-2" />
                Go Back
            </Link>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-neutral-200">
                <h1 className="text-3xl font-bold mb-6 text-primary font-arabic text-center">Edit Product</h1>

                {loadingUpdate && <div className="text-center text-blue-500 mb-4">Updating...</div>}
                {error && <div className="text-center text-red-500 mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                            <input
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                            />
                            <input
                                type="file"
                                onChange={uploadFileHandler}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
                            />
                            {uploading && <div className="text-sm text-blue-500 mt-2">Uploading...</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Author/Brand</label>
                            <input
                                type="text"
                                placeholder="Enter author or brand"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <input
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
                            <input
                                type="number"
                                placeholder="Enter count in stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEditScreen;
