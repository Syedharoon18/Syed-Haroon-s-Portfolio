import { ArrowRight, Mail } from 'lucide-react';
import CodeTerminal from '../components/CodeTerminal';

const Home = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto gap-12 lg:gap-20 py-32 lg:py-0">
            {/* Ambient Background Grid & Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

            <div className="relative z-10 lg:w-1/2 text-center lg:text-left flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
                <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-400 self-center lg:self-start shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    Available for new opportunities
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-8 leading-[1.1]">
                    Hello, I'm <br className="hidden sm:block lg:hidden" />
                    <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 block mt-2">Syed Haroon</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-full lg:max-w-xl mx-auto lg:mx-0 font-light">
                    Full Stack Developer building modern, scalable, and responsive web applications.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
                    <a
                        href="/#projects"
                        className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
                    >
                        View Projects
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="/#contact"
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
                    >
                        <Mail className="h-5 w-5 text-cyan-400" />
                        Contact Me
                    </a>
                </div>
            </div>

            <div className="relative z-10 lg:w-1/2 w-full mt-16 lg:mt-0 flex justify-center items-center">
                <div className="w-full max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden border border-slate-800/50 hover:border-cyan-500/30 transition-colors duration-500">
                    <CodeTerminal />
                </div>
            </div>
        </section>
    );
};

export default Home;
