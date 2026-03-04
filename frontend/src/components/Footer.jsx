import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0b1120] relative mt-auto border-t border-slate-800">
            {/* Subtle Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center gap-4">
                <p className="text-slate-400 text-sm sm:text-base text-center">
                    &copy; {new Date().getFullYear()} <span className="font-medium text-slate-300">Syed Haroon M</span>. All Rights Reserved.
                </p>
                <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
                    Built with <Heart className="h-4 w-4 text-pink-500 animate-pulse inline mx-1" /> using React & Spring Boot
                </p>
            </div>
        </footer>
    );
};

export default Footer;
