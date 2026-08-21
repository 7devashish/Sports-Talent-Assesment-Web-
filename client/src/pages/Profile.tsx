import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Save,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { useStore } from '../store/useStore';
import api from '../api/client';

export const Profile: React.FC = () => {
  const { user, currentProfile, fetchCurrentUser } = useStore();
  const playerId = user?.playerId || currentProfile?.id;

  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    age: 17,
    gender: 'Male',
    location: '',
    stateRegion: '',
    primaryRole: 'batter',
    battingStyle: 'right_hand_bat',
    bowlingStyle: 'none',
    handedness: 'right',
    heightCm: 178,
    weightKg: 68,
    wingspanCm: 182,
    experienceYears: 5,
    academyClub: '',
    competitionLevel: 'state_u19',
    jerseyNumber: 18,
    bio: '',
    profilePhotoUrl: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, profilePhotoUrl: event.target?.result as string });
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get(`/players/${playerId}`);
        const p = res.data.player;
        if (p) {
          setFormData({
            fullName: p.full_name || '',
            age: p.age || 17,
            gender: p.gender || 'Male',
            location: p.location || '',
            stateRegion: p.state_region || '',
            primaryRole: p.primary_role || 'batter',
            battingStyle: p.batting_style || 'right_hand_bat',
            bowlingStyle: p.bowling_style || 'none',
            handedness: p.handedness || 'right',
            heightCm: p.height_cm || 178,
            weightKg: p.weight_kg || 68,
            wingspanCm: p.wingspan_cm || 182,
            experienceYears: p.experience_years || 5,
            academyClub: p.academy_club || '',
            competitionLevel: p.competition_level || 'state_u19',
            jerseyNumber: p.jersey_number || 18,
            bio: p.bio || '',
            profilePhotoUrl: p.profile_photo_url || ''
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    }
    loadProfile();
  }, [playerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/players/${playerId}`, formData);
      setSavedSuccess(true);
      await fetchCurrentUser();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-[#e2f939]" />
          Digital Athlete Profile
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete cricket bio, physical anthropometrics, and competition credentials
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#e2f939]/15 border border-[#e2f939]/30 text-[#e2f939] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Athlete profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card & Photo */}
        <GlassCard className="p-6 bg-[#0b1b33] border-white/15">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            <div 
              className="relative w-24 h-24 rounded-2xl flex-shrink-0 group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Profile Photo"
            >
              {formData.profilePhotoUrl ? (
                <img
                  src={formData.profilePhotoUrl}
                  alt={formData.fullName || 'Athlete'}
                  className="w-full h-full rounded-2xl object-cover border-2 border-white/20 shadow-md transition-opacity group-hover:opacity-40"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-[#061220] border-2 border-white/10 flex items-center justify-center shadow-md transition-opacity group-hover:opacity-40">
                  <User className="w-10 h-10 text-slate-400" />
                </div>
              )}
              {/* Overlay Add Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handlePhotoUpload} 
              />
            </div>

            <div className="flex-1 space-y-3 w-full text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-lg glass-input"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Physical Anthropometrics & Cricket Attributes */}
        <GlassCard className="p-6 space-y-4 bg-[#0b1b33] border-white/15">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#e2f939]">
            Physical Anthropometrics & Cricket Attributes
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full p-2 rounded-lg glass-input font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Height (cm)</label>
              <input
                type="number"
                value={formData.heightCm}
                onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                className="w-full p-2 rounded-lg glass-input font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Weight (kg)</label>
              <input
                type="number"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                className="w-full p-2 rounded-lg glass-input font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Wingspan (cm)</label>
              <input
                type="number"
                value={formData.wingspanCm}
                onChange={(e) => setFormData({ ...formData, wingspanCm: Number(e.target.value) })}
                className="w-full p-2 rounded-lg glass-input font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Primary Role</label>
              <select
                value={formData.primaryRole}
                onChange={(e) => setFormData({ ...formData, primaryRole: e.target.value })}
                className="w-full p-2 rounded-lg glass-input bg-[#061220] text-white"
              >
                <option value="batter">Batter</option>
                <option value="fast_bowler">Fast Bowler</option>
                <option value="spin_bowler">Spin Bowler</option>
                <option value="all_rounder">All-Rounder</option>
                <option value="wicket_keeper">Wicketkeeper</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Batting Style</label>
              <select
                value={formData.battingStyle}
                onChange={(e) => setFormData({ ...formData, battingStyle: e.target.value })}
                className="w-full p-2 rounded-lg glass-input bg-[#061220] text-white"
              >
                <option value="right_hand_bat">Right Hand Bat</option>
                <option value="left_hand_bat">Left Hand Bat</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Bowling Style</label>
              <select
                value={formData.bowlingStyle}
                onChange={(e) => setFormData({ ...formData, bowlingStyle: e.target.value })}
                className="w-full p-2 rounded-lg glass-input bg-[#061220] text-white"
              >
                <option value="none">None</option>
                <option value="right_arm_fast">Right Arm Fast</option>
                <option value="left_arm_fast">Left Arm Fast</option>
                <option value="right_arm_leg_spin">Right Arm Leg Spin</option>
                <option value="right_arm_off_spin">Right Arm Off Spin</option>
                <option value="left_arm_orthodox">Left Arm Orthodox</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Jersey Number</label>
              <input
                type="number"
                value={formData.jerseyNumber}
                onChange={(e) => setFormData({ ...formData, jerseyNumber: Number(e.target.value) })}
                className="w-full p-2 rounded-lg glass-input font-mono"
              />
            </div>
          </div>
        </GlassCard>

        {/* Background & Academy */}
        <GlassCard className="p-6 space-y-4 bg-[#0b1b33] border-white/15">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
            Academy & Competition Background
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Academy / Club</label>
              <input
                type="text"
                value={formData.academyClub}
                onChange={(e) => setFormData({ ...formData, academyClub: e.target.value })}
                className="w-full p-2 rounded-lg glass-input"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Location (City, State)</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 rounded-lg glass-input"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Competition Level</label>
              <select
                value={formData.competitionLevel}
                onChange={(e) => setFormData({ ...formData, competitionLevel: e.target.value })}
                className="w-full p-2 rounded-lg glass-input bg-[#061220] text-white"
              >
                <option value="state_u19">State U-19 Championship</option>
                <option value="state_u16">State U-16 Championship</option>
                <option value="division_club">Division 1 Club League</option>
                <option value="district">District Level Trials</option>
                <option value="school">Inter-School Championship</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-400 mb-1 font-bold uppercase text-[10px]">Athlete Bio & Scout Summary</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 rounded-lg glass-input"
            />
          </div>
        </GlassCard>

        <button
          type="submit"
          className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-[#e2f939] text-[#061220] hover:bg-[#d4ed2e] flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Athlete Profile
        </button>
      </form>
    </div>
  );
};
