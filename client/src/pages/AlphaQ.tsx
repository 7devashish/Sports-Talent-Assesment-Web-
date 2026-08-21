import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Loader2 } from 'lucide-react';
import api from '../api/client';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const AlphaQ: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'Hello! I am Alpha-Q, your AI assistant. I can help you analyze player biomechanics, interpret talent potential scores, and suggest personalized coaching drills based on the data in STARQ.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-play the intro when AlphaQ tab is opened (mounted)
  useEffect(() => {
    setIsSpeaking(true);

    // Play a sci-fi activation beep
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15); 
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.log('Audio API not supported');
    }

    // Wait for the animation to settle in before speaking
    const speechTimeout = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("Hey there, it's agent Alpha-Q. You can call me Q.");
      
      const voices = window.speechSynthesis.getVoices();
      // Look for a male voice (David/Mark are common Windows male voices)
      const preferredVoice = voices.find(v => v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Male') || v.name.includes('Arthur'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 1.0; 
      utterance.pitch = 1.3; // Higher pitch for teen boy feel

      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(() => setShowIntro(false), 800); // Fade out overlay
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setShowIntro(false);
      };

      window.speechSynthesis.speak(utterance);
    }, 600);

    return () => {
      clearTimeout(speechTimeout);
      window.speechSynthesis.cancel(); // Stop speaking if they leave the tab early
    };
  }, []);

  const handleSkipIntro = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setShowIntro(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/chat', { messages: newMessages });

      const data = response.data;

      if (response.status === 200) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', content: `Error: ${data.error || 'Failed to connect to AI'}` }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', content: 'Network error. Make sure the backend server is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(226,249,57,0.3)] overflow-hidden cursor-default">
          <img src="/alpha-q-logo.jpg" alt="Alpha-Q Logo" className="w-full h-full object-cover scale-[1.15]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Alpha-Q <Sparkles className="w-5 h-5 text-[#e2f939]" />
          </h1>
          <p className="text-slate-400 text-sm">Your AI Scouting & Biomechanics Assistant</p>
        </div>
      </div>

      <div className="flex-1 bg-[#0b1b33] border border-white/10 rounded-2xl p-6 flex flex-col mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-4 mb-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-sky-500 text-white' : 'bg-transparent'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <img src="/alpha-q-logo.jpg" alt="Alpha-Q" className="w-full h-full object-cover scale-[1.15]" />}
            </div>
            <div className={`${msg.role === 'user' ? 'bg-sky-500/20 border-sky-500/30' : 'bg-white/10 border-white/5'} rounded-2xl p-4 text-slate-200 text-sm border max-w-[80%] whitespace-pre-wrap ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 mb-6">
            <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-transparent">
              <img src="/alpha-q-logo.jpg" alt="Alpha-Q" className="w-full h-full object-cover scale-[1.15]" />
            </div>
            <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-slate-200 text-sm border border-white/5 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#e2f939]" /> Alpha-Q is thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask Alpha-Q about player stats, biomechanics, or coaching drills..."
          className="w-full bg-[#0b1b33] border border-white/15 rounded-xl py-4 pl-4 pr-14 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e2f939]/50 transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#e2f939] text-[#061220] rounded-lg hover:bg-[#d5ee26] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
      
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061220]/95 backdrop-blur-xl transition-opacity duration-500 [perspective:1000px]">
          <button 
            onClick={handleSkipIntro}
            className="absolute top-6 right-6 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 text-sm tracking-wide transition-all z-[60]"
          >
            Skip Intro
          </button>
          
          <div className="relative flex flex-col items-center justify-center w-full h-full [transform-style:preserve-3d]">
            
            {/* 3D Floor Grid / Cyber Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] [transform:rotateX(75deg)_translateZ(-150px)] [transform-style:preserve-3d]">
              <div className="absolute inset-0 border-2 border-[#e2f939]/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border-l-4 border-t-2 border-[#e2f939]/50 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
              <div className="absolute inset-16 border-2 border-dashed border-[#e2f939]/40 rounded-full animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute inset-32 bg-[#e2f939]/5 rounded-full blur-2xl"></div>
            </div>
            
            {/* Hologram scanlines effect */}
            <div className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden mix-blend-overlay opacity-30">
              <div className="w-full h-[200%] bg-[linear-gradient(transparent_50%,rgba(226,249,57,0.1)_50%)] bg-[length:100%_4px] animate-[scan_10s_linear_infinite]"></div>
            </div>
            
            {/* Glowing auras behind logo */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#e2f939]/10 blur-3xl transition-all duration-1000 ${isSpeaking ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`}></div>
            
            {/* The 3D Robot Logo */}
            <img 
              src="/alpha-q-anim-logo.png" 
              alt="Alpha-Q 3D" 
              className={`relative z-10 w-80 h-80 object-contain drop-shadow-[0_0_30px_rgba(226,249,57,0.4)] transition-all duration-300 ${isSpeaking ? '' : 'opacity-0 scale-50'}`} 
              style={{
                animation: isSpeaking ? 'cyber-float 4s ease-in-out infinite' : 'hologram-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes cyber-float {
          0%, 100% { transform: translateY(-20px) rotateY(-15deg); filter: drop-shadow(0 0 20px rgba(226,249,57,0.4)); }
          50% { transform: translateY(10px) rotateY(15deg); filter: drop-shadow(0 0 40px rgba(226,249,57,0.7)); }
        }
        @keyframes hologram-in {
          0% { transform: scale(0.8) translateY(100px) rotateY(-30deg); opacity: 0; filter: blur(10px); }
          50% { filter: blur(2px); opacity: 0.8; }
          100% { transform: scale(1) translateY(-20px) rotateY(-15deg); opacity: 1; filter: blur(0); }
        }
        @keyframes scan {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
