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
  Calendar,
  Clock,
  Crosshair,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

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
        staggerChildren: 0.12,
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
      {/* HERO SECTION WITH STADIUM IMAGE BACKGROUND & ANIMATED TEXT OVERLAY        */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#08172c] min-h-[580px] sm:min-h-[620px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/70">
          
          {/* Stadium Photograph Background with Multi-stop Vignette */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/stadium_hero.jpg"
              alt="Cricket Stadium Floodlights Arena"
              className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.15] scale-[1.02] transition-transform duration-1000"
            />
            {/* Cinematic Gradient Overlays for High Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#061220]/95 via-[#061220]/70 to-[#061220]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-transparent to-[#061220]/60" />
          </div>

          {/* Top Tag Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061220]/80 backdrop-blur-md border border-white/20 text-xs font-extrabold text-white shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e2f939] animate-pulse" />
              <span>STARQ TALENT ENGINE</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-[#e2f939] bg-[#061220]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <Crosshair className="w-3.5 h-3.5" />
              <span>33-POINT BIOMECHANICS ACTIVE</span>
            </div>
          </div>

          {/* Main Hero Split Grid: Left Text Overlay + Right Floating Translucent Event Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 z-10">
            
            {/* Left Column: Animated Overlay Text (matching StriveHub structure) */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Main Animated Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
              >
                Designed to <br />
                <span className="text-[#e2f939]">Elevate Every</span> <br />
                Performance
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-200 max-w-lg font-normal leading-relaxed drop-shadow"
              >
                Use computer vision, real-time MediaPipe biomechanics, and explainable AI to build multi-dimensional athlete profiles and scout youth talent.
              </motion.p>

              {/* CTA & Social Proof */}
              <motion.div variants={itemVariants} className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Volt-Yellow Pill CTA Button (As in StriveHub reference) */}
                  <button
                    onClick={onStartAssessment}
                    className="px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-black/40"
                  >
                    Get Started Today
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onExplore}
                    className="px-6 py-3.5 rounded-full font-bold text-xs bg-[#061220]/70 hover:bg-[#061220]/90 text-white backdrop-blur-md border border-white/20 hover:border-white/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                  >
                    <Eye className="w-4 h-4 text-[#e2f939]" />
                    Explore Scout Hub
                  </button>
                </div>

                {/* Social Proof (matching StriveHub) */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#061220] object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                      alt="Athlete"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#061220] object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                      alt="Athlete"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#061220] object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                      alt="Scout"
                    />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Over <strong className="text-white font-bold">40,000+ athletes & coaches</strong> trust StarQ.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Translucent Events & Live Telemetry Card (As in StriveHub) */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="rounded-3xl bg-[#061220]/75 hover:bg-[#061220]/85 backdrop-blur-2xl border border-white/20 p-6 space-y-4 shadow-2xl shadow-black/80 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-white tracking-wide">
                      Live Scouting & Trials
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Top talent assessments you shouldn't miss
                    </p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2f939] animate-ping" />
                </div>

                {/* Event Metadata Rows */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Trial Event:</span>
                    <span className="font-bold text-white">State U-19 Talent Trials</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-mono text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#e2f939]" /> 24 Feb 2026
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Session:</span>
                    <span className="font-mono text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#e2f939]" /> 8:00 PM (IST)
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Evaluation Mode:</span>
                    <span className="text-[#e2f939] font-bold font-mono">CV Biomechanics & Speed</span>
                  </div>
                </div>

                {/* Mini Player Highlight Box */}
                <div className="bg-[#0b1c36]/90 p-3 rounded-2xl border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                      alt="Player"
                      className="w-10 h-10 rounded-xl object-cover border border-white/20"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Vikram Rathore</div>
                      <div className="text-[10px] text-[#e2f939] font-mono font-bold">141.2 km/h • 91 Potential</div>
                    </div>
                  </div>
                  <button
                    onClick={onExplore}
                    className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] transition-all cursor-pointer"
                  >
                    View Scout
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Micro-Pillars Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs z-10">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">33-Keypoint Pose Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">140+ km/h Optical Speed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Activity className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">Explainable AI Scores</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#e2f939]" />
              <span className="font-bold">Pro Scout Radar Analytics</span>
            </div>
          </div>

        </div>
      </div>

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
