import { useState } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const ProjectCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-slate-800">
            <div className="relative aspect-video overflow-hidden bg-slate-800">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>

                <div
                    className={`text-slate-400 text-sm mb-4 transition-all duration-300 ease-in-out overflow-hidden flex-grow ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-16 line-clamp-3 opacity-90'}`}
                >
                    {project.description}
                </div>

                <div className="mb-6 flex flex-wrap gap-2 mt-auto">
                    {project.techStack?.split(',').map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-slate-800 text-cyan-300 rounded-full border border-slate-700"
                        >
                            {tech.trim()}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-sm font-semibold text-white hover:text-cyan-400 transition-colors focus:outline-none"
                    >
                        {isExpanded ? (
                            <>Read Less <ChevronUp size={16} /></>
                        ) : (
                            <>Read More <ChevronDown size={16} /></>
                        )}
                    </button>

                    <div className="flex items-center space-x-3">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
                                title="View Source"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 hover:bg-slate-800 rounded-full"
                                title="Live Demo"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
