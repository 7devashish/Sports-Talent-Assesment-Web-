import React, { useState } from 'react';
import {
  Activity,
  Award,
  Users,
  Zap,
  BarChart3,
  Video,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowUpRight,
  Bot
} from 'lucide-react';
import { useStore } from '../../store/useStore';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, logout, switchDemoUser } = useStore();
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const handleDemoSwitch = async (role: string) => {
    await switchDemoUser(role);
    setDemoMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#061220]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTab('landing')}
          >
            <div className="w-9 h-9 rounded-xl bg-[#e2f939] flex items-center justify-center text-[#061220] font-black shadow-sm">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                STAR<span className="text-[#e2f939]">Q</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              onClick={() => setCurrentTab('cv-lab')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'cv-lab'
                  ? 'bg-[#e2f939] text-[#061220]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              CV Biomechanics
            </button>

            <button
              onClick={() => setCurrentTab('assessment-wizard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'assessment-wizard'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e2f939]" />
              Start Assessment
            </button>

            <button
              onClick={() => setCurrentTab('statistics')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'statistics'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Statistics
            </button>

            <button
              onClick={() => setCurrentTab('scout-hub')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'scout-hub'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Scout Hub
            </button>

            <button
              onClick={() => setCurrentTab('compare')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'compare'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Compare
            </button>

            <button
              onClick={() => setCurrentTab('alpha-q')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'alpha-q'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src="/alpha-q-logo.jpg" alt="AQ" className="w-full h-full object-cover scale-[1.35]" />
              </div>
              Alpha-Q
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => setCurrentTab('profile')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0b1b33] border border-white/15 text-slate-200 flex items-center gap-2 hover:border-[#e2f939]/60 transition-all cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-[#e2f939]" />
                  <span className="font-extrabold text-white truncate max-w-[110px]">
                    {user.full_name}
                  </span>
                </button>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentTab('login')}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#e2f939] text-[#061220] hover:bg-[#d5ee26] transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
