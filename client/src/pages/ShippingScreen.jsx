import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, Home, Postcode, Globe, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || 'Bangladesh');
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, phoneNumber }));
        navigate('/payment');
    };

    return (
        <div className="bg-neutral-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <CheckoutSteps step1 step2 />

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-800 font-arabic mb-1">Shipping Details</h1>
                            <p className="text-neutral-500">Provide your address for a smooth delivery.</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-neutral-600 mb-2">Street Address</label>
                            <div className="relative">
                                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="House, Street, Area"
                                    value={address}
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">City</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={city}
                                        required
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-600 mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter Zip"
                                    value={postalCode}
                                    required
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-neutral-600 mb-2">Country</label>
                            <input
                                type="text"
                                placeholder="Bangladesh"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-neutral-600 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="017xxxxxxxx"
                                    value={phoneNumber}
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            <Link to="/cart" className="inline-flex items-center text-neutral-500 hover:text-primary transition-colors font-medium">
                                <ArrowLeft size={18} className="mr-2" /> Back to Cart
                            </Link>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-12 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingScreen;
