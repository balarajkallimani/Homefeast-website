'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await register(formData.name, formData.email, formData.password, formData.role);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
              Join HomeFeast
            </h1>
            <p className="text-slate-600">Create your account to get started</p>
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition placeholder-slate-400"
              />
            </div>

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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition"
              >
                <option value="customer">👤 Customer (Order Meals)</option>
                <option value="cook">👨‍🍳 Cook (Sell Meals)</option>
              </select>
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition placeholder-slate-400"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-400 transition shadow-lg hover:shadow-xl disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-medium text-slate-500">OR</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition">
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Join thousands of users enjoying fresh homemade meals
        </p>
      </div>
    </div>
  );
}
