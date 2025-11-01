"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { loginAction } from "@/actions/auth.action";
import toast from "react-hot-toast";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await loginAction(formData);

        // If result exists (not redirected), it means there was an error
        if (result && !result.success) {
          setError(result.message);
          toast.error(result.message);
        }
        // If no result returned, redirect happened successfully - do nothing
      } catch (err) {
        //  FIXED: Ignore NEXT_REDIRECT error (it's not actually an error)
        if (err?.message === 'NEXT_REDIRECT' || err?.digest?.startsWith('NEXT_REDIRECT')) {
          console.log(' Redirect in progress...');
          return; // Don't show error, redirect is working
        }
        
        // Only show error for actual errors
        console.error('Submit error:', err);
        const errorMessage = err.message || 'An unexpected error occurred';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email address*
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Password*
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            disabled={isPending}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" disabled={isPending} />
          <span className="text-gray-600">Remember Me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-purple-600 hover:underline font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-[#7033ff] to-[#8b5cff] text-white py-2.5 rounded-md hover:opacity-90 transition font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
