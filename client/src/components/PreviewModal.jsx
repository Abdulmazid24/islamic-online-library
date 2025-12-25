import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

const PreviewModal = ({ isOpen, onClose, previewUrl, bookName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">Look Inside: {bookName}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Free Sample Preview</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                            title="Open in new tab"
                        >
                            <ExternalLink size={20} />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer / Iframe */}
                <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-hidden">
                    <iframe
                        src={`${previewUrl}#toolbar=0`}
                        title="Book Preview"
                        className="w-full h-full rounded-2xl border border-slate-200 shadow-inner"
                    >
                        <p>Your browser does not support iframes. <a href={previewUrl}>Download the PDF</a> instead.</p>
                    </iframe>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 font-medium italic">
                        * This is a sample preview. Purchase the full book to get complete access.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full md:w-auto px-8 py-3 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
