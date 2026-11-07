import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Building2
} from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  // Form starts 100% EMPTY - No pre-fill, user fills in credentials manually
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('sbp_admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(username.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-extrabold text-2xl shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-serif font-black tracking-wider text-white">
                SUPER BEST <span className="gold-gradient-text">PROPERTIES</span>
              </h1>
              <p className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">
                Executive Content System
              </p>
            </div>
          </Link>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Enterprise Admin Control Center</span>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-neutral-900/95 border border-neutral-800 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl">

          <h2 className="text-2xl font-serif font-bold text-white mb-1">
            Administrator Portal
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            Enter your credentials to manage properties, projects, categories and enquiries.
          </p>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* User / Email - Empty, User must fill manually */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username or email"
                  autoComplete="off"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-gold-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password with Eye Button Inside Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Admin Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-gold-500 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                />
                {/* Eye toggle button inside password box */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gold-400" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-neutral-900"
                />
                <span className="text-xs text-neutral-400">Remember session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl gold-gradient-btn text-black font-extrabold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-gold-500/20 hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Back to public website */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors inline-flex items-center space-x-1"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
