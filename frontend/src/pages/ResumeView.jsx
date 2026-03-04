import { useState, useEffect } from 'react';
import { Download, CheckCircle, ArrowLeft, Briefcase, Code2, Award, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ResumeView = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [resumeExists, setResumeExists] = useState(false);
    const [loading, setLoading] = useState(true);

    const baseResumeUrl = 'http://localhost:8081/api/upload/resume';
    const [resumeUrl, setResumeUrl] = useState(baseResumeUrl);

    useEffect(() => {
        const uniqueUrl = `${baseResumeUrl}?t=${Date.now()}`;
        setResumeUrl(uniqueUrl);

        // Check if resume exists
        const checkResume = async () => {
            try {
                const response = await fetch(uniqueUrl);
                // We just need to know if it's 200 or 404
                if (response.ok) {
                    setResumeExists(true);
                }
            } catch (err) {
                console.error("Error checking resume:", err);
            } finally {
                setLoading(false);
            }
        };
        checkResume();
    }, []);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // Trigger download programmatically
            const response = await fetch(resumeUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Syed_Haroon_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Show success animation
            setIsDownloading(false);
            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 3000);
        } catch (error) {
            console.error("Download failed:", error);
            setIsDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    if (!resumeExists) {
        return (
            <div className="min-h-[calc(100vh-4rem)] pt-20 flex flex-col items-center justify-center relative overflow-hidden px-4">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 glass-card rounded-2xl p-10 max-w-lg w-full text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/80 mb-6 border border-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-4">Resume <span className="gradient-text">Not Present</span></h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        The requested resume document has not been uploaded yet or is currently unavailable.
                    </p>
                    <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-colors gap-2">
                        <ArrowLeft className="h-5 w-5" />
                        Go Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1120] relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none"></div>

            {/* Sticky Header Bar */}
            <header className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 gap-4">

                        {/* Left: Back Button & Title */}
                        <div className="flex items-center gap-6">
                            <Link to="/" className="group flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 rounded-full sm:rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all duration-300">
                                <ArrowLeft className="h-5 w-5 sm:mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span className="hidden sm:inline font-medium">Back to Portfolio</span>
                            </Link>

                            <div className="hidden md:block h-8 w-[1px] bg-white/10"></div>

                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                    Interactive <span className="text-cyan-400">Resume</span>
                                </h1>
                                <p className="text-xs text-slate-400 hidden lg:block">Syed Haroon M • Java Developer</p>
                            </div>
                        </div>

                        {/* Right: Download Button */}
                        <div className="flex items-center">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading || downloadSuccess}
                                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-500 overflow-hidden relative ${downloadSuccess
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                                    }`}
                            >
                                {downloadSuccess ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 animate-in zoom-in spin-in" />
                                        <span>Saved to Device</span>
                                    </>
                                ) : isDownloading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-900/30 border-t-slate-900"></div>
                                        <span>Preparing PDF...</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-5 w-5" />
                                        <span>Download CV</span>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Interactive Resume Layout */}
            <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Internship Section */}
                        <div className="glass-card rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-colors shadow-xl">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Briefcase className="h-6 w-6 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Internship</h2>
                            </div>

                            <div className="relative pl-6 border-l-2 border-slate-700 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-cyan-400 border-4 border-[#0f172a]"></div>
                                    <h3 className="text-xl font-bold text-white">Java Trainee</h3>
                                    <p className="text-cyan-400 font-medium mb-2">T-machine software solution, Chennai</p>
                                    <p className="text-sm text-slate-400 mb-3 bg-slate-800/50 inline-block px-3 py-1 rounded-full border border-slate-700">Feb 2025 - May 2025</p>
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="glass-card rounded-2xl p-8 border border-slate-700/50 hover:border-emerald-500/30 transition-colors shadow-xl">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <GraduationCap className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Education</h2>
                            </div>

                            <div className="relative pl-6 border-l-2 border-slate-700 space-y-8">
                                {/* College */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-emerald-400 border-4 border-[#0f172a]"></div>
                                    <h3 className="text-xl font-bold text-white">Bachelor of Technology</h3>
                                    <p className="text-emerald-400 font-medium mb-2">Kalasalingam Academy of Research and Education, Srivilliputhur, India</p>
                                    <p className="text-sm text-slate-400 mb-3 bg-slate-800/50 inline-block px-3 py-1 rounded-full border border-slate-700">2020 - 2024</p>
                                    <ul className="text-slate-300 leading-relaxed text-sm list-disc pl-4 space-y-1">
                                        <li>Major in Electronics and Communication Engineering</li>
                                        <li>Created multiple projects and participated at various hackathons and many workshops.</li>
                                        <li>Proficient in delivering engaging and informative speeches held at different occasions.</li>
                                        <li>Overall CGPA : 8.16</li>
                                    </ul>
                                </div>

                                {/* High School */}
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-emerald-400 border-4 border-[#0f172a]"></div>
                                    <h3 className="text-xl font-bold text-white">High School</h3>
                                    <p className="text-emerald-400 font-medium mb-2">Hilton Matric Higher Secondary School, Courtallam, Tenkasi</p>
                                    <p className="text-sm text-slate-400 mb-3 bg-slate-800/50 inline-block px-3 py-1 rounded-full border border-slate-700">2019 - 2020</p>
                                    <ul className="text-slate-300 leading-relaxed text-sm list-disc pl-4 space-y-1">
                                        <li>Majored in computer science with Mathematics</li>
                                        <li>Scored 82 % in SSLC and 75.5 % in HSS</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Skills Section */}
                        <div className="glass-card rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/30 transition-colors shadow-xl">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Code2 className="h-6 w-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Skills</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Skill Category */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-white">Programming Language</span>
                                        <span className="text-sm text-slate-400">JAVA</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>

                                {/* Skill Category */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-white">Frameworks</span>
                                        <span className="text-sm text-slate-400">Spring boot</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                {/* Skill Category */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-white">Database</span>
                                        <span className="text-sm text-slate-400">Oracle with SQL</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>

                                {/* Skill Category */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-white">Tools</span>
                                        <span className="text-sm text-slate-400">Maven</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>

                                {/* Skill Category */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-white">Web Technologies</span>
                                        <span className="text-sm text-slate-400">HTML, CSS, JavaScript</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certification Section */}
                        <div className="glass-card rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/30 transition-colors shadow-xl">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Award className="h-6 w-6 text-amber-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Certifications</h2>
                            </div>

                            <ul className="space-y-4">
                                <li className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all">
                                    <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors">Full Stack in Java Course</h4>
                                        <p className="text-sm text-slate-400 mt-1">Completed at Credo Systemz, Chennai, TN</p>
                                    </div>
                                </li>
                                <li className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-700 transition-all">
                                    <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors">1st Place in IoTronz</h4>
                                        <p className="text-sm text-slate-400 mt-1">Held at Kalasalingam University</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-6 text-center">
                                <Link to="/#projects" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium hover:underline text-sm">
                                    View my projects <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeView;
