import React, { useState } from 'react';
import { Zap, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import api from '../api/client';

interface LoginProps {
  onSuccess: () => void;
  onNavigateRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, onNavigateRegister }) => {
  const { setAuth, switchDemoUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuth(res.data.user, res.data.token);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setError('');
    setLoading(true);
    try {
      await switchDemoUser(role);
      onSuccess();
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <GlassCard className="p-8 bg-[#0b1b33] border-white/15">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#e2f939] text-[#061220] flex items-center justify-center font-black mb-3 shadow-sm">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white tracking-tight">Sign In to StarQ</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your talent profile, CV assessments and scouting reports
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg glass-input text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
          Don't have an athlete account?{' '}
          <button
            onClick={onNavigateRegister}
            className="text-[#e2f939] font-bold hover:underline cursor-pointer"
          >
            Create Profile
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
