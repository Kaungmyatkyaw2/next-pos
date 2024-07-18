'use client';
import { Input, InputProps } from '@nextui-org/react';
import { EyeIcon, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const CustomPasswordField = ({ ...props }: InputProps) => {
    const [isPassword, setIsPassword] = useState(false);

    const togglePassword = () => {
        setIsPassword((prev) => !prev);
    };

    console.log(props)

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
        />
    );
};

export default CustomPasswordField;
