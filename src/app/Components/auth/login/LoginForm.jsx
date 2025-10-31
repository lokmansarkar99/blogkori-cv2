"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    //  Prevent multiple submissions
    if (isLoading) return;
    
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        const errorMessage = data?.message || "Login failed";
        toast.error(errorMessage);
        setError(errorMessage);
        setIsLoading(false); //  Reset loading
        return;
      }

      //  Success
      toast.success("Login successful!");

      //  Wait for cookie to be properly set
      await new Promise(resolve => setTimeout(resolve, 1000));

      //  Force a full page refresh to ensure cookie is loaded
      const redirectPath = data?.user?.role === "admin" ? "/admin" : "/user";
      window.location.href = redirectPath; // Use window.location instead of router.push

    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.message || "An error occurred";
      toast.error(errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email address*
        </label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          required
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" disabled={isLoading} />
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
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#7033ff] to-[#8b5cff] text-white py-2.5 rounded-md hover:opacity-90 transition font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
