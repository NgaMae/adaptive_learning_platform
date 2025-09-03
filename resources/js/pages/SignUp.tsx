// resources/js/pages/AuthPages/SignUp.tsx
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '../layouts/auth/AuthLayout';

export default function SignUp() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('sign-up.post'));
    };
    return (
        <AuthLayout title="Create an Account">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">Name</label>
                    <input
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">Email</label>
                    <input
                        onChange={(e) => setData('email', e.target.value)}
                        type="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600 dark:text-gray-300">Password</label>
                    <input
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="********"
                    />
                </div>

                <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
