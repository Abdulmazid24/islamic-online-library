import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import ProfileScreen from './pages/ProfileScreen';
import OrderListScreen from './pages/OrderListScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import UserListScreen from './pages/UserListScreen';
import UserEditScreen from './pages/UserEditScreen';
import BooksScreen from './pages/BooksScreen';
import AuthorsScreen from './pages/AuthorsScreen';
import ContactScreen from './pages/ContactScreen';
import AdminRoute from './components/AdminRoute';
import SearchBox from './components/SearchBox';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <ToastContainer />
      <div className="min-h-screen flex flex-col font-sans">
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold font-arabic">Wafilife Clone</Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <Link to="/books" className="hover:text-secondary transition-colors">Books</Link>
              <Link to="/authors" className="hover:text-secondary transition-colors">Authors</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            </nav>
            <SearchBox />
            <div className="flex space-x-4 items-center">
              <Link to="/cart" className="text-white hover:text-secondary relative">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((acc: number, item: any) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>
              {userInfo ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-white hover:text-secondary focus:outline-none">
                    <span>{userInfo.name}</span>
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    {userInfo.isAdmin && (
                      <>
                        <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Orders
                        </Link>
                        <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Products
                        </Link>
                        <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Users
                        </Link>
                      </>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-white transition-all">
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/books" element={<BooksScreen />} />
            <Route path="/authors" element={<AuthorsScreen />} />
            <Route path="/contact" element={<ContactScreen />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route path="/admin/orderlist/:pageNumber" element={<OrderListScreen />} />
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            </Route>

            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>

        <footer className="bg-neutral-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Wafilife Clone. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
