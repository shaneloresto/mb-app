'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type AuthFormData = {
  email?: string;
  username: string;
  password: string;
};

type LoginFormProps = {
  logInUser: (formData: { username: string; password: string }) => Promise<void> | void;
  signUpUser?: (formData: { email: string; username: string; password: string }) => Promise<void> | void;
  serverError?: string;
};

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50, { message: "Cannot exceed 50 characters." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." })
    .max(64, { message: "Cannot exceed 64 characters." }),
  email: z.string().optional()
});

const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50, { message: "Cannot exceed 50 characters." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." })
    .max(64, { message: "Cannot exceed 64 characters." })
});

const LoginForm = ({ logInUser, signUpUser, serverError }: LoginFormProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === 'signup';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    reset();
  };

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    try {
      if (isSignup && signUpUser) {
        await signUpUser({
          email: data.email || '',
          username: data.username,
          password: data.password,
        });
      } else {
        await logInUser({
          username: data.username,
          password: data.password,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="bg-base-100 border border-base-300 rounded-xl p-8 shadow-sm">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-base-content">
            {isSignup ? "Create Account" : "Log In"}
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            {isSignup
              ? "Enter your email, username, and password"
              : "Enter your credentials to continue"}
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-4 p-3 rounded-md bg-error/10 border border-error/20 text-error text-sm">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field (Signup only) */}
          {isSignup && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-base-content mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
                placeholder="name@example.com"
                className={`input input-bordered w-full rounded-lg ${
                  errors.email ? 'input-error' : ''
                }`}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="text-xs text-error mt-1" id="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-base-content mb-1.5">
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              {...register("username")}
              placeholder="Username"
              className={`input input-bordered w-full rounded-lg ${
                errors.username ? 'input-error' : ''
              }`}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
              <p className="text-xs text-error mt-1" id="username-error">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-base-content mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                {...register("password")}
                placeholder="Password"
                className={`input input-bordered w-full pr-10 rounded-lg ${
                  errors.password ? 'input-error' : ''
                }`}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-medium text-base-content/50 hover:text-base-content"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-error mt-1" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 mt-2 rounded-lg bg-neutral text-neutral-content font-medium hover:bg-neutral-focus active:scale-[0.99] transition-all flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Toggle between Log In and Sign Up */}
        <div className="mt-6 pt-4 border-t border-base-200 text-center">
          <p className="text-xs text-base-content/60">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-base-content underline underline-offset-2 hover:text-primary transition-colors"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;