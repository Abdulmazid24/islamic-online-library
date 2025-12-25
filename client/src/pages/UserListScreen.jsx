import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { listUsers, deleteUser } from '../redux/userSlice';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const { userInfo } = useSelector((state) => state.auth);

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary font-arabic">Users</h1>
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
                                    NAME
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    EMAIL
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ADMIN
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{user._id}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-900">
                                            {user.email}
                                        </a>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {user.isAdmin ? (
                                            <div className="text-green-600 flex items-center">
                                                <Check size={16} />
                                            </div>
                                        ) : (
                                            <div className="text-red-600 flex items-center">
                                                <X size={16} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <Link to={`/admin/user/${user._id}/edit`} className="text-blue-600 hover:text-blue-900">
                                                <Edit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(user._id)}
                                                className="text-red-600 hover:text-red-900"
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
            )}
        </div>
    );
};

export default UserListScreen;
