import * as yup from 'yup';

const emailValidation = /^[\w-]+(\.[\w-]+)*@(?:stud\.noroff\.no|noroff\.no)$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      emailValidation,
      'Email must be a valid stud.noroff.no or noroff.no email address.'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]*$/,
      'Name can only contain letters, numbers, and underscores'
    )
    .required('Name is required'),
  email: yup
    .string()
    .matches(
      emailValidation,
      'Email must be a valid stud.noroff.no or noroff.no email address.'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  avatar: yup.string().url('Invalid URL'),
  venueManager: yup.boolean(),
});

export { loginSchema, registerSchema };
