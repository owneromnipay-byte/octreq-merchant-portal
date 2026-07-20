"use client";

import { useState } from "react";
import { login } from "@/app/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await login(
        email,
        password
      );

      if (response.success) {
        localStorage.setItem(
    "token",
    response.token
);

localStorage.setItem(
    "merchant",
    JSON.stringify(
        response.merchant
    )
);

        window.location.href = "/";
      } else {
        alert(
          response.message ||
            "Login failed."
        );
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center p-6">
      <div className="w-[500px] rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/octoreq-nlogo.jpg"
            alt="OCTOREQ"
            className="h-40 w-40"
          />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-[#24F76D] mt-2">
            Merchant Portal
          </p>

          <p className="text-gray-400 mt-4">
            Secure access to your OCTOREQ dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-white
              px-5
              py-4
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-white
              px-5
              py-4
              outline-none
            "
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              bg-[#24F76D]
              text-black
              font-semibold
              py-4
              rounded-2xl
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </div>

        {/* Links */}
        <p className="text-center text-gray-400 mt-6">
          New to OCTOREQ?
          <a
            href="/signup"
            className="text-[#24F76D] ml-2"
          >
            Create Account
          </a>
        </p>

        {/* Footer */}
        <div className="mt-10 border-t border-slate-700 pt-6">
          <div className="grid grid-cols-3 text-center">

            <div>
              <p className="font-bold text-white">
                99.99%
              </p>
              <p className="text-xs text-gray-500">
                Uptime
              </p>
            </div>

            <div>
              <p className="font-bold text-white">
                24/7
              </p>
              <p className="text-xs text-gray-500">
                Monitoring
              </p>
            </div>

            <div>
              <p className="font-bold text-white">
                1 API
              </p>
              <p className="text-xs text-gray-500">
                Unified
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}