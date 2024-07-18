import SignupForm from '@/components/auth/signup-form';
import Image from 'next/image';
import React from 'react';

const SignupPage = () => {
    return (
        <section className="flex-center">
            <div className="lg:w-[40%] sm:w-[60%] w-full sm:mr-auto min-h-screen flex-center">
                <SignupForm />
            </div>
            <div className="lg:w-[60%] w-[40%] sm:block hidden h-screen fixed top-0 right-0">
                <Image
                    priority
                    style={{ objectFit: 'cover' }}
                    src={'/images/bg-image.jpg'}
                    alt="signin-background-image"
                    className="brightness-50"
                    fill
                />
            </div>
        </section>
    );
};

export default SignupPage;
