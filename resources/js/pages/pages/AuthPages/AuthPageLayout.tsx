import React from 'react';
import ThemeTogglerTwo from '../../../components/components/common/ThemeTogglerTwo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
            <div className="relative flex min-h-screen w-full flex-col sm:p-0 dark:bg-gray-900">
                {children}
                <div className="fixed right-6 bottom-6 z-50">
                    <ThemeTogglerTwo />
                </div>
            </div>
        </div>
    );
}
