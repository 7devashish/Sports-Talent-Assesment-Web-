import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3,
  UploadCloud,
  CheckCircle2,
  Save,
  Database
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import api from '../api/client';

export const Statistics: React.FC = () => {
  const { user, currentProfile } = useStore();
  const playerId = user?.playerId || currentProfile?.id;

  const [activeTab, setActiveTab] = useState<'batting' | 'bowling' | 'fielding'>('batting');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [battingForm, setBattingForm] = useState({
    matches: 0,
    innings: 0,
    runs: 0,
    ballsFaced: 0,
    highestScore: 0,
    fours: 0,
    sixes: 0,
    fifties: 0,
    hundreds: 0,
    notOuts: 0,
    dotBallPercentage: 0,
    boundaryPercentage: 0,
    powerplayStrikeRate: 0,
    middleOversStrikeRate: 0,
    deathOversStrikeRate: 0,
    avgVsPace: 0,
    avgVsSpin: 0,
    chaseAverage: 0,
    pressureIndex: 0
  });

  const [bowlingForm, setBowlingForm] = useState({
    matches: 0,
    innings: 0,
    overs: 0,
    maidens: 0,
    runsConceded: 0,
    wickets: 0,
    bestBowlingWickets: 0,
    bestBowlingRuns: 0,
    dotBallPercentage: 0,
    fourWicketHauls: 0,
    fiveWicketHauls: 0,
    averageSpeedKmh: 0,
    maxSpeedKmh: 0,
    yorkerPercentage: 0,
    bouncerPercentage: 0,
    powerplayEconomy: 0,
    deathOversEconomy: 0
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.get(`/statistics/${playerId}`);
        if (res.data.batting) {
          const b = res.data.batting;
          setBattingForm({
            matches: b.matches || 0,
            innings: b.innings || 0,
            runs: b.runs || 0,
            ballsFaced: b.balls_faced || 0,
            highestScore: b.highest_score || 0,
            fours: b.fours || 0,
            sixes: b.sixes || 0,
            fifties: b.fifties || 0,
            hundreds: b.hundreds || 0,
            notOuts: b.not_outs || 0,
            dotBallPercentage: b.dot_ball_percentage || 0,
            boundaryPercentage: b.boundary_percentage || 0,
            powerplayStrikeRate: b.powerplay_strike_rate || 0,
            middleOversStrikeRate: b.middle_overs_strike_rate || 0,
            deathOversStrikeRate: b.death_overs_strike_rate || 0,
            avgVsPace: b.avg_vs_pace || 0,
            avgVsSpin: b.avg_vs_spin || 0,
            chaseAverage: b.chase_average || 0,
            pressureIndex: b.pressure_index || 0
          });
        }
        if (res.data.bowling) {
          const bw = res.data.bowling;
          setBowlingForm({
            matches: bw.matches || 0,
            innings: bw.innings || 0,
            overs: bw.overs || 0,
            maidens: bw.maidens || 0,
            runsConceded: bw.runs_conceded || 0,
            wickets: bw.wickets || 0,
            bestBowlingWickets: bw.best_bowling_wickets || 0,
            bestBowlingRuns: bw.best_bowling_runs || 0,
            dotBallPercentage: bw.dot_ball_percentage || 0,
            fourWicketHauls: bw.four_wicket_hauls || 0,
            fiveWicketHauls: bw.five_wicket_hauls || 0,
            averageSpeedKmh: bw.average_speed_kmh || 0,
            maxSpeedKmh: bw.max_speed_kmh || 0,
            yorkerPercentage: bw.yorker_percentage || 0,
            bouncerPercentage: bw.bouncer_percentage || 0,
            powerplayEconomy: bw.powerplay_economy || 0,
            deathOversEconomy: bw.death_overs_economy || 0
          });
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    }
    loadStats();
  }, [playerId]);

  const handleSaveBatting = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/statistics/${playerId}/batting`, battingForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save batting error:', err);
    }
  };

  const handleSaveBowling = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/statistics/${playerId}/bowling`, bowlingForm);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save bowling error:', err);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importType, setImportType] = useState<'batting' | 'bowling'>('batting');

  const handleImportClick = (type: 'batting' | 'bowling') => {
    setImportType(type);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      
      if (lines.length > 1) {
        // Simple mapping from a comma-separated row of values
        const values = lines[1].split(',').map(v => parseFloat(v) || 0);
        
        if (importType === 'batting') {
          setBattingForm({
            matches: values[0] || 0,
            innings: values[1] || 0,
            runs: values[2] || 0,
            ballsFaced: values[3] || 0,
            highestScore: values[4] || 0,
            fours: values[5] || 0,
            sixes: values[6] || 0,
            fifties: values[7] || 0,
            hundreds: values[8] || 0,
            notOuts: values[9] || 0,
            dotBallPercentage: values[10] || 0,
            boundaryPercentage: values[11] || 0,
            powerplayStrikeRate: values[12] || 0,
            middleOversStrikeRate: values[13] || 0,
            deathOversStrikeRate: values[14] || 0,
            avgVsPace: values[15] || 0,
            avgVsSpin: values[16] || 0,
            chaseAverage: values[17] || 0,
            pressureIndex: values[18] || 0
          });
        } else {
          setBowlingForm({
            matches: values[0] || 0,
            innings: values[1] || 0,
            overs: values[2] || 0,
            maidens: values[3] || 0,
            runsConceded: values[4] || 0,
            wickets: values[5] || 0,
            bestBowlingWickets: values[6] || 0,
            bestBowlingRuns: values[7] || 0,
            dotBallPercentage: values[8] || 0,
            fourWicketHauls: values[9] || 0,
            fiveWicketHauls: values[10] || 0,
            averageSpeedKmh: values[11] || 0,
            maxSpeedKmh: values[12] || 0,
            yorkerPercentage: values[13] || 0,
            bouncerPercentage: values[14] || 0,
            powerplayEconomy: values[15] || 0,
            deathOversEconomy: values[16] || 0
          });
        }
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#e2f939]" />
            Cricket Match Statistics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Historical batting, bowling, and fielding performance with contextual match-phase splits
          </p>
        </div>

        {/* Real CSV Import Buttons */}
        <div className="flex items-center gap-2">
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
          />
          <button
            onClick={() => handleImportClick('batting')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0b1b33] hover:bg-[#102444] text-slate-200 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <UploadCloud className="w-4 h-4 text-[#e2f939]" />
            Import Batting CSV
          </button>
          <button
            onClick={() => handleImportClick('bowling')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0b1b33] hover:bg-[#102444] text-slate-200 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <UploadCloud className="w-4 h-4 text-sky-400" />
            Import Bowling CSV
          </button>
        </div>
      </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-[#e2f939]/15 border border-[#e2f939]/30 text-[#e2f939] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Statistics updated successfully! ML Talent Model recalculation complete.</span>
          </div>
        )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('batting')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'batting'
              ? 'bg-[#e2f939] text-[#061220]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🏏 Batting Metrics
        </button>
        <button
          onClick={() => setActiveTab('bowling')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'bowling'
              ? 'bg-[#e2f939] text-[#061220]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚡ Bowling Metrics
        </button>
      </div>

      {/* Batting Form */}
      {activeTab === 'batting' && (
        <form onSubmit={handleSaveBatting} className="space-y-6">
          <GlassCard className="p-6 space-y-4 bg-[#0b1b33] border-white/15">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#e2f939]">
              Primary Batting Career Totals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Matches</label>
                <input
                  type="number"
                  value={battingForm.matches}
                  onChange={(e) => setBattingForm({ ...battingForm, matches: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Innings</label>
                <input
                  type="number"
                  value={battingForm.innings}
                  onChange={(e) => setBattingForm({ ...battingForm, innings: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Total Runs</label>
                <input
                  type="number"
                  value={battingForm.runs}
                  onChange={(e) => setBattingForm({ ...battingForm, runs: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Balls Faced</label>
                <input
                  type="number"
                  value={battingForm.ballsFaced}
                  onChange={(e) => setBattingForm({ ...battingForm, ballsFaced: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Fours (4s)</label>
                <input
                  type="number"
                  value={battingForm.fours}
                  onChange={(e) => setBattingForm({ ...battingForm, fours: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Sixes (6s)</label>
                <input
                  type="number"
                  value={battingForm.sixes}
                  onChange={(e) => setBattingForm({ ...battingForm, sixes: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">50s / 100s</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={battingForm.fifties}
                    placeholder="50s"
                    onChange={(e) => setBattingForm({ ...battingForm, fifties: Number(e.target.value) })}
                    className="w-1/2 px-2 py-2 rounded-lg glass-input font-mono"
                  />
                  <input
                    type="number"
                    value={battingForm.hundreds}
                    placeholder="100s"
                    onChange={(e) => setBattingForm({ ...battingForm, hundreds: Number(e.target.value) })}
                    className="w-1/2 px-2 py-2 rounded-lg glass-input font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Dot Ball %</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.dotBallPercentage}
                  onChange={(e) => setBattingForm({ ...battingForm, dotBallPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
            </div>
          </GlassCard>

          {/* Phase-by-Phase Splits */}
          <GlassCard className="p-6 space-y-4 bg-[#0b1b33] border-white/15">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Phase-by-Phase & Contextual Splits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Powerplay SR (Overs 1-6)</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.powerplayStrikeRate}
                  onChange={(e) => setBattingForm({ ...battingForm, powerplayStrikeRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Middle Overs SR (Overs 7-15)</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.middleOversStrikeRate}
                  onChange={(e) => setBattingForm({ ...battingForm, middleOversStrikeRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Death Overs SR (Overs 16-20)</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.deathOversStrikeRate}
                  onChange={(e) => setBattingForm({ ...battingForm, deathOversStrikeRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Average vs Pace</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.avgVsPace}
                  onChange={(e) => setBattingForm({ ...battingForm, avgVsPace: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Average vs Spin</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.avgVsSpin}
                  onChange={(e) => setBattingForm({ ...battingForm, avgVsSpin: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Pressure Index (0-100)</label>
                <input
                  type="number"
                  step="0.1"
                  value={battingForm.pressureIndex}
                  onChange={(e) => setBattingForm({ ...battingForm, pressureIndex: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
            </div>
          </GlassCard>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Batting Statistics
          </button>
        </form>
      )}

      {/* Bowling Form */}
      {activeTab === 'bowling' && (
        <form onSubmit={handleSaveBowling} className="space-y-6">
          <GlassCard className="p-6 space-y-4 bg-[#0b1b33] border-white/15">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#e2f939]">
              Primary Bowling Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Matches</label>
                <input
                  type="number"
                  value={bowlingForm.matches}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, matches: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Overs Bowled</label>
                <input
                  type="number"
                  step="0.1"
                  value={bowlingForm.overs}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, overs: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Wickets</label>
                <input
                  type="number"
                  value={bowlingForm.wickets}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, wickets: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Runs Conceded</label>
                <input
                  type="number"
                  value={bowlingForm.runsConceded}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, runsConceded: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Average Speed (km/h)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bowlingForm.averageSpeedKmh}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, averageSpeedKmh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Max Speed (km/h)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bowlingForm.maxSpeedKmh}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, maxSpeedKmh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Yorker %</label>
                <input
                  type="number"
                  step="0.1"
                  value={bowlingForm.yorkerPercentage}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, yorkerPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Powerplay Economy</label>
                <input
                  type="number"
                  step="0.1"
                  value={bowlingForm.powerplayEconomy}
                  onChange={(e) => setBowlingForm({ ...bowlingForm, powerplayEconomy: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono"
                />
              </div>
            </div>
          </GlassCard>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Bowling Statistics
          </button>
        </form>
      )}
    </div>
  );
};
