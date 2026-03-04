import { useState, useEffect } from 'react';

const CodeTerminal = () => {
    const [text, setText] = useState('');
    const fullText = `const developer = {
  name: "Syed Haroon",
  role: "Full Stack Engineer",
  skills: ["React", "Spring Boot", "Tailwind CSS","MySql"],
  passion: "Building awesome apps",
  coffeeCups: Infinity
};

developer.startBuilding();`;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Speed of typing

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <div className="w-full max-w-lg mx-auto bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="mx-auto text-xs text-slate-400 font-mono">portfolio.js</div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 text-left font-mono text-sm md:text-base text-cyan-400 whitespace-pre-wrap">
                {text}
                <span className="animate-pulse font-bold text-white">|</span>
            </div>
        </div>
    );
};

export default CodeTerminal;
