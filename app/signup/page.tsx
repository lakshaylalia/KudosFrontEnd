"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
// import { cn } from "@/lib/utils";

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await auth.signup(data);
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-900 dark:text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">First Name</label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account? <Link href="/signin" className="text-indigo-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

