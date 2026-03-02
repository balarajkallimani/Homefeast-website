'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {user?.name}! 👋</h1>
            <p className="text-slate-600">Manage your HomeFeast account and orders</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-lg hover:shadow-xl"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Account Information</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Full Name</p>
                  <p className="text-lg font-semibold text-slate-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Email Address</p>
                  <p className="text-lg font-semibold text-slate-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Account Type</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{user?.role === 'customer' ? '👤' : '👨‍🍳'}</span>
                    <p className="text-lg font-semibold text-slate-900 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-700 font-semibold text-sm">Active Orders</h3>
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-4xl font-bold text-emerald-600">0</p>
            <p className="text-xs text-slate-600 mt-2">Currently being prepared</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-700 font-semibold text-sm">Total Orders</h3>
              <span className="text-3xl">🍽️</span>
            </div>
            <p className="text-4xl font-bold text-blue-600">0</p>
            <p className="text-xs text-slate-600 mt-2">All time orders</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-700 font-semibold text-sm">Active Subscriptions</h3>
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-4xl font-bold text-purple-600">0</p>
            <p className="text-xs text-slate-600 mt-2">Current meal plans</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>🚀</span> Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/browse-cooks')}
                className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition text-left">
                → Browse Cooks & Menus
              </button>
              <button className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition text-left">
                → View My Orders
              </button>
              {user?.role === 'cook' && (
                <>
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-left">
                    → Manage My Menu
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-left">
                    → View Earnings
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>ℹ️</span> Account Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-slate-700 font-medium">Email Verified</span>
                <span className="text-emerald-600 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-slate-700 font-medium">Phone Number</span>
                <span className="text-yellow-600 font-bold">Not Added</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-700 font-medium">Address</span>
                <span className="text-slate-600 font-bold">Not Added</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
