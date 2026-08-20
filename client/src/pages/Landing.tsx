import React from 'react';
import {
  Zap,
  Activity,
  Award,
  Video,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Eye,
  Crosshair,
  ArrowUpRight,
  Cpu,
  Shield,
  Play
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { ScoreBadge } from '../components/ui/ScoreBadge';

interface LandingProps {
  onStartAssessment: () => void;
  onExplore: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartAssessment, onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-[#061220] text-slate-100 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Top Mini Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b1b33] border border-white/15 text-xs font-bold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#e2f939]" />
            <span>AI-Assisted Sports Talent Discovery Platform</span>
          </div>
          <span className="text-xs font-extrabold text-[#e2f939] uppercase tracking-wider hidden sm:inline">
            CRICKET 2026 MVP
          </span>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Massive Impact Headline */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
              <span className="text-[#e2f939]">SMARTER TALENT</span> <br />
              ON EVERY PITCH
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Measure performance. Analyze body movement in real time with MediaPipe computer vision.
              Discover high-potential young cricketers through multi-modal sports intelligence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartAssessment}
                className="px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] transition-all flex items-center gap-2.5 cursor-pointer shadow-sm"
              >
                <Zap className="w-4 h-4 fill-current" />
                Start Assessment
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplore}
                className="px-6 py-4 rounded-xl font-bold text-sm bg-[#0b1b33] hover:bg-[#102444] text-white border border-white/15 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#e2f939]" />
                Explore Scout Platform
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Quick Stats Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#e2f939] font-mono">33</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">Pose Keypoints</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">140+</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">km/h Speed CV</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">Explainable AI</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real AI Tracking Bounding Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#0b1b33] border border-white/15 aspect-[4/5] sm:aspect-square flex items-center justify-center group">
              {/* Athlete Action Photo */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Cricket Athlete"
                className="w-full h-full object-cover grayscale contrast-125 opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-transparent to-[#061220]/40" />

              {/* Technical AI Bounding Box (Like reference image) */}
              <div className="absolute top-[20%] left-[22%] w-[56%] h-[52%] border-2 border-white/90 rounded-lg pointer-events-none">
                {/* Crosshair Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-white/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#e2f939] rounded-full" />
                </div>
                {/* Top Left Tag */}
                <div className="absolute -top-3 left-2 bg-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-white tracking-widest border border-white/20">
                  ATHLETE TRACKING
                </div>
                {/* Bottom Stats Badge */}
                <div className="absolute -bottom-3 left-2 bg-[#061220] px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#e2f939] flex items-center gap-2 border border-white/20 shadow-md">
                  <span>94% ALIGNMENT</span>
                  <span className="text-white">|</span>
                  <span className="text-white">88 POTENTIAL</span>
                </div>
              </div>

              {/* Floating Action Badge Button (Top Right Yellow Arrow) */}
              <div
                onClick={onStartAssessment}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#e2f939] text-[#061220] flex items-center justify-center font-black shadow-lg cursor-pointer hover:scale-110 transition-transform"
              >
                <ArrowUpRight className="w-6 h-6 stroke-[3]" />
              </div>

              {/* Bottom Card Summary */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#061220]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Classified Archetype</div>
                  <div className="font-extrabold text-white text-sm">Aggressive Top-Order Batter</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Bat Speed</div>
                  <div className="font-mono font-extrabold text-[#e2f939]">118 km/h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Volt-Yellow Marquee Athletic Tape Banner (From reference image) */}
      <div className="w-full bg-[#e2f939] text-[#061220] py-2.5 overflow-hidden border-y border-black/20 my-4 shadow-sm select-none">
        <div className="animate-marquee text-xs font-black uppercase tracking-widest flex items-center gap-8">
          <span>CRICKET TALENT ASSESSMENT</span>
          <span>✳</span>
          <span>REAL-TIME POSE BIOMECHANICS</span>
          <span>✳</span>
          <span>BALL SPEED TRACKING (140+ KM/H)</span>
          <span>✳</span>
          <span>TALENT POTENTIAL SCORING</span>
          <span>✳</span>
          <span>EXPLAINABLE MACHINE LEARNING</span>
          <span>✳</span>
          <span>HEAD-TO-HEAD ATHLETE COMPARISON</span>
          <span>✳</span>
          <span>CRICKET TALENT ASSESSMENT</span>
          <span>✳</span>
          <span>REAL-TIME POSE BIOMECHANICS</span>
          <span>✳</span>
          <span>BALL SPEED TRACKING (140+ KM/H)</span>
          <span>✳</span>
          <span>TALENT POTENTIAL SCORING</span>
        </div>
      </div>

      {/* 4 Feature Pillars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e2f939]">
              CORE PILLARS
            </span>
            <h2 className="text-3xl font-black uppercase text-white mt-1">
              Data-Driven Scouting Architecture
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-[#e2f939] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Scout Dashboard <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlassCard className="p-6 space-y-3 bg-[#0b1b33] border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#e2f939] text-[#061220] flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold uppercase text-white">CV Biomechanics Lab</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-browser MediaPipe pose tracking measures stance width, balance, head stability, and rotational torque with no wearable hardware.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 bg-[#0b1b33] border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white text-[#061220] flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold uppercase text-white">Contextual Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phase-by-phase scoring (Powerplay, Middle, Death), pace vs spin splits, and pressure-performance normalization.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 bg-[#0b1b33] border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8] text-[#061220] flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold uppercase text-white">Explainable AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-dimensional Talent Potential Score (0-100) with transparent rationale, strengths, development areas, and drill prescriptions.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3 bg-[#0b1b33] border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#e2f939] text-[#061220] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold uppercase text-white">Scout Hub & Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-player head-to-head comparison radars, age/region filtering, and discovery tools for coaches and talent scouts.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
