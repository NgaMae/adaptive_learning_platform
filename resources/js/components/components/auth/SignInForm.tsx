import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from '../../../icons';
import Label from '../form/Label';
import Checkbox from '../form/input/Checkbox';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tutor-sign-in');
    };
    return (
        <div className="flex flex-1 flex-col">
            <div className="w-full pt-10 lg:mx-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeftIcon className="size-5" />
                    Back to Home Page
                </Link>
            </div>
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 text-title-sm font-semibold text-gray-800 sm:text-title-md dark:text-white/90">Sign In</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in!</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        Email <span className="text-error-500">*</span>{' '}
                                    </Label>
                                    <Input onChange={(e) => setData('email', e.target.value)} placeholder="info@gmail.com" />
                                </div>
                                <div>
                                    <Label>
                                        Password <span className="text-error-500">*</span>{' '}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            onChange={(e) => setData('password', e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                                        <span className="block text-theme-sm font-normal text-gray-700 dark:text-gray-400">Keep me logged in</span>
                                    </div>
                                    <Link href="/reset-password" className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <Button type="submit" className="w-full" size="sm">
                                        Sign in
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                                Don&apos;t have an account? {''}
                                <Link href="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
