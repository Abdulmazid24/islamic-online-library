import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, Wallet, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    const paymentOptions = [
        { id: 'CashOnDelivery', name: 'Cash on Delivery', icon: <Wallet size={24} />, description: 'Pay when you receive the book' },
        { id: 'Bkash', name: 'bKash / Nagad', icon: <div className="text-xl font-bold text-pink-500">৳</div>, description: 'Fast mobile banking payment' },
        { id: 'SSLCommerz', name: 'Cards / NetBanking', icon: <CreditCard size={24} />, description: 'Secure online payment gateway' },
    ];

    return (
        <div className="bg-neutral-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <CheckoutSteps step1 step2 step3 />

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-800 font-arabic mb-1">Payment Method</h1>
                            <p className="text-neutral-500">Choose how you would like to pay.</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            {paymentOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className={`relative flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === option.id
                                            ? 'border-primary bg-emerald-50/50'
                                            : 'border-neutral-100 hover:border-neutral-200 bg-white'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={option.id}
                                        checked={paymentMethod === option.id}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="hidden"
                                    />

                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === option.id ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'
                                        }`}>
                                        {option.icon}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className={`font-bold ${paymentMethod === option.id ? 'text-neutral-900' : 'text-neutral-700'}`}>
                                            {option.name}
                                        </h3>
                                        <p className="text-sm text-neutral-500">{option.description}</p>
                                    </div>

                                    {paymentMethod === option.id && (
                                        <div className="text-primary">
                                            <CheckCircle2 size={24} />
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>

                        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-100">
                            <Link to="/shipping" className="inline-flex items-center text-neutral-500 hover:text-primary transition-colors font-medium">
                                <ArrowLeft size={18} className="mr-2" /> Back to Shipping
                            </Link>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-12 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                            >
                                Review Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;
