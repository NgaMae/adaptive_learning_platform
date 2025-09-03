import { useForm } from '@inertiajs/react';
import PageBreadcrumb from '../../components/components/common/PageBreadCrumb';
type AuthProps = {
    user?: {
        name?: string;
        email?: string;
    };
};

export default function UserProfiles({ auth }: { auth: AuthProps }) {
    const { data, setData, patch, put, processing, errors } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

    const submitProfile = (e: SubmitEvent): void => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const submitPassword = (e: SubmitEvent): void => {
        e.preventDefault();
        put(route('password.update'));
    };
    return (
        <>
            <PageBreadcrumb pageTitle="Profile" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">Profile</h3>
                <div className="space-y-6">
                    <section className="rounded-xl bg-white p-6 shadow dark:bg-gray-600">
                        <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-100">Profile Details</h2>
                        <form onSubmit={submitProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-100">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-100">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </form>
                    </section>
                    <section className="rounded-xl bg-white p-6 shadow dark:bg-gray-600">
                        <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-100">Change Password</h2>
                        <form onSubmit={submitPassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-100">Current Password</label>
                                <input
                                    type="password"
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {errors.current_password && <p className="text-sm text-red-500">{errors.current_password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-100">New Password</label>
                                <input
                                    type="password"
                                    value={data.new_password}
                                    onChange={(e) => setData('new_password', e.target.value)}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {errors.new_password && <p className="text-sm text-red-500">{errors.new_password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-100">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={data.new_password_confirmation}
                                    onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                                />
                                {errors.new_password_confirmation && <p className="text-sm text-red-500">{errors.new_password_confirmation}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                Update Password
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}
