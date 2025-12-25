import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../redux/orderSlice';
import { Check, X, Eye } from 'lucide-react';

const OrderListScreen = () => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.order);
    const { loading, error, orders } = orderList;

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary font-arabic">Orders</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-neutral-200">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Paid
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Delivered
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order._id}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order.user && order.user.name}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order.createdAt.substring(0, 10)}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">৳{order.totalPrice}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.isPaid ? (
                                            <div className="flex items-center text-green-600">
                                                <Check size={16} />
                                                <span className="ml-1">{order.paidAt.substring(0, 10)}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-red-600">
                                                <X size={16} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.isDelivered ? (
                                            <div className="flex items-center text-green-600">
                                                <Check size={16} />
                                                <span className="ml-1">{order.deliveredAt.substring(0, 10)}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-red-600">
                                                <X size={16} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <Link to={`/order/${order._id}`} className="text-primary hover:text-primary-dark">
                                            <Eye size={20} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;
