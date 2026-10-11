'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/lib/context/ToastContext';
import { KineticHeadline } from '@/components/auth/KineticHeadline';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { domainConfig } from '@/lib/domain.config';
import { TiltCard } from '@/components/ui/TiltCard';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
}

export function UnifiedAuthView({ initialMode = 'signin' }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const authConfig = domainConfig.productSpec?.authExperience;
  const initialRole = authConfig?.availableRoles?.[0]?.id || 'coordinator';
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [organization, setOrganization] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, signup } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSwitchMode = (newMode: 'signin' | 'signup') => {
    setError(null);
    setMode(newMode);
    setConfirmPassword('');
    window.history.replaceState(null, '', newMode === 'signin' ? '/login' : '/signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setError('Please enter your email and password.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await login(email, password);
        setIsSuccess(true);
        toast('Authenticated successfully', 'success');
      } else {
        await signup(name, email, password, {
          role: selectedRole,
          organization: organization || undefined,
        });
        setIsSuccess(true);
        toast('Workspace created successfully!', 'success');
      }
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    } catch (err: unknown) {
      let msg = err instanceof Error ? err.message : (mode === 'signin' ? 'Invalid credentials' : 'Failed to create workspace');
      if (
        msg.includes('buffering timed out') ||
        msg.includes('MongooseError') ||
        msg.includes('findOne') ||
        msg.includes('connection error') ||
        msg.includes('ECONNREFUSED')
      ) {
        msg = 'Unable to reach the database server. Please check your internet connection or verify the database cluster status and try again.';
      }
      setError(msg);
      toast(msg, 'error');
      setLoading(false);
    }
  };


  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* LEFT / HERO SECTION (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
        {/* Kinetic Animated Typography */}
        <KineticHeadline
          mode={mode}
          lines={
            mode === 'signin'
              ? [
                  ['SURVIVE', 'THE', 'MONTH.'],
                  ['₹10,000', 'BUDGET', 'RUNWAY.'],
                ]
              : [
                  ['JOIN', 'THE', 'RUNWAY.'],
                  ['30', 'DAYS.', 'ZERO', 'DEFICIT.'],
                ]
          }
          subheading="Master your ₹10,000 budget with precision integer paise accounting, What-If decision simulation, and daily burn rate protection."
        />

        {/* Logo presentation with load animation and cursor tilt */}
        <div className="relative pt-3 pb-3 w-full">
          <TiltCard
            key={mode}
            flipOnLoad={true}
            loadFlipDurationMs={1300}
            enableScrollFlip={false}
            maxTilt={12}
            perspective={1200}
            glare={false}
            className="w-full max-w-2xl"
          >
            <div className="relative aspect-[1921/558] w-full flex items-center justify-start cursor-pointer rounded-2xl overflow-hidden shadow-lg shadow-black/[0.04]">
              <Image
                src="/logo.webp"
                alt="Prompt Run Logo"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover object-center filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          </TiltCard>
        </div>
      </div>

      {/* RIGHT AUTH CARD (5 cols) */}
      <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
        <div className="w-full max-w-md bg-white rounded-2xl border border-black/[0.08] p-7 sm:p-9 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] relative">
          {/* Animated top indicator bar with smooth expansion and laser glow */}
          <div className="absolute top-0 inset-x-8 h-[2px] overflow-hidden rounded-full">
            <style>{`
              @keyframes expandLine {
                0% {
                  transform: scaleX(0);
                  opacity: 0;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  transform: scaleX(1);
                  opacity: 1;
                }
              }
              @keyframes shimmerBeam {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(200%);
                }
              }
            `}</style>
            <div
              style={{
                animation: 'expandLine 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
                transformOrigin: 'left center',
              }}
              className={`w-full h-full relative transition-colors duration-500 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500'
              }`}
            >
              {/* Laser sheen pulse across the line */}
              <div
                style={{
                  animation: 'shimmerBeam 2.4s ease-in-out 1.2s infinite',
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
            </div>
          </div>

          {/* Header */}
          <div className="space-y-1 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 transition-all duration-300">
              {mode === 'signin' ? 'Sign in to SurvivalRun' : 'Create Runway Account'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              {mode === 'signin'
                ? 'Enter credentials to access your ₹10,000 budget command center.'
                : 'Start your 30-day budget survival plan with zero deficit drift.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200/80 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name in Sign Up Mode */}
            {mode === 'signup' && (
              <>
                <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs font-semibold text-zinc-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-2xs"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator in Sign Up Mode */}
              {mode === 'signup' && <PasswordStrengthMeter password={password} />}
            </div>

            {/* Confirm Password (Sign Up Mode Only) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all shadow-2xs ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-zinc-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-[11px] text-rose-500 font-medium">Passwords do not match</p>
                )}
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-sm active:scale-[0.98] mt-4 ${
                isSuccess
                  ? 'bg-emerald-600'
                  : 'bg-zinc-950 hover:bg-zinc-800'
              } disabled:opacity-75`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                  <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Authenticated</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>


          {/* Mode Switcher Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500">
            {mode === 'signin' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors underline-offset-2 hover:underline"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signin')}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors underline-offset-2 hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
