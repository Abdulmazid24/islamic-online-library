import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile, resetUpdateProfile } from '../redux/authSlice';
import { listMyOrders } from '../redux/orderSlice';
import { User, Mail, Lock, ShoppingBag, Eye, XCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading: loadingUser, error: errorUser, successProfileUpdate } = useSelector((state) => state.auth);
    const { orders, loading: loadingOrders, error: errorOrders } = useSelector((state) => state.order);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (successProfileUpdate) {
                toast.success('Profile updated successfully');
                dispatch(resetUpdateProfile());
            }
            setName(userInfo.name);
            setEmail(userInfo.email);
            dispatch(listMyOrders());
        }
    }, [dispatch, navigate, userInfo, successProfileUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            dispatch(updateProfile({ id: userInfo._id, name, email, password }));
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Profile Form */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <User size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">My Profile</h2>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">New Password (Optional)</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loadingUser}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {loadingUser ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Orders List */}
                <div className="lg:w-2/3">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <ShoppingBag size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800">Order History</h2>
                        </div>

                        {loadingOrders ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-neutral-50 animate-pulse rounded-xl"></div>
                                ))}
                            </div>
                        ) : errorOrders ? (
                            <div className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
                                {errorOrders}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-neutral-300 mb-4 flex justify-center text-6xl">📦</div>
                                <h3 className="text-xl font-bold text-neutral-800 mb-2">No orders found</h3>
                                <p className="text-neutral-500 mb-6">You haven't purchased any books yet.</p>
                                <Link to="/" className="text-primary font-bold hover:underline">Start Reading →</Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-neutral-100">
                                            <th className="pb-4 font-bold text-neutral-600">ID</th>
                                            <th className="pb-4 font-bold text-neutral-600">DATE</th>
                                            <th className="pb-4 font-bold text-neutral-600">TOTAL</th>
                                            <th className="pb-4 font-bold text-neutral-600">PAID</th>
                                            <th className="pb-4 font-bold text-neutral-600">DELIVERED</th>
                                            <th className="pb-4 font-bold text-neutral-600">DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                                                <td className="py-4 text-sm font-medium text-neutral-500">{order._id.substring(0, 10)}...</td>
                                                <td className="py-4 text-sm text-neutral-600">{order.createdAt.substring(0, 10)}</td>
                                                <td className="py-4 text-sm font-bold text-neutral-800">৳{order.totalPrice}</td>
                                                <td className="py-4">
                                                    {order.isPaid ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                                                            <CheckCircle size={14} /> {order.paidAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase">
                                                            <XCircle size={14} /> No
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {order.isDelivered ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                                                            <CheckCircle size={14} /> {order.deliveredAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase">
                                                            <Lock size={14} /> No
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    <Link to={`/order/${order._id}`}>
                                                        <button className="p-2 text-primary hover:bg-emerald-50 rounded-lg transition-colors">
                                                            <Eye size={18} />
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
