"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for cookies & authentication
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token; // Assuming { token: "your-jwt-token" }

        // Store JWT token in cookies
        Cookies.set("token", token, { expires: 7, secure: false, sameSite: "Strict" });

        // Redirect the user
        router.push("/Dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
