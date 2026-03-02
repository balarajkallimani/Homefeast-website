'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

interface Cook {
  _id: string;
  businessName: string;
  cuisineType: string[];
  serviceArea: string;
  rating: number;
  isApproved: boolean;
}

interface Menu {
  _id: string;
  dishName: string;
  price: number;
  mealType: string;
  cookId: string;
}

export default function BrowseCooksPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [menus, setMenus] = useState<{ [key: string]: Menu[] }>({});
  const [loadingCooks, setLoadingCooks] = useState(true);
  const [selectedCook, setSelectedCook] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCooks();
    }
  }, [isAuthenticated]);

  const fetchCooks = async () => {
    try {
      setLoadingCooks(true);
      const response: any = await apiClient.cooks.getAll();
      setCooks(response.cooks || response);
      
      // Fetch menus for each cook
      if (Array.isArray(response.cooks || response)) {
        const cooksArray = response.cooks || response;
        for (const cook of cooksArray) {
          fetchMenusForCook(cook._id);
        }
      }
    } catch (error) {
      console.error('Error fetching cooks:', error);
    } finally {
      setLoadingCooks(false);
    }
  };

  const fetchMenusForCook = async (cookId: string) => {
    try {
      const response: any = await apiClient.menus.getByCook(cookId);
      setMenus(prev => ({
        ...prev,
        [cookId]: response.menus || response || []
      }));
    } catch (error) {
      console.error(`Error fetching menus for cook ${cookId}:`, error);
      setMenus(prev => ({
        ...prev,
        [cookId]: []
      }));
    }
  };

  const filteredCooks = cooks.filter(cook => {
    const matchesSearch = cook.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cook.cuisineType.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-slate-600 font-medium">Loading cooks...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">🍽️ Browse Cooks & Menus</h1>
          <p className="text-xl text-slate-600">Discover verified local cooks and their delicious meals</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Search Cooks or Cuisine</label>
              <input
                type="text"
                placeholder="e.g., Italian, Pasta, Chef Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Meal Type</label>
              <select
                value={mealTypeFilter}
                onChange={(e) => setMealTypeFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition"
              >
                <option value="all">All Meal Types</option>
                <option value="breakfast">🌅 Breakfast</option>
                <option value="lunch">🍽️ Lunch</option>
                <option value="dinner">🌙 Dinner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cooks Grid */}
        {loadingCooks ? (
          <div className="text-center py-12">
            <p className="text-slate-600 font-medium">Loading cooks and menus...</p>
          </div>
        ) : filteredCooks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
            <p className="text-slate-600 text-lg">No cooks found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCooks.map((cook) => (
              <div key={cook._id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                {/* Cook Card Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{cook.businessName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-300">★ {cook.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <span className="text-3xl">👨‍🍳</span>
                  </div>
                </div>

                {/* Cook Details */}
                <div className="p-6">
                  {/* Service Area */}
                  <div className="mb-4">
                    <p className="text-sm text-slate-500 font-semibold mb-1">SERVICE AREA</p>
                    <p className="text-slate-700 font-medium">📍 {cook.serviceArea}</p>
                  </div>

                  {/* Cuisines */}
                  <div className="mb-4">
                    <p className="text-sm text-slate-500 font-semibold mb-2">CUISINES</p>
                    <div className="flex flex-wrap gap-2">
                      {cook.cuisineType.map((cuisine, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Approval Status */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${cook.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {cook.isApproved ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-500 font-semibold mb-3">MENU ITEMS ({menus[cook._id]?.length || 0})</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {menus[cook._id] && menus[cook._id].length > 0 ? (
                        menus[cook._id].map((menu) => (
                          <div key={menu._id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                            <div className="flex-1">
                              <p className="font-medium text-slate-700 text-sm">{menu.dishName}</p>
                              <p className="text-xs text-slate-500">{menu.mealType}</p>
                            </div>
                            <p className="font-bold text-emerald-600">₹{menu.price}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 text-sm">No menu items yet</p>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedCook(cook._id)}
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-200">
            <p className="text-5xl font-bold text-emerald-600 mb-2">{cooks.length}</p>
            <p className="text-slate-600 font-medium">Total Cooks</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-200">
            <p className="text-5xl font-bold text-blue-600 mb-2">{Object.values(menus).flat().length}</p>
            <p className="text-slate-600 font-medium">Menu Items</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-slate-200">
            <p className="text-5xl font-bold text-purple-600 mb-2">
              {cooks.filter(c => c.isApproved).length}
            </p>
            <p className="text-slate-600 font-medium">Verified Cooks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
