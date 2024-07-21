'use client';
import { Input, InputProps } from '@nextui-org/react';
import { EyeIcon, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const CustomPasswordField = ({
    register,
    ...props
}: InputProps & {
    register: () => UseFormRegisterReturn<any>;
}) => {
    const [isPassword, setIsPassword] = useState(false);

    const togglePassword = () => {
        setIsPassword((prev) => !prev);
    };

    return (
        <Input
            type={isPassword ? 'password' : 'text'}
            endContent={
                isPassword ? (
                    <EyeOff className="size-5 text-muted-foreground" onClick={togglePassword} />
                ) : (
                    <EyeIcon className="size-5 text-muted-foreground" onClick={togglePassword} />
                )
            }
            {...props}
            {...register()}
        />
    );
};

export default CustomPasswordField;
