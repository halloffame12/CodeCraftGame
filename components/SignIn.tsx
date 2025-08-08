import { SignIn } from '@clerk/clerk-react';
import './SignInSignUp.css';

const SignInPage = () => {
    return (
        <div className="centered-full-height">
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </div>
    );
};

export default SignInPage;