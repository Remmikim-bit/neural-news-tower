import { TEXT } from '../../config/constants';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-12 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold font-serif mb-4 text-slate-900 dark:text-white">{TEXT.siteTitle}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Providing unbiased intelligence for the modern era.<br />
                    Neural News uses advanced AI to analyze political bias in real-time.
                </p>
                <div className="flex justify-center gap-6 text-sm font-bold text-gray-400">
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About Us</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Methodology</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
                </div>
                <div className="mt-8 text-xs text-gray-300 dark:text-gray-600 font-mono">
                    © {new Date().getFullYear()} NEURAL NEWS. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};
