import LoginForm from '@/components/auth/login-form';
import Image from 'next/image';
import React from 'react';

const LoginPage = () => {
    return (
        <section className="flex-center">
            <div className="lg:w-[60%] w-[40%] sm:block hidden h-screen fixed top-0 left-0">
                <Image
                    priority
                    style={{ objectFit: 'cover' }}
                    src={'/images/bg-image.jpg'}
                    alt="signin-background-image"
                    className="brightness-50"
                    fill
                />
            </div>
            <div className="lg:w-[40%] sm:w-[60%] w-full sm:ml-auto min-h-screen flex-center">
                <LoginForm />
            </div>
        </section>
    );
};

export default LoginPage;
