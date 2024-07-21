'use client';

import { Button, Checkbox, Input } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '@/lib/actions/auth.actions';
import CustomPasswordField from './custom-password-field';

const FormSchema = z.object({
    email: z.string().email(),
    name: z.string().min(5, {
        message: 'Name must contain at least 5 characters!',
    }),
    password: z.string().min(6, {
        message: 'Password must contain at least 6 characters!',
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const SignupForm = () => {
    const { register, formState, handleSubmit } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const { errors, isSubmitting } = formState;

    const handleFormSubmit = async (formData: FormSchemaType) => {
        try {
            await signup(formData);
        } catch (error) {
            console.log('Error : ', error);
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
                    type="text"
                    label="Name"
                    {...register('name')}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message as string}
                />
                <Input
                    type="email"
                    label="Email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message as string}
                />
                <CustomPasswordField
                    label="Password"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message as string}
                    register={() => register('password')}
                />
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <Checkbox
                            classNames={{
                                label: 'text-sm',
                            }}
                        >
                            Remember me
                        </Checkbox>
                        <Link className="text-blue-500 text-sm" href={'/forogot-password'}>
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        isLoading={isSubmitting}
                        isDisabled={!formState.isValid && formState.isDirty}
                        type="submit"
                        className="w-full py-7 bg:black"
                        color="primary"
                    >
                        Submit
                    </Button>
                </div>
                <p className="text-sm text-center pt-5 text-neutral-400">
                    Already have an account?
                    <Link href={'/login'} className="underline">
                        {' '}
                        Login now
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;
