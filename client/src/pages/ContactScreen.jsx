import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Send, ExternalLink, User, Code, Globe, Sparkles } from 'lucide-react';

const ContactScreen = () => {
    const contactInfo = {
        name: 'Abdul Mazid',
        title: 'Full-Stack MERN Developer',
        email: 'mazid.developer@gmail.com', // Placeholder or from portfolio
        phone: '+880 17xx-xxxxxx', // Placeholder
        location: 'Dhaka, Bangladesh',
        portfolio: 'https://abdulmazid-portfolio.vercel.app/',
        github: 'https://github.com/Abdulmazid24',
        linkedin: 'https://linkedin.com/in/abdulmazid24',
        facebook: 'https://facebook.com/abdulmazid24',
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold mb-6 border border-emerald-500/20">
                        <Sparkles size={16} /> Available for Projects
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Let's Connect & <span className="text-emerald-400">Collaborate</span></h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Have a project in mind or just want to chat about Islamic literature and tech? I'm always open to discussing new ideas and professional opportunities.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 sticky top-24">
                            <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                            <div className="px-8 pb-10">
                                <div className="relative -mt-16 mb-6">
                                    <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-xl mx-auto">
                                        <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                                            <User size={64} />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{contactInfo.name}</h2>
                                    <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">{contactInfo.title}</p>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Me</p>
                                            <p className="text-sm font-bold text-slate-700">{contactInfo.email}</p>
                                        </div>
                                    </a>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm transition-colors">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</p>
                                            <p className="text-sm font-bold text-slate-700">{contactInfo.location}</p>
                                        </div>
                                    </div>

                                    <a href={contactInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                                            <Globe size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Portfolio</p>
                                            <p className="text-sm font-bold text-slate-700">Visit my website</p>
                                        </div>
                                        <ExternalLink size={16} className="text-slate-300 group-hover:text-emerald-500" />
                                    </a>
                                </div>

                                <div className="flex justify-center gap-4">
                                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg hover:-translate-y-1">
                                        <Github size={20} />
                                    </a>
                                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0077b5] text-white flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg hover:-translate-y-1">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#1877f2] text-white flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg hover:-translate-y-1">
                                        <Facebook size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 font-arabic">Send a Message</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subject</label>
                                        <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium">
                                            <option>General Inquiry</option>
                                            <option>Project Collaboration</option>
                                            <option>Book Request</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="h-full">
                                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Message</label>
                                    <textarea
                                        placeholder="Write your message here..."
                                        className="w-full h-[calc(100%-32px)] px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <button className="w-full md:w-auto px-12 py-5 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                                Send Message <Send size={20} />
                            </button>

                            <div className="mt-12 pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">MERN Expert</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Specialized in React, Node.js, and MongoDB architectures.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Modern UI/UX</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Passionate about creating clean, accessible, and fast web experiences.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                                        <Book size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Book Lover</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Building this platform to spread the light of Islamic knowledge.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
