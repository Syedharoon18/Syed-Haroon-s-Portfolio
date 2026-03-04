import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Loader2, Github, ExternalLink, ArrowLeft, Calendar } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data);
            } catch (err) {
                setError('Project not found or failed to load.');
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-xl max-w-md text-center mb-6">
                    <p>{error}</p>
                </div>
                <Link to="/projects" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Link>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link to="/projects" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to projects
            </Link>

            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[21/9] bg-slate-800">
                    {project.imageUrl ? (
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-lg">
                            No Preview Available
                        </div>
                    )}
                </div>

                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-700/50 pb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{project.title}</h1>
                            <div className="flex items-center text-slate-400 text-sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                {formatDate(project.createdAt)}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                                >
                                    <Github className="mr-2 h-5 w-5" /> Source
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
                                >
                                    <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-12">
                        <h3 className="text-2xl font-bold mb-4">Overview</h3>
                        {project.description.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="text-slate-300 text-lg leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack?.split(',').map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-slate-800/80 text-cyan-300 rounded-lg text-sm font-medium border border-slate-700/50"
                                >
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
