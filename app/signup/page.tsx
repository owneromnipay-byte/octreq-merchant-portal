export default function Signup() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center px-4">

      <div className="w-[450px] rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-10 transition-all duration-500 hover:scale-[1.02]">
<div className="mb-6 flex justify-center">
    <img
        src="/octoreq-nlogo.jpg"
        alt="OCTOREQ"
        className="h-40 w-40 mix-auto"
    />
</div>

    

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

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Company Name"
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

        <button
          className="
            w-full
            mt-6
            bg-[#24F76D]
            text-black
            font-semibold
            py-4
            rounded-xl
          "
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <a href="/login" className="text-[#24F76D] ml-2">
            Sign In
          </a>
        </p>

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