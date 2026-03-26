// ------------------------------
// Login Form Component
// For ICS 221 Lab 9
// March 2025 by Jason Cumiskey
// version: 1.0
// ------------------------------
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// TypeScript type for Form Data
// NOTE: username can be a username or email.
// Unfortunately, this *must* be named username
// this is a limitation of Passport.js
type FormData = {
  username: string;
  password: string;
}

type loginFormProps = {
  logInUser: ( formData: FormData ) => void
}

// Zod Schema for the Form
// there isn't any data validation required
// because this data will only be compared to
// and never stored. React will escape special
// chars so any kind of attack will be prevented.
// to stop DoS attacks, a max length is imposed.
const loginSchema = z.object({
  username: z
    .string()
    .max(50, { message: "can't enter more than 50 characters for email or username." }),
  password: z
    .string()
    .max(64, { message: "can't enter more than 64 characters for a password." })
});

const LoginForm = ({ logInUser }: loginFormProps) => {
  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="md:w-1/2 mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Log In</h1>
          {/* <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Don't have an account yet?
            <a className="px-2 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="/register">
              Register here
            </a>
          </p> */}
        </div>

        <div className="mt-5">
          {/* Form */}
          <form onSubmit={handleSubmit( formData => logInUser(formData) )}>
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
                <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Email or Username</label>
                <div className="relative">
                  <input type="text" {...register("username")} id="username" name="username" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
                </div>
                <p className="text-xs text-red-600 mt-2" id="email-error">
                  {errors.username?.message}
                </p>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div>
                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                  <label htmlFor="password" className="block text-sm  dark:text-white">Password</label>
                  {/* <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="/resetpassword">Forgot password?</a> */}
                </div>
                <input type="password" {...register("password")} id="password" name="password" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                <p className="text-xs text-red-600 mt-2" id="password-error">
                  { errors.password?.message}
                </p>
              </div>
              {/* End Form Group */}

              <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Log in</button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;