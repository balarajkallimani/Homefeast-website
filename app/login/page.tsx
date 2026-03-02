'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">Sign in to your HomeFeast account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <span className="text-red-600 text-xl">⚠️</span>
              <div>
                <p className="text-red-900 font-medium text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition placeholder-slate-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition placeholder-slate-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-400 transition shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-medium text-slate-500">OR</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition">
              Sign up now
            </a>
          </p>

          {/* Help Link */}
          <p className="text-center text-xs text-slate-500 mt-4">
            <a href="#" className="hover:text-slate-700 transition">Forgot password?</a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By signing in, you agree to our <a href="#" className="hover:text-slate-700">Terms</a> and <a href="#" className="hover:text-slate-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
