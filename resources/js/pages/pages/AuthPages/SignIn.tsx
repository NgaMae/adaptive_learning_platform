import SignInForm from '../../../components/components/auth/SignInForm';
import AuthLayout from './AuthPageLayout';

export default function SignIn() {
    return (
        <>
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
