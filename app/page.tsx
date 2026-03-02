export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section - Premium Gradient */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 leading-tight">Fresh Homemade Meals, Delivered Daily</h1>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Connect with verified local cooks preparing hygienic, delicious meals. Enjoy healthy, affordable food with flexible subscription plans tailored to your lifestyle.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </a>
            <a
              href="/login"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Why Choose HomeFeast?</h2>
            <p className="text-xl text-slate-600">Everything you need for healthy, convenient homemade meals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🍱", title: "Fresh Homemade Food", desc: "Verified home cooks prepare hygienic, fresh meals daily using quality ingredients." },
              { icon: "💰", title: "Affordable Pricing", desc: "Save up to 40% compared to restaurants. Flexible daily, weekly, and monthly plans." },
              { icon: "📍", title: "Support Local", desc: "Help small home-based food businesses while enjoying authentic homemade flavors." },
              { icon: "🔍", title: "Easy Discovery", desc: "Filter by meal type, price, cuisine, and find your perfect cook in seconds." },
              { icon: "📅", title: "Flexible Plans", desc: "Daily, weekly, or monthly subscriptions. Pause or cancel anytime." },
              { icon: "⭐", title: "Verified Reviews", desc: "Check cook profiles and read real customer ratings before ordering." }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Get delicious meals in 4 simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Sign Up", desc: "Create your account in less than a minute" },
              { num: "2", title: "Browse", desc: "Explore verified cooks and their menus" },
              { num: "3", title: "Subscribe", desc: "Choose your meal plan and delivery days" },
              { num: "4", title: "Enjoy", desc: "Fresh meals delivered to your doorstep" }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 text-white text-2xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "1000+", label: "Local Cooks", icon: "👨‍🍳" },
              { num: "15K+", label: "Happy Users", icon: "😊" },
              { num: "50K+", label: "Meals Served", icon: "🍛" },
              { num: "4.8★", label: "Average Rating", icon: "⭐" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center border-l border-emerald-600/30 px-6">
                <p className="text-5xl font-bold text-emerald-400 mb-2">{stat.icon}</p>
                <p className="text-4xl font-bold mb-2">{stat.num}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Experience HomeFeast?</h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            Join thousands of users enjoying fresh, healthy homemade meals from their favorite local cooks.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-lg font-semibold hover:bg-slate-50 transition shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </a>
            <a
              href="/login"
              className="inline-block border-2 border-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
