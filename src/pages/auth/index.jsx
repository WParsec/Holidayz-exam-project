import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import styles and assets
import styles from './auth.module.scss';
import backgroundImage from '../../assets/backgrounds/leaf.jpg';
import informationIcon from '../../assets/icons/info.svg';

// Schemas
import { loginSchema, registerSchema } from '../../utils/validationSchema';

// Components
import BackSection from '../../components/backSection/index.jsx';

// Hooks
import useRegister from '../../hooks/useRegister';
import useLogin from '../../hooks/useLogin';

function Auth() {
  const [formType, setFormType] = useState('login');
  const [formTitle, setFormTitle] = useState('Login');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register: registerUser, registerError } = useRegister();
  const { login: loginUser, loginError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formType === 'login' ? loginSchema : registerSchema),
  });

  // Handle the form type
  const handleFormType = (e) => {
    const formType = e.target.value;
    setFormType(formType);
    if (formType === 'login') {
      setFormTitle('Login');
    } else {
      setFormTitle('Register');
    }
  };

  useEffect(() => {
    if (loginError || registerError) {
      setIsError(true);
      setErrorMessage(loginError || registerError);
    } else {
      setIsError(false);
    }
  }, [loginError, registerError]);

  // Handle the login and register
  const handleLogin = async (data) => {
    const { password, email } = data;
    const loginData = { password, email };
    await loginUser(loginData);
  };

  const handleRegister = async (data) => {
    console.log('Register data:', data);
    const result = await registerUser(data);

    if (result.success) {
      handleLogin(data);
    }
  };

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <BackSection />
      <section>
        <div className="container">
          <div className={styles.form_wrapper}>
            <div className={styles.button_wrap}>
              <button
                className={formTitle === 'Login' ? `cta active` : `cta`}
                value="login"
                onClick={handleFormType}
              >
                Login
              </button>
              <p>Or</p>
              <button
                className={formTitle === 'Register' ? `cta active` : `cta`}
                value="register"
                onClick={handleFormType}
              >
                Register
              </button>
            </div>
            {formType === 'login' ? (
              <div>
                <fieldset>
                  <legend>LOGIN</legend>
                  <form
                    className={styles.form}
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <input
                      className="auth_input"
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input
                      className="auth_input"
                      type="password"
                      placeholder="Password"
                      {...register('password')}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <button className="cta cta_gradient" type="submit">
                      Login
                    </button>
                  </form>
                </fieldset>
              </div>
            ) : (
              <div>
                <fieldset>
                  <legend>REGISTER</legend>
                  <form
                    className={styles.form}
                    onSubmit={handleSubmit(handleRegister)}
                  >
                    <input
                      className="auth_input"
                      type="text"
                      placeholder="Name"
                      {...register('name')}
                    />
                    {errors.name && <p>{errors.name.message}</p>}

                    <input
                      className="auth_input"
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input
                      className="auth_input"
                      type="password"
                      placeholder="Password"
                      {...register('password')}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input
                      className="auth_input"
                      type="text"
                      placeholder="Avatar URL (Optional)"
                      {...register('avatar')}
                    />
                    {errors.avatar && <p>{errors.avatar.message}</p>}

                    <div className={styles.checkbox_div}>
                      <label>
                        <input type="checkbox" {...register('venueManager')} />I
                        am a Venue Manager
                      </label>
                      <button>
                        <img src={informationIcon} alt="information icon" />
                      </button>
                    </div>
                    <button className="cta cta_gradient" type="submit">
                      Register
                    </button>
                  </form>
                </fieldset>
              </div>
            )}
            {isError && <p className={styles.error}>{errorMessage}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Auth;
