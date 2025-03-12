import logo from '../assets/logo.jpg';
import background from '../assets/background.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister } from '../utils/ValidationForm';
import { register as registerUser } from '../services/AuthService';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaRegister),
    });

    const [errorMessages, setErrorMessages] = useState({ email: '', password: '', fullname: '', confirmPassword: '' });

    useEffect(() => {
        setErrorMessages({
            email: errors.email?.message ?? '',
            password: errors.password?.message ?? '',
            fullname: errors.fullname?.message ?? '',
            confirmPassword: errors.confirmPassword?.message ?? '',
        });
    }, [errors.email, errors.password, errors.fullname, errors.confirmPassword]);

    const handleRegister = async (data) => {
        try {
            const response = await registerUser(data.email, data.fullname, data.password);
            if (response && response.status === 201) {
                notification.open({
                    type: 'success',
                    message: 'Register successfully',
                    description: 'Register successfully. Please login now!',
                    duration: 2,
                });
                navigate('/login');
            }
        } catch (e) {
            if (e.response.data.errors.email)
                notification.open({
                    type: 'error',
                    message: 'Register fail',
                    description: 'Email have already exists',
                    duration: 2,
                });
            else if (e.response.data.errors.password)
                notification.open({
                    type: 'error',
                    message: 'Register fail',
                    description: 'Password must be at least 6 characters',
                    duration: 2,
                });
        }
    };
    return (
        <div className="flex flex-col items-center lg:flex-row">
            <img src={logo} alt="#" className="hidden h-[80px] max-lg:block sm:h-[100px]" />
            <div className="relative hidden h-screen w-[50%] lg:block">
                <img src={logo} alt="#" className="absolute left-[50%] translate-x-[-50%] lg:h-[100px]" />
                <img src={background} alt="#" className="h-screen w-[100%]" />
            </div>

            <div className="flex w-[100%] flex-1 flex-col px-[36px] sm:w-[70%] lg:w-[50%] lg:px-[50px] xl:px-[100px] 2xl:px-[150px]">
                <h1 className="mb-[3px] text-center text-[30px] font-bold text-[#111827]">Welcome Back</h1>
                <p className="mb-[40px] text-center text-[#4B5563]">Please enter your details to register</p>

                <form onSubmit={handleSubmit(handleRegister)} action="#">
                    <div>
                        <div className="mb-[16px]">
                            <label htmlFor="email" className="mb-[4px] block text-[14px] text-[#4B5563]">
                                Email
                            </label>
                            <input
                                className="w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                                type="text"
                                id="email"
                                autoFocus
                                placeholder="Enter your email"
                                {...register('email')}
                            />
                            <p className="mt-1 text-sm text-red-500">{errorMessages.email}</p>
                        </div>
                        <div className="mb-[16px]">
                            <label htmlFor="fullname" className="mb-[4px] block text-[14px] text-[#4B5563]">
                                Fullname
                            </label>
                            <input
                                className="w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                                type="text"
                                id="fullname"
                                placeholder="Enter your fullname"
                                {...register('fullname')}
                            />
                            <p className="mt-1 text-sm text-red-500">{errorMessages.fullname}</p>
                        </div>
                        <div className="mb-[16px]">
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
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                            <p className="mt-1 text-sm text-red-500">{errorMessages.password}</p>
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="mb-[4px] block text-[14px] text-[#4B5563]">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded-[8px] border-[1px] border-[#D1D5DB] p-[12px_24px] text-[#4B5563] outline-none"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmpassword"
                                    placeholder="Enter your confirm password"
                                    {...register('confirmPassword')}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                            <p className="mt-1 text-sm text-red-500">{errorMessages.confirmPassword}</p>
                        </div>
                    </div>

                    <div className="my-[24px]">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-[8px] border-[1px] border-[#E5E7EB] bg-[#2563EB] p-[11px_24px] text-center text-[16px] text-white hover:opacity-[0.9]"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="relative">
                    <p className="text-center text-[14px] text-[#6B7280]">Or continue with</p>
                    <div className="absolute top-[50%] h-[1px] w-full bg-[#D1D5DB]"></div>
                </div>

                <div className="my-[24px] flex justify-between">
                    <button className="cursor-pointer rounded-[8px] border-[1px] border-[#D1D5DB] p-[8px_30px] sm:p-[8px_50px] 2xl:p-[8px_65px]">
                        <FontAwesomeIcon icon={faGoogle} className="mr-[6px] text-[#EF4444]" /> Google
                    </button>
                    <button className="cursor-pointer rounded-[8px] border-[1px] border-[#D1D5DB] p-[8px_30px] sm:p-[8px_50px] 2xl:p-[8px_65px]">
                        <FontAwesomeIcon icon={faFacebook} className="mr-[6px] text-[#2563EB]" /> Facebook
                    </button>
                </div>

                <div className="text-center text-[14px] text-[#4B5563]">
                    You have an account?{' '}
                    <a href="/login" className="ml-[4px] text-[#2563EB] hover:opacity-[0.8]">
                        Login now
                    </a>
                </div>

                <a href="/" className="mt-[24px] block text-center text-[#2563EB] hover:font-bold">
                    Back to home
                </a>
            </div>
        </div>
    );
}
export default Register;
