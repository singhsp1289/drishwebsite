import React, { useState, memo } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Logo } from '../Logo.tsx';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  ShieldAlert,
} from 'lucide-react';

interface AdminLoginViewProps {
  onSuccess?: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = memo(function AdminLoginView({ onSuccess }) {
  const { login, changePassword, mustChangePassword, user } = useAuth();

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // First-time password change form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordForChange, setOldPasswordForChange] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);

  // If user is logged in and needs to change password immediately
  const isForcePasswordChange = Boolean(user && mustChangePassword);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please enter your administrator username/email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const loggedUser = await login(identifier.trim(), password);
      setOldPasswordForChange(password);
      if (!loggedUser.mustChangePassword) {
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    setIsChangingPassword(true);
    setError(null);
    try {
      await changePassword(newPassword, oldPasswordForChange || password);
      setPasswordChangeSuccess('Password updated successfully! Redirecting to Admin Console...');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const fillQuickCredentials = (u: string, p: string) => {
    setIdentifier(u);
    setPassword(p);
    setError(null);
  };

  // 1. Force Password Change Screen (Triggered for new admin users on first login)
  if (isForcePasswordChange) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden">
        {/* Background glow and geometric accents */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0876B9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-lg p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 text-white">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 mb-4">
            <KeyRound className="w-6 h-6" />
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>First-Time Login Security Setup</span>
            </div>
            <h2 className="text-xl font-bold text-white">Set Your New Password</h2>
            <p className="text-xs text-slate-300 mt-1.5">
              Welcome, <span className="font-semibold text-white">{user?.displayName || user?.username}</span>! As a newly created administrator, you must update your initial default password before accessing the console.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800/80 rounded text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {passwordChangeSuccess && (
            <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800/80 rounded text-xs text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{passwordChangeSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                New Secure Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter min 6 characters"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-type new password"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#0876B9] focus:ring-1 focus:ring-[#0876B9]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Use a strong password with a mix of letters, numbers, and symbols.</span>
            </div>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full py-2.5 px-4 bg-[#0876B9] hover:bg-[#065E94] text-white font-semibold text-sm rounded shadow-lg shadow-[#0876B9]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isChangingPassword ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save Password & Access Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Primary Dedicated Admin Login Screen
  return (
    <div className="min-h-screen bg-[#061523] flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden text-slate-100">
      {/* Cinematic subtle background grid & ambient light */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c2338_1px,transparent_1px),linear-gradient(to_bottom,#0c2338_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0876B9]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#0c2235]/90 border border-[#163a56] rounded-xl p-6 sm:p-9 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-14 h-14 flex items-center justify-center mb-3">
            <Logo className="w-full h-full object-contain" variant="footer" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0876B9]/20 border border-[#0876B9]/40 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Authorized Personnel Only</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            Sign in with your Drish Infotech administrator credentials to access the central management console.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-950/80 border border-rose-800/80 rounded-lg text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoFocus
                placeholder="e.g. admin or admin@drishinfotech.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#071929] border border-[#1b4363] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-[#071929] border border-[#1b4363] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#0876B9] hover:bg-[#065E94] text-white font-semibold text-sm rounded-lg shadow-lg shadow-[#0876B9]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Demo / System Access Helper */}
        <div className="mt-6 pt-5 border-t border-[#163a56]/80 text-center">
          <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure PBKDF2 & Role-Based Access Control</span>
          </div>

          {/* Quick Credential Badges */}
          <div className="p-3 bg-[#071a2b] border border-[#163c5b] rounded-lg text-left space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Admin Accounts:</span>
              <span className="text-[9px] text-[#38BDF8]">Click to Auto-Fill</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickCredentials('admin', 'Drish@Admin2026!')}
                className="p-2 rounded bg-[#0b243b] hover:bg-[#123352] border border-[#1c476d] text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-[#38BDF8]">
                  Super Admin
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  admin
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillQuickCredentials('ops.lead', 'Drish@Admin2026!')}
                className="p-2 rounded bg-[#0b243b] hover:bg-[#123352] border border-[#1c476d] text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
                  <span>New Admin User</span>
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded">1st Login</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  ops.lead
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
