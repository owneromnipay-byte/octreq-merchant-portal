"use client";

import { useState } from "react";

export default function Signup() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_name: companyName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
if (data.success) {
      alert(
    "Account created successfully. Please sign in."
);

window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-[450px] rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-10 transition-all duration-500 hover:scale-[1.02]">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/octoreq-nlogo.jpg"
            alt="OCTOREQ"
            className="h-40 w-40"
          />
        </div>

        {/* Header */}
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-white">
            Build with OCTOREQ
          </h2>

          <p className="text-[#24F76D] mt-2">
            Merchant Portal
          </p>

          <p className="text-gray-400 mt-2">
            Payment infrastructure designed for modern businesses.
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-slate-700
              text-white
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-slate-700
              text-white
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-slate-700
              text-white
            "
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="
            w-full
            mt-6
            bg-[#24F76D]
            text-black
            font-semibold
            py-4
            rounded-xl
            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Links */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <a
            href="/login"
            className="text-[#24F76D] ml-2"
          >
            Sign In
          </a>
        </p>

        {/* Footer */}
        <div className="mt-10 border-t border-slate-700 pt-6">

          <div className="grid grid-cols-3 gap-4 text-center mb-6">

            <div>
              <h3 className="text-white font-bold">
                99.99%
              </h3>

              <p className="text-gray-500 text-xs">
                Uptime
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold">
                24/7
              </h3>

              <p className="text-gray-500 text-xs">
                Monitoring
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold">
                1 API
              </h3>

              <p className="text-gray-500 text-xs">
                Unified
              </p>
            </div>

          </div>

          <p className="text-center text-sm text-gray-500">
            © 2026 OCTOREQ Technologies Limited
          </p>

        </div>

      </div>
    </main>
  );
}