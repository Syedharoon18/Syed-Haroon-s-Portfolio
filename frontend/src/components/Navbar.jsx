import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'Home', path: '#home' },
        { name: 'About', path: '#about' },
        { name: 'Projects', path: '#projects' },
        { name: 'Contact', path: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Scrollspy logic
            const currentPosition = window.scrollY + 200; // offset for navbar
            let current = 'home';

            navLinks.forEach(link => {
                const section = document.querySelector(link.path);
                if (section && section.offsetTop <= currentPosition) {
                    current = link.path.substring(1);
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Call once to set initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Code2 className="h-8 w-8 text-cyan-400" />
                        <span className="font-bold text-xl tracking-tight hidden sm:block">
                            Dev<span className="text-cyan-400">Portfolio</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`/${link.path}`}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === link.path.substring(1) ? 'text-cyan-400' : 'text-slate-300'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            to="/resume"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-bold bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 px-4 py-2 rounded-lg transition-colors border border-emerald-700/50 flex items-center gap-2"
                        >
                            Resume
                        </Link>
                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 px-4 py-2 rounded-lg transition-colors border border-slate-700"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Fancy Full-Screen Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-2xl md:hidden overflow-hidden flex flex-col justify-center animate-in fade-in duration-300">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="px-6 space-y-4 relative z-50 w-full max-w-sm mx-auto flex flex-col items-center">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={`/${link.path}`}
                                onClick={() => setIsOpen(false)}
                                className={`block px-6 py-4 rounded-2xl text-2xl font-bold w-full text-center transition-all duration-300 transform translate-y-0 opacity-100 ${activeSection === link.path.substring(1)
                                        ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-xl'
                                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                                    }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'slideUpFade 0.4s ease forwards'
                                }}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="w-16 h-[1px] bg-slate-700 my-4"></div>

                        <Link
                            to="/resume"
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-4 rounded-2xl text-xl font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-center w-full transition-all"
                        >
                            View Interactive Resume
                        </Link>

                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="block px-6 py-4 rounded-2xl text-xl font-bold bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:text-white border border-slate-700 text-center w-full transition-all mt-4"
                        >
                            Admin Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
