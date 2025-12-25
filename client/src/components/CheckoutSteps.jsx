import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { name: 'Login', icon: <ShoppingBag size={20} />, active: step1, link: '/login' },
        { name: 'Shipping', icon: <Truck size={20} />, active: step2, link: '/shipping' },
        { name: 'Payment', icon: <CreditCard size={20} />, active: step3, link: '/payment' },
        { name: 'Place Order', icon: <CheckCircle size={20} />, active: step4, link: '/placeorder' },
    ];

    return (
        <div className="flex justify-center items-center mb-12 px-4">
            <div className="flex w-full max-w-2xl relative">
                {steps.map((step, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                        {/* Connecting Line */}
                        {index !== 0 && (
                            <div className={`absolute top-5 left-[-50%] right-[50%] h-1 z-0 ${step.active ? 'bg-primary' : 'bg-neutral-200'}`}></div>
                        )}

                        {/* Icon Circle */}
                        {step.active ? (
                            <Link to={step.link} className="z-10 group">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                                    {step.icon}
                                </div>
                            </Link>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center z-10">
                                {step.icon}
                            </div>
                        )}

                        {/* Label */}
                        <span className={`mt-2 text-xs md:text-sm font-semibold ${step.active ? 'text-neutral-800' : 'text-neutral-400'}`}>
                            {step.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutSteps;
