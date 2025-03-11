import logo from '../assets/logo.jpg';
import background from '../assets/background.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../services/AuthService';
import useAuth from '../hooks/useAuth';
import { schema } from '../utils/ValidationForm';

function Login() {
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [erorr, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data.email, data.password);

            if (response && response.status === 200) {
                localStorage.setItem('access_token', response.data.access_token);
                setUser(response.data.user);
            }
        } catch (e) {
            if (e.response.data.message === 'Unauthorized') setError('Incorrect email or password');
        }
    };
    return (
        <div className="flex items-center">
            <div className="relative w-[50%]">
                <img src={logo} alt="#" className="absolute left-[50%] translate-x-[-50%]" />
                <img src={background} alt="#" className="w-[100%]" />
            </div>

            <div className="flex flex-1 flex-col px-[200px]">
                <h1 className="mb-[3px] text-center text-[30px] font-bold text-[#111827]">Welcome Back</h1>
                <p className="mb-[40px] text-center text-[#4B5563]">Please enter your details to sign in</p>
                <form onSubmit={handleSubmit(onSubmit)} action="#">
                    <div>
                        <div className="mb-[16px]">
                            <label htmlFor="email" className="mb-[4px] block text-[14px] text-[#4B5563]">
                                Email
                            </label>
                            <input
                                className="w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                                type="email"
                                id="email"
                                autoFocus
                                placeholder="Enter your email"
                                {...register('email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-[4px] block text-[14px] text-[#4B5563]">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register('password')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>

                    {!errors.email && !errors.password && erorr && <p className="mt-1 text-sm text-red-500">{erorr}</p>}
                    <div className="mt-[24px]">
                        <a href="#" className="text-[14px] text-[#2563EB] hover:opacity-[0.8]">
                            Forgot password?
                        </a>
                    </div>

                    <div className="my-[24px]">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-[8px] border-[1px] border-[#E5E7EB] bg-[#2563EB] p-[11px_24px] text-center text-[16px] text-white hover:opacity-[0.9]"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="relative">
                    <p className="text-center text-[14px] text-[#6B7280]">Or continue with</p>
                    <div className="absolute top-[50%] h-[1px] w-full bg-[#D1D5DB]"></div>
                </div>

                <div className="my-[24px] flex justify-between">
                    <button className="cursor-pointer rounded-[8px] border-[1px] border-[#D1D5DB] p-[8px_65px]">
                        <FontAwesomeIcon icon={['fab', 'google']} className="mr-[6px] text-[#EF4444]" /> Google
                    </button>
                    <button className="cursor-pointer rounded-[8px] border-[1px] border-[#D1D5DB] p-[8px_65px]">
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-[6px] text-[#2563EB]" /> Facebook
                    </button>
                </div>

                <div className="text-center text-[14px] text-[#4B5563]">
                    Don't have an account?{' '}
                    <a href="/register" className="ml-[4px] text-[#2563EB] hover:opacity-[0.8]">
                        Register now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
