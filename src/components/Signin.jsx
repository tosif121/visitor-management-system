import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { handleChange, validateForm, validationRules } from '@/utils/formUtils';
import Image from 'next/image';
import { InputField } from './ReusableComponents/InputField';
import { signin } from '@/utils/servicesApi';
import Link from 'next/link';
import PasswordToggle from './ReusableComponents/PasswordToggle';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const signinValidationRules = {
    username: [(value) => validationRules.required(value, 'Username')],
    password: [(value) => validationRules.required(value, 'Password'), validationRules.password],
  };

  const handleSign = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData, signinValidationRules);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const params = {
        ...formData,
      };

      const res = await signin(params);
      if (res.status) {
        Cookies.set('vms_token', res.data.token, { expires: 30, path: '/' });
        const jsonData = JSON.stringify(res.data.user);
        localStorage.setItem('userDetails', jsonData);
        router.push('/dashboard');
        toast.success(res.message);
      } else {
        toast.error(res.message || 'Signin failed');
      }
    } catch (error) {
      toast.error(error.response?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen min-w-full bg-[url('/img/login-bg.svg')] bg-no-repeat bg-center bg-cover before:relative">
        <div className="flex flex-col md:justify-center items-center min-h-screen">
          <div className="flex space-x-3 items-center justify-center md:mt-6 mt-3">
            <Image width={50} height={50} src={'/img/logo.svg'} />
            <h1 className="text-primary text-5xl font-serif tracking-widest">VMS</h1>
          </div>
          <div className="lg:w-2/6 2xl:w-3/12 w-3/4 sm:w-1/2  bg-white rounded-xl shadow-[0px_0px_7px_0px_rgba(0,0,0,0.1)] p-4 md:p-6 my-3 md:my-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-6 text-center">Sign in</h2>
            <form onSubmit={handleSign} className="space-y-6 w-full">
              <div className="space-y-2">
                <InputField
                  name="username"
                  type="text"
                  value={formData.username.replace(/\s+/g, '')}
                  onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                  label="Username"
                  placeholder="Enter your Username"
                  error={formErrors.username}
                />
                <div className="relative">
                  <InputField
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password.replace(/\s+/g, '')}
                    onChange={(e) => handleChange(e, setFormData, setFormErrors)}
                    label="Password"
                    placeholder="Enter your Password"
                    error={formErrors.password}
                  />
                  <PasswordToggle showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Signing...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;