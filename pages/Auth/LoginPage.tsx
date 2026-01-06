import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThumbioLogo } from '../../components/common/Icons';

const features = [
  'AI thumbnail editing in one prompt',
  'Support for local and YouTube videos',
  'Smart enhancements powered by Thumio AI',
];

const CheckBullet = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/50 bg-emerald-500/10">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Magic sign-in link sent (demo).');
  };

  const handleGoogle = () => {
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-black text-slate-200">
      <header className="py-5 px-6 md:px-12 flex items-center gap-3 border-b border-gray-800">
        <ThumbioLogo />
        <h1 className="text-lg sm:text-xl font-bold text-slate-50">YouTube Thumbnail Editor</h1>
      </header>

      <main className="flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-white leading-snug">
              Log in to your account
            </h1>
            <ul className="space-y-4">
              {features.map(text => (
                <li key={text} className="flex items-start gap-3 text-lg text-slate-300">
                  <CheckBullet />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0f131a] border border-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full justify-self-end">
            <div className="space-y-6">
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 bg-[#1f6feb] hover:bg-[#1b61d1] text-white font-semibold py-3 rounded-md transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-wide">
                <div className="h-px flex-1 bg-gray-800" />
                <span>or</span>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Your Email <span className="text-red-400">(required)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#10131a] border border-gray-800 rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-md transition-colors"
                >
                  Send Sign-In Link
                </button>
                {status && <p className="text-sm text-emerald-400">{status}</p>}
              </form>

              <p className="text-xs text-slate-500 leading-relaxed">
                By signing in, you agree to Thumio&apos;s{' '}
                <a className="text-sky-400 hover:text-sky-300" href="#">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a className="text-sky-400 hover:text-sky-300" href="#">
                  Privacy Policy
                </a>
                .
              </p>

              <p className="text-center text-sm text-slate-400">
                Don&apos;t have an account yet?{' '}
                <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

