"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Trim the inputs to remove unwanted spaces
      const user = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      const token = await user.user.getIdToken();
      console.log("Your Bearer Token:", token);
      localStorage.setItem("token", token);
      router.push("/Admin/dashboard");
    } catch (err) {
      // Handle specific Firebase errors
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white py-6 px-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-start">Login</h3>
        </div>

        {/* Content */}
        <div className="p-8 bg-white">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-600">
            <span className="text-black border-b-2 border-black pb-1">Login</span>
            <Link href="/registration" className="text-blue-500 hover:underline">Register</Link>
          </div>

          {/* OR divider */}
          <div className="flex items-center justify-center mb-6">
            <hr className="w-full border-t border-gray-200" />
            <span className="px-4 text-gray-400 text-xs">OR</span>
            <hr className="w-full border-t border-gray-200" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            <button
              type="submit"
              disabled={loading || !email || !password}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-black hover:bg-gray-900 transition"
              }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Footer Prompt */}
          <p className="text-center text-xs text-gray-500 mt-6">
            New User?{" "}
            <Link href="/registration" className="text-black font-semibold cursor-pointer hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
