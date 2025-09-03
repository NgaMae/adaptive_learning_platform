// resources/js/pages/Learner/Home.tsx
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LearnerHome({ courses }: { courses: Array<any> }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    // Filter courses by search input
    const filteredCourses = courses?.filter((course) => course.title.toLowerCase().includes(search.toLowerCase()));

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Adaptive Learning</h1>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
                    />
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="rounded-lg border bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        {darkMode ? 'Dark' : 'Light'}
                    </button>
                    <div
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600 dark:bg-gray-600 dark:text-gray-200"
                    >
                        {usePage<{ auth: { user: { name: string } } }>().props.auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    {menuOpen && (
                        <div className="absolute top-12 right-0 w-40 rounded-lg border bg-white shadow-lg dark:bg-gray-700">
                            <Link
                                href={route('learner.settings')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                Settings
                            </Link>
                            <button
                                onClick={() => router.post('/logout')}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto max-w-7xl px-6 py-10">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Available Courses</h2>

                {/* Courses Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCourses?.map((course) => (
                        <div
                            key={course.id}
                            className="rounded-xl border bg-white p-5 shadow transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{course.title}</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                By{' '}
                                <a className="underline" href="">
                                    {' '}
                                    {course.creator?.name || 'Adaptive Learning Team'}
                                </a>
                            </p>

                            <div className="mt-4 flex justify-end">
                                <Link
                                    href={route('learner.course', { courseId: course.id })}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Learn Course
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {(!filteredCourses || filteredCourses.length === 0) && (
                        <div className="col-span-full rounded-xl border border-dashed bg-white p-10 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            No courses available yet.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
