import { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { Loader2 } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data);
            } catch (err) {
                setError('Failed to load projects. Please try again later.');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-xl max-w-md text-center">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl">
                    Here are some of my recent works. I enjoy building full-stack applications that solve real-world problems.
                </p>
            </div>

            {projects.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
                    No projects found. Add some from the backend!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
