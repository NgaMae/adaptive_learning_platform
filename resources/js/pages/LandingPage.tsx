// resources/js/pages/LandingPage.tsx
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LandingPage() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

    // Sync dark mode with <html> class + localStorage
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white dark:from-gray-800 dark:to-gray-700">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                    <h1 className="text-xl font-bold">Adaptive Learning</h1>
                    <button onClick={() => setDarkMode(!darkMode)} className="rounded-lg bg-white/20 px-3 py-2 transition hover:bg-white/30">
                        {darkMode ? 'Light' : 'Dark'}
                    </button>
                </div>

                <motion.div
                    className="mx-auto max-w-7xl px-6 py-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="mb-4 text-4xl font-bold sm:text-6xl">Adaptive Learning Platform</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 sm:text-xl">
                        Learn programming at your own pace with personalized learning paths, interactive lessons, and AI-generated quizzes tailored to
                        your progress.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/sign-up"
                            className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow transition hover:bg-gray-100"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/sign-in"
                            className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                        >
                            Login
                        </Link>
                    </div>
                </motion.div>
            </header>

            {/* Features Section */}
            <section className="bg-white py-16 transition-colors duration-300 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.h2
                        className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Choose Our Platform?
                    </motion.h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: 'Learn at Your Own Pace',
                                desc: 'Choose from beginner to advanced programming lessons.',
                            },
                            {
                                title: 'AI-Generated Quizzes',
                                desc: 'Test your knowledge with automatically generated quizzes.',
                            },
                            {
                                title: 'Track Your Progress',
                                desc: 'See your growth with progress tracking and reports.',
                            },
                            {
                                title: 'Adaptive Learning Paths',
                                desc: 'Get personalized course suggestions based on performance.',
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                className="rounded-2xl bg-gray-50 p-6 shadow transition hover:shadow-lg dark:bg-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                            >
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{f.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preview Section */}
            <section className="bg-gray-50 py-16 transition-colors duration-300 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <motion.h2
                        className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        See How It Works
                    </motion.h2>
                    <motion.p
                        className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Take a quick look at our interactive dashboard where you can explore courses, lessons, and quizzes designed just for you.
                    </motion.p>
                    <motion.div
                        className="overflow-hidden rounded-2xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src="/images/dashboard-preview.png" alt="Dashboard Preview" className="w-full" />
                    </motion.div>
                </div>
            </section>

            <section className="bg-white py-16 transition-colors duration-300 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.h2
                        className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        For Teachers
                    </motion.h2>

                    <motion.div
                        className="mx-auto max-w-7xl px-6 py-8 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/tutor-sign-up"
                                className="rounded-xl border bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-white hover:text-blue-700"
                            >
                                Sign Up
                            </Link>
                            <Link
                                href="/tutor-sign-in"
                                className="rounded-xl border border-gray-500 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white dark:text-white"
                            >
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: 'Learn at Your Own Pace',
                                desc: 'Choose from beginner to advanced programming lessons.',
                            },
                            {
                                title: 'AI-Generated Quizzes',
                                desc: 'Test your knowledge with automatically generated quizzes.',
                            },
                            {
                                title: 'Track Your Progress',
                                desc: 'See your growth with progress tracking and reports.',
                            },
                            {
                                title: 'Adaptive Learning Paths',
                                desc: 'Get personalized course suggestions based on performance.',
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                className="rounded-2xl bg-gray-50 p-6 shadow transition hover:shadow-lg dark:bg-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                            >
                                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">{f.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-16 transition-colors duration-300 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <motion.h2
                        className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        See How It Works
                    </motion.h2>
                    <motion.p
                        className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Take a quick look at our interactive dashboard where you can explore courses, lessons, and quizzes designed just for you.
                    </motion.p>
                    <motion.div
                        className="overflow-hidden rounded-2xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src="/images/dashboard-preview.png" alt="Dashboard Preview" className="w-full" />
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-6 text-gray-400 transition-colors duration-300">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 sm:flex-row">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Adaptive Learning Platform</p>
                    <div className="mt-4 flex space-x-6 sm:mt-0">
                        <a href="#" className="transition hover:text-white">
                            About
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Contact
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Privacy
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
