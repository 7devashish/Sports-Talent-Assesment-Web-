import React from 'react';
import {
  Zap,
  Activity,
  Video,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Eye,
  ArrowUpRight,
  Cpu,
  Sparkles,
  Crosshair,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

interface LandingProps {
  onStartAssessment: () => void;
  onExplore: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartAssessment, onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-[#061220] text-slate-100 min-h-screen">
      {/* ========================================================================= */}
      {/* HERO SECTION WITH CINEMATIC HD SPORTS IMAGE & GIANT OVERLAY TYPOGRAPHY    */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Background HD Sports Image with Atmospheric Vignette */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero_sports.jpg"
            alt="Sports Talent Athletes Arena"
            className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.12] scale-[1.02]"
          />
          {/* Multi-layered cinematic gradients to blend with deep navy UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-[#061220]/45 to-[#061220]/75" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#061220]/30 to-[#061220]/90" />
        </div>

        {/* Top Tag & Live Status */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#061220]/80 backdrop-blur-md border border-white/20 text-xs font-extrabold text-white shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2f939] animate-pulse" />
            <span className="tracking-wide">AI-POWERED SPORTS TALENT DISCOVERY</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono font-bold text-[#e2f939] bg-[#061220]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <Crosshair className="w-3.5 h-3.5 animate-spin" />
            <span>33-POINT POSE TRACKING ACTIVE</span>
          </div>
        </div>

        {/* Centerpiece: Giant Layered Overlay Typography */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 z-10">
          <div className="relative select-none">
            {/* Top Giant Text Line */}
            <div className="text-[12vw] sm:text-[10vw] lg:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.88] text-white drop-shadow-2xl">
              MEASURE
            </div>

            {/* Bottom Giant Text Line with Volt-Yellow Accent */}
            <div className="text-[12vw] sm:text-[10vw] lg:text-[9.5rem] font-black uppercase tracking-tighter leading-[0.88] text-[#e2f939] drop-shadow-2xl flex flex-wrap items-baseline gap-4 sm:gap-8">
              <span>POTENTIAL</span>
              <span className="text-white/25 text-[4vw] sm:text-[3vw] lg:text-5xl font-mono font-light tracking-normal border border-white/20 rounded-2xl px-4 py-1 self-center backdrop-blur-md bg-black/30 hidden sm:inline-block">
                [@2026]
              </span>
            </div>

            {/* Real-Time AI Tracking Reticle Overlay Tag */}
            <div className="absolute top-[18%] right-[5%] sm:right-[15%] hidden md:flex items-center gap-3 bg-[#061220]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#e2f939]/40 shadow-2xl animate-pulse">
              <div className="w-3 h-3 rounded-full bg-[#e2f939]" />
              <div className="text-left font-mono text-[11px] font-bold">
                <div className="text-white">BAT SPEED: 118 KM/H</div>
                <div className="text-[#e2f939]">94% KINETIC SYNC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Content & CTAs Bar */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end bg-[#061220]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl shadow-black/80">
            {/* Left: Summary Bio */}
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e2f939] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Data-Driven Athlete Profiling
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                Computer Vision Biomechanics Meets Scouting Intelligence
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
                Real-time posture stability, optical ball speed tracking, and explainable AI talent potential scores — identifying the next generation of youth athletes with scientific precision.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-start lg:justify-end gap-3.5">
              <button
                onClick={onStartAssessment}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/40"
              >
                <Zap className="w-4 h-4 fill-current" />
                Start Assessment
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105"
              >
                <Eye className="w-4 h-4 text-[#e2f939]" />
                Scout Hub
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Volt-Yellow Marquee Athletic Tape Banner */}
      <div className="w-full bg-[#e2f939] text-[#061220] py-2.5 overflow-hidden border-y border-black/20 my-2 shadow-sm select-none">
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

      {/* ========================================================================= */}
      {/* 4 CORE FEATURE PILLARS WITH TRANSLUCENT GLASS & HOVER MICRO-ANIMATIONS     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e2f939] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CORE PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              Data-Driven Scouting Architecture
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-extrabold uppercase tracking-wider text-[#e2f939] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            View Scout Dashboard <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: CV Biomechanics Lab */}
          <div
            onClick={onStartAssessment}
            className="group relative rounded-3xl p-6 bg-[#0b1c36]/40 hover:bg-[#11294d]/60 backdrop-blur-xl border border-white/10 hover:border-[#e2f939]/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#e2f939]/40 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#e2f939] text-[#061220] flex items-center justify-center font-black shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <Video className="w-6 h-6" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#e2f939] group-hover:text-[#061220] group-hover:border-[#e2f939] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-[#e2f939] transition-colors">
                  CV Biomechanics Lab
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  In-browser MediaPipe pose tracking measures stance width, balance, head stability, and rotational torque with no wearable hardware.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
              <span className="font-mono">33 KEYPOINTS</span>
              <span className="text-[#e2f939] uppercase flex items-center gap-1">
                Launch Lab <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 2: Contextual Analytics */}
          <div
            onClick={onExplore}
            className="group relative rounded-3xl p-6 bg-[#0b1c36]/40 hover:bg-[#11294d]/60 backdrop-blur-xl border border-white/10 hover:border-white/40 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#061220] flex items-center justify-center font-black shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-[#061220] group-hover:border-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-white transition-colors">
                  Contextual Analytics
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  Phase-by-phase scoring (Powerplay, Middle, Death), pace vs spin splits, and pressure-performance normalization.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
              <span className="font-mono">PHASE SPLITS</span>
              <span className="text-white uppercase flex items-center gap-1">
                View Stats <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 3: Explainable AI */}
          <div
            onClick={onStartAssessment}
            className="group relative rounded-3xl p-6 bg-[#0b1c36]/40 hover:bg-[#11294d]/60 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-sky-400/40 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#38bdf8] text-[#061220] flex items-center justify-center font-black shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <Cpu className="w-6 h-6" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#38bdf8] group-hover:text-[#061220] group-hover:border-[#38bdf8] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  Explainable AI
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  Multi-dimensional Talent Potential Score (0-100) with transparent rationale, strengths, development areas, and drill prescriptions.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
              <span className="font-mono">MODEL v1.4</span>
              <span className="text-sky-300 uppercase flex items-center gap-1">
                AI Engine <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card 4: Scout Hub & Radar */}
          <div
            onClick={onExplore}
            className="group relative rounded-3xl p-6 bg-[#0b1c36]/40 hover:bg-[#11294d]/60 backdrop-blur-xl border border-white/10 hover:border-[#e2f939]/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#e2f939]/40 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#e2f939] text-[#061220] flex items-center justify-center font-black shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#e2f939] group-hover:text-[#061220] group-hover:border-[#e2f939] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-[#e2f939] transition-colors">
                  Scout Hub & Radar
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                  Multi-player head-to-head comparison radars, age/region filtering, and discovery tools for coaches and talent scouts.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
              <span className="font-mono">DISCOVERY</span>
              <span className="text-[#e2f939] uppercase flex items-center gap-1">
                Scout Hub <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
