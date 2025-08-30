// resources/js/layouts/LearnerLayout.tsx
import { Link } from '@inertiajs/react';
import { BookOpen, Home, Trophy, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export default function LearnerLayout() {
    return (
        <div className="flex h-screen bg-gray-50 transition-colors dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col bg-white shadow-lg dark:bg-gray-800">
                <div className="p-6 text-xl font-bold text-blue-600 dark:text-white">🎓 My Learning</div>
                <nav className="flex-1 space-y-2 px-4">
                    <Link href="/learner" className="flex items-center rounded-lg p-3 hover:bg-blue-100 dark:hover:bg-gray-700">
                        <Home className="mr-2 h-5 w-5" /> Dashboard
                    </Link>
                    <Link href="/learner/courses" className="flex items-center rounded-lg p-3 hover:bg-blue-100 dark:hover:bg-gray-700">
                        <BookOpen className="mr-2 h-5 w-5" /> My Courses
                    </Link>
                    <Link href="/learner/quizzes" className="flex items-center rounded-lg p-3 hover:bg-blue-100 dark:hover:bg-gray-700">
                        <Trophy className="mr-2 h-5 w-5" /> Quizzes
                    </Link>
                    <Link href="/learner/profile" className="flex items-center rounded-lg p-3 hover:bg-blue-100 dark:hover:bg-gray-700">
                        <User className="mr-2 h-5 w-5" /> Profile
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Top Navbar */}
                <header className="flex h-16 items-center justify-between bg-white px-6 shadow dark:bg-gray-800">
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Learner Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 dark:text-gray-300">Hello, John 👋</span>
                        <img src="/avatar.png" alt="user" className="h-10 w-10 rounded-full border" />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
