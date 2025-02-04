'use client';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';
import googleIcon from '../../public/Google__G__logo.svg.webp';
import Input from '../components/Inout';
import Buttons from '../components/Buttons';
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react';
import {useRouter} from "next/navigation";

function AuthForm() {
    const [loginVariant, setLoginVariant] = useState('REGISTER');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useRouter();
    const { data: session, status } = useSession();

    const toggleSubmit = useCallback(() => {
        setLoginVariant((prev) => (prev === 'REGISTER' ? 'LOGIN' : 'REGISTER'));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        if (status === 'authenticated') {
            navigation.push('/chats');
        }
    }, [status, navigation]);


    const onSubmit = async (data) => {
        setIsLoading(true);

        if(loginVariant === 'REGISTER'){
            axios.post('/api/register', data)
                .then(()=>signIn('credentials' , data))
                .catch(()=>toast.error('Something went wrong'))
                .finally(() => setIsLoading(false));
        }
        if(loginVariant === 'LOGIN'){
            signIn('credentials' , {
                ...data,
                redirect : false
            })
                .then((callback)=>{
                    if(callback?.error){
                        toast.error('Invalid Credentials');
                    }
                    if(callback?.ok || !callback?.error){
                        toast.success('Login successfully');
                        navigation.push('/chats');

                    }
                }).finally( () => setIsLoading(false));
        }
    };

    const socialAction = async (provider) => {
        setIsLoading(true);

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#1a1a1c] text-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                {loginVariant === 'REGISTER' && (
                    <Input
                        id="name"
                        label="Name"
                        type="text"
                        register={register}
                        errors={errors}
                    />
                )}
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    register={register}
                    errors={errors}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                />

                <div className={'lassName="mt-4 flex space-x-3'}>
                    <Buttons disable={isLoading} type="submit">
                        {loginVariant === 'LOGIN' ? 'Sign In' : 'Register'}
                    </Buttons>

                    <button
                        className="w-full py-2 mt-4 bg-[#9b0722] text-white rounded-lg flex items-center justify-center border-gray-300 shadow-md hover:shadow-lg focus:outline-none"
                        onClick={toggleSubmit}>
                        {loginVariant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </button>
                </div>

                <div className="mt-4">
                    <button
                        className="w-full py-2 mt-4 bg-[#6d337e] text-white rounded-lg flex items-center justify-center border-gray-300 shadow-md hover:shadow-lg focus:outline-none"
                        onClick={() => socialAction('google')}
                        type="button"
                    >
                        <Image width={20} height={20} className="mr-3" src={googleIcon} alt="Google" />
                        {loginVariant === 'LOGIN' ? 'Sign in with Google' : 'Register with Google'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
