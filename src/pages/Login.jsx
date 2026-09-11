import { ArrowLeft, LockKeyhole, Wallet } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const existingUser = JSON.parse(
      localStorage.getItem("spendwiseUser") || "null"
    );

    const userData = {
      name: existingUser?.name || email.split("@")[0],
      email: email,
      phone: existingUser?.phone || "",
      avatar: existingUser?.avatar || "",
    };

    localStorage.setItem("spendwiseUser", JSON.stringify(userData));

    navigate("/app");
  }

  return (
    <main className="flex min-h-screen bg-white text-slate-900 dark:bg-[#090909] dark:text-white transition-colors duration-300">
      <div className="hidden flex-1 flex-col justify-between border-r border-slate-200 p-10 lg:flex dark:border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37] text-black">
            <Wallet size={21} />
          </div>

          <span className="text-xl font-bold">
            Spend<span className="text-[#d4af37]">Wise</span>
          </span>
        </Link>

        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            Welcome back
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight text-slate-900 dark:text-white">
            Your money.
            <br />
            Your clarity.
            <br />
            Your control.
          </h1>

          <p className="mt-6 leading-7 text-slate-600 dark:text-white/50">
            Continue managing your expenses and building smarter financial
            habits with SpendWise.
          </p>
        </div>

        <p className="text-sm text-slate-400 dark:text-white/30">
          Spend smarter. Live better.
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-[520px] lg:px-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37] text-black">
                <Wallet size={21} />
              </div>

              <span className="text-xl font-bold">
                Spend<span className="text-[#d4af37]">Wise</span>
              </span>
            </Link>
          </div>

          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
              <LockKeyhole size={23} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>

            <p className="mt-2 text-slate-600 dark:text-white/50">
              Log in to access your financial dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-white/80"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-[#d4af37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/25"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-white/80"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-[#d4af37] transition hover:text-[#e2c45a]"
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-[#d4af37] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/25"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#d4af37] px-5 py-3.5 font-semibold text-black transition hover:bg-[#e2c45a]"
            >
              Log in
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            <span className="text-xs text-slate-400 dark:text-white/30">OR</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-white/50">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-[#d4af37] hover:text-[#e2c45a]"
            >
              Create one
            </button>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400 dark:text-white/30">
            Demo mode is enabled. Any valid-looking email and password will
            open the dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
