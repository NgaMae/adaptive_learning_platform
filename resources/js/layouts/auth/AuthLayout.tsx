// resources/js/layouts/AuthLayout.tsx
import { motion } from 'framer-motion';

export default function AuthLayout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 transition-colors duration-300 dark:bg-gray-900">
            <motion.div
                className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
                {children}
            </motion.div>
        </div>
    );
}
