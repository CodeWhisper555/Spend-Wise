import {
  ArrowRight,
  Check,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#090909] dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="border-b border-slate-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/favicon.svg" alt="SpendWise" className="h-9 w-9 rounded-xl object-contain shadow-sm" />

            <span className="text-xl font-bold tracking-tight">
              Spend<span className="text-[#d4af37]">Wise</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Log in
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e2c45a]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-sm text-[#a37810] dark:text-[#e2c45a]">
              <Sparkles size={15} />
              Your smarter money companion
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl text-slate-900 dark:text-white">
              Take control of your money with{" "}
              <span className="text-[#d4af37]">SpendWise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-white/60">
              Track expenses, understand your spending habits, and build better
              financial decisions with a simple and beautiful personal finance
              dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3.5 font-semibold text-black transition hover:bg-[#e2c45a]"
              >
                Start managing money
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-300 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:border-white/15 dark:text-white/80 dark:hover:border-white/30 dark:hover:bg-white/5 dark:hover:text-white"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-white/50">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#d4af37]" />
                Simple expense tracking
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#d4af37]" />
                Clean financial insights
              </span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#d4af37]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl dark:border-white/10 dark:bg-[#111111]">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
                <div>
                  <p className="text-xs text-slate-400 dark:text-white/40">Overview</p>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">Financial dashboard</p>
                </div>

                <div className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-xs text-slate-400 dark:text-white/40">Total balance</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">₹48,250</p>
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                    +12.8% this month
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-xs text-slate-400 dark:text-white/40">Monthly expenses</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">₹16,840</p>
                  <p className="mt-2 text-xs text-slate-400 dark:text-white/40">
                    Within your budget
                  </p>
                </div>
              </div>

              <div className="mx-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Spending overview</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
                      Last 6 months
                    </p>
                  </div>

                  <TrendingUp className="text-[#d4af37]" size={20} />
                </div>

                <div className="mt-8 flex h-36 items-end justify-between gap-3">
                  {[45, 70, 52, 85, 62, 96, 74].map((height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end justify-center"
                    >
                      <div
                        className={`w-full rounded-t-md ${
                          index === 5
                            ? "bg-[#d4af37]"
                            : "bg-[#d4af37]/25"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="m-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#d4af37]/10 p-2 text-[#d4af37]">
                    <ReceiptText size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Recent expenses</p>
                    <p className="text-xs text-slate-400 dark:text-white/40">
                      Food, travel, shopping
                    </p>
                  </div>

                  <span className="ml-auto text-sm font-semibold text-slate-900 dark:text-white">₹2,450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#0d0d0d]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Built for clarity
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need to manage your spending.
            </h2>

            <p className="mt-4 text-slate-600 dark:text-white/55">
              SpendWise helps you turn everyday transactions into meaningful
              financial awareness.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<ReceiptText size={22} />}
              title="Track every expense"
              description="Record and organize your daily expenses without complicated workflows."
            />

            <FeatureCard
              icon={<TrendingUp size={22} />}
              title="Understand your habits"
              description="See where your money goes through clear summaries and visual insights."
            />

            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Stay financially focused"
              description="Set budgets, review your progress, and make more confident decisions."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Start building better money habits today.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-white/55">
            A clear financial future begins with understanding your present
            spending.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3.5 font-semibold text-black transition hover:bg-[#e2c45a]"
          >
            Enter SpendWise
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-6 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 dark:text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} SpendWise. All rights reserved.
          </p>

          <p>Spend smarter. Live better.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#d4af37]/40 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600 dark:text-white/50">{description}</p>
    </div>
  );
}

export default Landing;
