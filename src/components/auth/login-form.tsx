'use client';

import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useCustomToast from '@/hooks/useCustomToast';
import CustomPasswordField from './custom-password-field';

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must contain at least 6 characters!',
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm = () => {
    const router = useRouter();
    const toast = useCustomToast();

    const { register, formState, handleSubmit, ...form } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { errors, isSubmitting } = formState;

    console.log(form.getValues());

    const handleFormSubmit = async (formData: FormSchemaType) => {
        try {
            const res = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            if (res?.ok) {
                router.push('/dashboard');
            } else {
                toast.error({
                    des: res?.error,
                });
            }
        } catch (error) {
            toast.error({
                des: (error as Error)?.message,
            });
        }
    };

    return (
        <div className="md:w-[70%] w-[90%] space-y-10">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Welcome to My POS!</h1>
                <p className="text-sm text-neutral-400 font-light">
                    Start using my app and manage our restaurant!
                </p>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                <Input
                    type="email"
                    label="Email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message as string}
                />
                <Input
                    type="password"
                    label="Password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message as string}
                />

                {/* <CustomPasswordField
                    label="Password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message as string}
                /> */}

                <div className="space-y-3">
                    <Button
                        isLoading={isSubmitting}
                        type="submit"
                        className="w-full py-7"
                        color="primary"
                    >
                        Login
                    </Button>
                    <p className="text-sm text-neutral-400">
                        Haven&apos;t create an account?
                        <Link href={'/signup'} className="underline">
                            {' '}
                            Join us
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
