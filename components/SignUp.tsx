import { SignUp } from '@clerk/clerk-react';
import './SignInSignUp.css';

const SignUpPage = () => {
    return (
        <div className="centered-full-height">
            <SignUp routing="path" path="/sign-up" />
        </div>
    );
};

export default SignUpPage;