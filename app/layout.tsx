import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeFeast - Fresh Homemade Meals",
  description: "Discover fresh, hygienic homemade meals from local cooks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Professional Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div className="flex-shrink-0">
                    <a href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent hover:from-emerald-700 hover:to-emerald-800 transition">
                      🍽️ HomeFeast
                    </a>
                  </div>
                  <nav className="space-x-1 hidden md:flex">
                    <a href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      Dashboard
                    </a>
                    <a href="/chat" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      Chat Support
                    </a>
                    <a href="/calendar" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      Calendar
                    </a>
                    <a href="/submit-project" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      Submit Project
                    </a>
                    <a href="/faqs" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      FAQs
                    </a>
                    <a href="/job-portal" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition">
                      Job Portal
                    </a>
                    <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition">
                      Login
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            <main className="flex-grow">
              {children}
            </main>

            {/* Professional Footer */}
            <footer className="bg-slate-900 text-slate-100 py-12 px-4 border-t border-slate-800">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400 mb-4">🍽️ HomeFeast</h3>
                    <p className="text-sm text-slate-400">Fresh homemade meals from local cooks delivered to your door.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li><a href="/" className="hover:text-emerald-400 transition">Home</a></li>
                      <li><a href="/faq" className="hover:text-emerald-400 transition">FAQ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4\">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-emerald-400 transition">Terms</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-4">Contact</h4>
                    <p className="text-sm text-slate-400">support@homefeast.com</p>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center">
                  <p className="text-sm text-slate-400">&copy; 2025 HomeFeast | Made with ❤️</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
