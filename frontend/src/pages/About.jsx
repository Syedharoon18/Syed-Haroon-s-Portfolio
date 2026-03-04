import { Terminal, Database, Layout, Server, Cloud, Github, Linkedin, Instagram, Mail } from 'lucide-react';

const About = () => {
    const skills = [
        { name: 'Frontend', icon: <Layout className="text-pink-400" />, items: ['React.js', 'JavaScrip(ES6+)', 'HTML5', 'CSS3', 'TailwindCSS/Bootstrap'] },
        { name: 'Backend', icon: <Server className="text-blue-400" />, items: ['Java', 'Spring Boot', 'RESTful API Development', 'Spring MVC', 'Spring Security', 'Hibernate/JPA'] },
        { name: 'Database', icon: <Database className="text-emerald-400" />, items: ['Oracle Database', 'MySQL', 'SQL', 'Database Design & Optimization'] },
        { name: 'Tools', icon: <Terminal className="text-orange-400" />, items: ['Git', 'Github', 'Maven/Gradle', 'Postman', 'Sts', 'Cursor/Antigravity/Vs code'] },
        { name: 'Cloud', icon: <Cloud className="text-cyan-400" />, items: ['AWS', 'GCP', 'Microsoft Azure', 'Netlify'] },
    ];

    const socials = [
        { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/Syedharoon18', color: 'hover:text-white', bg: 'hover:bg-slate-800' },
        { name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://www.linkedin.com/in/syedharoon-profile182002/', color: 'hover:text-blue-400', bg: 'hover:bg-blue-900/20' },
        { name: 'Instagram', icon: <Instagram size={24} />, url: 'https://www.instagram.com/haroon_z_wing', color: 'hover:text-pink-500', bg: 'hover:bg-pink-900/20' },
        { name: 'Email', icon: <Mail size={24} />, url: 'https://mail.google.com/mail/?view=cm&fs=1&to=syedharoon.360@gmail.com', color: 'hover:text-emerald-400', bg: 'hover:bg-emerald-900/20' },
    ];

    return (
        <section id="about" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden">
            {/* Ambient Element */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-purple-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="mb-24">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-12 bg-cyan-400"></div>
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Discover</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 tracking-tight">
                    About <span className="gradient-text">Me</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="prose prose-invert max-w-none text-slate-300">
                        <p className="text-lg leading-relaxed mb-6">
                            I’m a passionate Full Stack Developer specializing in Java, Spring Boot, and React.js, with experience building scalable, high-performance web applications.
                            I enjoy transforming complex business requirements into clean, efficient, and user-friendly solutions..
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            From designing robust backend systems to creating intuitive frontend experiences, I focus on writing maintainable code that delivers real impact.
                            I work with MySQL and Oracle to ensure data is structured, secure, and optimized for performance.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            When I’m not building applications, I’m exploring emerging technologies, refining my skills, or fueling my work with more coffee than I probably should.
                        </p>
                        <p className="text-xl font-medium text-cyan-400">
                            Let’s build something meaningful and scalable.
                        </p>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-white mb-4">Connect with me</h3>
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-400 transition-all duration-300 ${social.color} ${social.bg} hover:-translate-y-1 hover:shadow-lg`}
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl p-8 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-[20px] -z-10"></div>
                        <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-slate-700/50 bg-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-colors duration-500">
                            <img
                                src="/images/profile.jpeg"
                                alt="Syed Haroon"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-[2px] w-12 bg-cyan-400"></div>
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Skills</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold mb-12 tracking-tight">Technical <span className="gradient-text">Arsenal</span></h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <div key={skill.name} className="group relative">
                            {/* Hover effect background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 rounded-2xl"></div>

                            <div className="h-full glass-card rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 bg-slate-900/40 hover:bg-slate-800/60 flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-cyan-500/50">
                                        {skill.icon}
                                    </div>
                                    <h4 className="font-bold text-xl text-white tracking-wide">{skill.name}</h4>
                                </div>

                                <div className="flex-grow flex flex-col justify-end">
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-800/80 border border-slate-700 rounded-lg group-hover:border-slate-600 transition-colors"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
