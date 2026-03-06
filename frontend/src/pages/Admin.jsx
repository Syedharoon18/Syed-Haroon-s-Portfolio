import { useState, useEffect } from 'react';
import api from '../services/api';
import { Lock, Upload, Plus, Trash2, Edit2, Loader2, Save, X } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('adminAuth') === 'true';
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Password Update States
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateMsg, setUpdateMsg] = useState({ text: '', type: '' });

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
        }
    }, [isAuthenticated]);

    // Form states
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Profile photo upload
    const [profileFile, setProfileFile] = useState(null);
    const [profileUploading, setProfileUploading] = useState(false);

    // Resume upload
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeUploading, setResumeUploading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { username, password });
            if (res.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminUser', username);
                fetchProjects();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            setPassword('');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setUpdateMsg({ text: '', type: '' });
        const currentUser = localStorage.getItem('adminUser') || 'admin';
        try {
            const res = await api.post('/auth/update-password', {
                username: currentUser,
                oldPassword,
                newPassword
            });
            if (res.status === 200) {
                setUpdateMsg({ text: 'Password updated safely!', type: 'success' });
                setOldPassword('');
                setNewPassword('');
            }
        } catch (err) {
            setUpdateMsg({ text: err.response?.data?.error || 'Update failed', type: 'error' });
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e, setFileState) => {
        setFileState(e.target.files[0]);
    };

    const handleUpload = async (file, setUploadingState) => {
        if (!file) return null;
        setUploadingState(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            // Note: In Vite dev mode we need to hit the backend directly for /api/upload 
            // since we might not have a proxy set up for it yet, but assuming api.js handles it:
            const response = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.imageUrl; // e.g., /uploads/filename.jpg
        } catch (err) {
            console.error('Upload failed:', err);
            alert('File upload failed');
            return null;
        } finally {
            setUploadingState(false);
        }
    };

    const handleProfileUpload = async () => {
        if (!profileFile) return;
        const uploadedUrl = await handleUpload(profileFile, setProfileUploading);
        if (uploadedUrl) {
            alert('Profile photo uploaded to ' + uploadedUrl + '! Note: You need to update your About page or database to use this URL.');
            setProfileFile(null);
        }
    };

    const handleResumeUpload = async () => {
        if (!resumeFile) return;
        setResumeUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', resumeFile);

        try {
            const response = await api.post('/upload/resume', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.resumeUrl) {
                alert('Resume successfully updated!');
                setResumeFile(null);
            }
        } catch (err) {
            console.error('Resume upload failed:', err);
            alert('Resume upload failed');
        } finally {
            setResumeUploading(false);
        }
    };

    const handleSubmitProject = async (e) => {
        e.preventDefault();

        let finalImageUrl = formData.imageUrl;
        if (selectedFile) {
            const uploadedUrl = await handleUpload(selectedFile, setUploading);
            if (uploadedUrl) {
                const backendUrl = api.defaults.baseURL.replace(/\/api$/, '');
                finalImageUrl = `${backendUrl}${uploadedUrl}`; // Fully qualified for immediate rendering
            } else {
                return; // Stop if upload failed
            }
        }

        const projectPayload = {
            ...formData,
            imageUrl: finalImageUrl
        };

        try {
            if (isEditing) {
                await api.put(`/projects/${formData.id}`, projectPayload);
            } else {
                await api.post('/projects', projectPayload);
            }

            fetchProjects();
            resetForm();
        } catch (err) {
            console.error('Error saving project:', err);
            alert('Failed to save project');
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setSelectedFile(null);
        setFormData({
            id: null,
            title: '',
            description: '',
            techStack: '',
            githubUrl: '',
            liveUrl: '',
            imageUrl: ''
        });
    };

    const editProject = (project) => {
        setIsEditing(true);
        setFormData(project);
        setSelectedFile(null);
        window.scrollTo(0, 0); // Scroll to top form
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="glass-card p-8 rounded-2xl max-w-md w-full">
                    <div className="text-center mb-6">
                        <Lock className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold">Admin Access</h2>
                        <p className="text-slate-400 text-sm mt-2">Enter credentials to manage your portfolio</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                placeholder="Password"
                                required
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <button type="submit" disabled={authLoading} className="w-full flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50">
                            {authLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Secure Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-4xl font-extrabold mb-4 md:mb-0">
                    <span className="gradient-text">Admin</span> Dashboard
                </h1>
                <button onClick={() => { setIsAuthenticated(false); localStorage.removeItem('adminAuth'); localStorage.removeItem('adminUser'); }} className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Lock Dashboard
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column: Forms */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Profile Photo Uploader */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Upload className="h-5 w-5 text-cyan-400" />
                            Update Profile Photo
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setProfileFile)}
                                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700 cursor-pointer"
                            />
                            <button
                                onClick={handleProfileUpload}
                                disabled={!profileFile || profileUploading}
                                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {profileUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                Upload Photo
                            </button>
                        </div>
                    </div>

                    {/* Resume Uploader */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Upload className="h-5 w-5 text-emerald-400" />
                            Update Resume (PDF)
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileChange(e, setResumeFile)}
                                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
                            />
                            <button
                                onClick={handleResumeUpload}
                                disabled={!resumeFile || resumeUploading}
                                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {resumeUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                Upload Resume
                            </button>
                        </div>
                    </div>

                    {/* Security Settings Form */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Lock className="h-5 w-5 text-cyan-400" />
                            Security Settings
                        </h3>
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-cyan-500 outline-none text-sm"
                                    placeholder="Current Password"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-cyan-500 outline-none text-sm"
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            {updateMsg.text && (
                                <p className={`text-xs ${updateMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {updateMsg.text}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>

                    {/* Add/Edit Project Form */}
                    <div className="glass-card p-6 rounded-2xl sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                {isEditing ? <Edit2 className="h-5 w-5 text-cyan-400" /> : <Plus className="h-5 w-5 text-emerald-400" />}
                                {isEditing ? 'Edit Project' : 'Add New Project'}
                            </h3>
                            {isEditing && (
                                <button onClick={resetForm} className="text-slate-400 hover:text-white" title="Cancel Edit">
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmitProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="Project Name" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                                <textarea required rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-cyan-500 outline-none resize-none" placeholder="Detailed description..." />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Tech Stack (Comma separated)</label>
                                <input required type="text" value={formData.techStack} onChange={e => setFormData({ ...formData, techStack: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="React, Spring Boot, MySQL" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">GitHub URL</label>
                                    <input type="url" value={formData.githubUrl} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="https://github.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Live URL</label>
                                    <input type="url" value={formData.liveUrl} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none" placeholder="https://..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setSelectedFile)}
                                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700 cursor-pointer"
                                />
                                {formData.imageUrl && !selectedFile && (
                                    <p className="text-xs text-slate-500 mt-1 truncate">Current: {formData.imageUrl}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-colors mt-6 ${isEditing ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                            >
                                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                                {isEditing ? 'Update Project' : 'Save New Project'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Project List */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-6 rounded-2xl min-h-[500px]">
                        <h3 className="text-xl font-bold mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                            Manage Projects
                            <span className="bg-slate-800 text-cyan-400 text-xs py-1 px-3 rounded-full">{projects.length} Total</span>
                        </h3>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-800 rounded-xl">
                                No projects found. Add one from the left!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {projects.map(project => (
                                    <div key={project.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors gap-4">

                                        <div className="flex items-center gap-4 flex-grow w-full">
                                            <div className="h-16 w-24 bg-slate-800 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                                                {project.imageUrl ? (
                                                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-600">No Img</div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-white truncate max-w-xs">{project.title}</h4>
                                                <p className="text-xs text-slate-400 mt-1 truncate max-w-sm">{project.techStack}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => editProject(project)}
                                                className="p-2 bg-slate-800 text-amber-400 hover:bg-slate-700 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="p-2 bg-slate-800 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
