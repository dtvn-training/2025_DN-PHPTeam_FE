import * as yup from 'yup';
export const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    fullname: yup.string().min(3, 'Fullname must be at least 3 characters').required('Fullname is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});
