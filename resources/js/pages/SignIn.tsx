// resources/js/pages/AuthPages/SignIn.tsx
import { Link } from '@inertiajs/react';
import AuthLayout from '../layouts/auth/AuthLayout';

export default function SignIn() {
    return (
        <AuthLayout title="Welcome Back 👋">
            <form className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="********"
                    />
                </div>

                <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Sign In
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
