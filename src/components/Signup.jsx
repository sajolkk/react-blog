import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { Input } from './index'

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm();

    const registerHandler = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const session = await authService.getCurrentUser();
                if (session) {
                    dispatch(login(session));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className='mb-2 flex justify-center'>
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100px' />
                        </span>
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                        Already have an account?&nbsp;
                        <Link
                            to='/signin'
                            className='font-medium text-primary transition-all duration-200 hover:underline'>Sign In</Link>
                    </p>
                    {error && <p className='text-red-500 text-center'>{error}</p>}

                    <form action={handleSubmit(registerHandler)}>
                        <div className='space-y-5'>
                            <Input
                                label="Full name"
                                placeholder="Enter your full name"
                                {...register('name', {
                                    required: true
                                })}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig.test(value) || 'Email address must be a valid address!',
                                    }
                                })}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                {...register('password', {
                                    required: true,
                                })}
                            />

                            <button type='submit' className='w-full'>Crete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup