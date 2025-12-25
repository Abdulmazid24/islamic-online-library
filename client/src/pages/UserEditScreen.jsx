import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { getUserDetails, updateUser, resetUserState } from '../redux/userSlice';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch(resetUserState());
            navigate('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, navigate, userId, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/admin/userlist" className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors font-semibold">
                <ArrowLeft size={20} className="mr-2" />
                Go Back
            </Link>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 p-8">
                <h1 className="text-3xl font-bold mb-8 text-primary font-arabic text-center">Edit User</h1>

                {loadingUpdate && <div className="text-center py-4">Updating...</div>}
                {errorUpdate && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{errorUpdate}</div>}

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                            <input
                                id="isAdmin"
                                type="checkbox"
                                className="w-5 h-5 rounded text-primary focus:ring-primary/20 cursor-pointer"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label className="text-gray-700 font-semibold cursor-pointer" htmlFor="isAdmin">Is Admin</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:opacity-90 transition-all transform active:scale-[0.98]"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserEditScreen;
