import React from 'react';
import { motion, type Variants } from 'framer-motion';
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
import { DottedBackground } from '../components/ui/DottedBackground';
import stadiumHeroImg from '../assets/stadium_hero.jpg';

interface LandingProps {
  onStartAssessment: () => void;
  onExplore: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartAssessment, onExplore }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#061220] text-slate-100 min-h-screen">
      {/* ========================================================================= */}
      {/* FULL-PAGE EDGE-TO-EDGE HERO SECTION WITH STADIUM IMAGE BACKGROUND         */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Full-width Stadium Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={stadiumHeroImg}
            alt="Cricket Stadium Arena Floodlights"
            className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.12]"
          />
          {/* Smooth directional gradients for optimal text contrast across all screen sizes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061220]/95 via-[#061220]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-transparent to-[#061220]/50" />
        </div>

        {/* Top Tag Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061220]/80 backdrop-blur-md border border-white/20 text-xs font-extrabold text-white shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2f939] animate-pulse" />
            <span>STARQ TALENT ENGINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#e2f939] bg-[#061220]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
            <Crosshair className="w-3.5 h-3.5" />
            <span>33-POINT BIOMECHANICS ACTIVE</span>
          </div>
        </div>

        {/* Animated Text Overlay (Headline, Subtitle & CTAs) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-12">
          <div className="max-w-2xl lg:max-w-3xl">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Main Animated Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[1.03] tracking-tight drop-shadow-2xl"
              >
                Designed to <br />
                <span className="text-[#e2f939]">Elevate Every</span> <br />
                Performance
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow-md"
              >
                Use computer vision, real-time MediaPipe biomechanics, and explainable AI to build multi-dimensional athlete profiles and scout youth cricket talent.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={onStartAssessment}
                    className="px-8 py-4 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer shadow-xl shadow-black/50"
                  >
                    Get Started Today
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onExplore}
                    className="px-7 py-4 rounded-full font-bold text-xs sm:text-sm bg-[#061220]/75 hover:bg-[#061220]/95 text-white backdrop-blur-md border border-white/25 hover:border-white/50 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 shadow-md"
                  >
                    <Eye className="w-4 h-4 text-[#e2f939]" />
                    Explore Scout Hub
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Micro-Pillars Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs">
            <div className="flex items-center gap-2 text-slate-200 drop-shadow">
              <Sparkles className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">33-Keypoint Pose Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 drop-shadow">
              <Zap className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">CV Biomechanics Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 drop-shadow">
              <Activity className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">AI Stats Analysation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 drop-shadow">
              <ShieldCheck className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">Explainable AI Scores</span>
            </div>
          </div>
        </div>
      </section>

      {/* Volt-Yellow Marquee Athletic Tape Banner */}
      <div className="w-full bg-[#e2f939] text-[#061220] py-2.5 overflow-hidden border-y border-black/20 shadow-sm select-none">
        <div className="animate-marquee text-xs font-black uppercase tracking-widest flex items-center gap-8">
          <span>CRICKET TALENT ASSESSMENT</span>
          <span>✳</span>
          <span>REAL-TIME POSE BIOMECHANICS</span>
          <span>✳</span>
          <span>AI STATS ANALYSATION</span>
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
          <span>AI STATS ANALYSATION</span>
          <span>✳</span>
          <span>TALENT POTENTIAL SCORING</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 CORE FEATURE PILLARS WITH DOTTED BACKGROUND & BREATHING SPACE           */}
      {/* ========================================================================= */}
      <section className="relative z-10 overflow-hidden py-24 sm:py-32 bg-[#061220]">
        {/* Dotted React Background Component */}
        <DottedBackground
          gap={28}
          dotSize={1.8}
          dotColor="rgba(255, 255, 255, 0.25)"
          glow={true}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e2f939] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                CORE PILLARS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mt-1">
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

          {/* Grid with Generous Breathing Space (gap-8) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {/* Card 1: CV Biomechanics Lab */}
            <div
              onClick={onStartAssessment}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0b1c36]/45 hover:bg-[#11294d]/65 backdrop-blur-xl border border-white/10 hover:border-[#e2f939]/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#e2f939]/40 transition-colors" />

              <div className="space-y-5">
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
                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5 font-normal">
                    In-browser MediaPipe pose tracking measures stance width, balance, head stability, and rotational torque with no wearable hardware.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                <span className="font-mono">33 KEYPOINTS</span>
                <span className="text-[#e2f939] uppercase flex items-center gap-1">
                  Launch Lab <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Card 2: Contextual Analytics */}
            <div
              onClick={onExplore}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0b1c36]/45 hover:bg-[#11294d]/65 backdrop-blur-xl border border-white/10 hover:border-white/40 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-colors" />

              <div className="space-y-5">
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
                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5 font-normal">
                    Phase-by-phase scoring (Powerplay, Middle, Death), pace vs spin splits, and pressure-performance normalization.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                <span className="font-mono">PHASE SPLITS</span>
                <span className="text-white uppercase flex items-center gap-1">
                  View Stats <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Card 3: Explainable AI */}
            <div
              onClick={onStartAssessment}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0b1c36]/45 hover:bg-[#11294d]/65 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-sky-400/40 transition-colors" />

              <div className="space-y-5">
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
                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5 font-normal">
                    Multi-dimensional Talent Potential Score (0-100) with transparent rationale, strengths, development areas, and drill prescriptions.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                <span className="font-mono">MODEL v1.4</span>
                <span className="text-sky-300 uppercase flex items-center gap-1">
                  AI Engine <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Card 4: Scout Hub & Radar */}
            <div
              onClick={onExplore}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0b1c36]/45 hover:bg-[#11294d]/65 backdrop-blur-xl border border-white/10 hover:border-[#e2f939]/50 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#e2f939]/40 transition-colors" />

              <div className="space-y-5">
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
                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5 font-normal">
                    Multi-player head-to-head comparison radars, age/region filtering, and discovery tools for coaches and talent scouts.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                <span className="font-mono">DISCOVERY</span>
                <span className="text-[#e2f939] uppercase flex items-center gap-1">
                  Scout Hub <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
