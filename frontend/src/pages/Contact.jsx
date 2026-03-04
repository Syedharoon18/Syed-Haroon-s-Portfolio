import { useState } from 'react';
import api from '../services/api';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null
    });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'name') {
            if (!value.trim()) error = 'Name is required';
        } else if (name === 'email') {
            if (!value.trim()) error = 'Email is required';
            else if (!validateEmail(value)) error = 'Enter a valid email address';
        } else if (name === 'message') {
            if (!value.trim()) error = 'Message cannot be empty';
        }
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate dynamically if the field was already touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);
        const messageError = validateField('message', formData.message);

        const newErrors = { name: nameError, email: emailError, message: messageError };
        setErrors(newErrors);
        setTouched({ name: true, email: true, message: true });

        // If any error exists, prevent submission
        if (nameError || emailError || messageError) {
            return;
        }

        setStatus({ submitting: true, success: false, error: null });

        try {
            await api.post('/contact', formData);
            setStatus({ submitting: false, success: true, error: null });

            // Clear form on success
            setFormData({ name: '', email: '', message: '' });
            setTouched({});
            setErrors({});

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (err) {
            console.error('Submission error:', err);
            setStatus({
                submitting: false,
                success: false,
                error: 'Failed to send message. Please try again or email directly.'
            });
        }
    };

    const getInputClassName = (fieldName) => {
        const baseClass = "w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all";
        if (touched[fieldName] && errors[fieldName]) {
            return `${baseClass} border-red-500 focus:ring-red-500/50 focus:border-red-500`;
        }
        return `${baseClass} border-slate-700 focus:ring-cyan-500/50 focus:border-cyan-500`;
    };

    return (
        <section id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                    Get In <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-lg text-slate-400">
                    Have a project in mind or just want to say hi? I'll try my best to get back to you!
                </p>
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-10">
                {/* Adding noValidate to bypass default browser HTML5 tooltips and enforce custom validation */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClassName('name')}
                                placeholder="John Doe"
                                aria-invalid={touched.name && !!errors.name}
                                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                            />
                            {touched.name && errors.name && (
                                <p id="name-error" className="text-red-400 text-sm mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="h-4 w-4 shrink-0" /> {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClassName('email')}
                                placeholder="john@example.com"
                                aria-invalid={touched.email && !!errors.email}
                                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                            />
                            {touched.email && errors.email && (
                                <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="h-4 w-4 shrink-0" /> {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={6}
                            className={`${getInputClassName('message')} resize-none`}
                            placeholder="Tell me about your project..."
                            aria-invalid={touched.message && !!errors.message}
                            aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                        />
                        {touched.message && errors.message && (
                            <p id="message-error" className="text-red-400 text-sm mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="h-4 w-4 shrink-0" /> {errors.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={status.submitting}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                    >
                        {status.submitting ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                <span>Send Message</span>
                            </>
                        )}
                    </button>

                    {status.success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-4 rounded-xl flex items-center space-x-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle className="h-5 w-5 shrink-0" />
                            <p>Message sent successfully! I'll get back to you soon.</p>
                        </div>
                    )}

                    {status.error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center space-x-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>{status.error}</p>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
