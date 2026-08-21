const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const { get } = require('../database/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'starq_cricket_talent_assessment_jwt_super_secret_2026';

const BASE_SYSTEM_PROMPT = `You are Alpha-Q, an elite AI Scouting & Biomechanics Assistant for STARQ (Sports Talent Assessment & Discovery Platform).
Your goal is to help scouts, coaches, and players analyze talent potential, interpret biomechanics data (MediaPipe), and suggest tailored coaching drills.
Be concise, professional, insightful, and enthusiastic about cricket and sports analytics.
IMPORTANT FORMATTING RULES:
- DO NOT use any Markdown formatting in your responses (no **bold**, no ## headers, no asterisks).
- Output only plain text.
- You may use standard dashes (-) for bulleted lists.
- Keep your responses neatly structured with clean paragraphs.`;

router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
        }

        // --- AUTHENTICATION & USER CONTEXT ---
        let userContext = `\n\nUser Context:\nThe user is currently NOT signed in. You do not have access to any personal profile data. If they ask about their account, explain that they are not signed in.`;
        
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const user = await get('SELECT id, email, role, full_name, phone FROM users WHERE id = ?', [decoded.id]);
                
                if (user) {
                    let profile = null;
                    if (user.role === 'player') {
                        profile = await get('SELECT * FROM player_profiles WHERE user_id = ?', [user.id]);
                    }

                    userContext = `\n\nUser Context:\nThe user IS signed in. Use this actual application data to answer any questions about their account, identity, or profile.
- Role: ${user.role}
- Full Name: ${user.full_name}
- Email: ${user.email}
- User ID: ${user.id}
- Phone: ${user.phone || 'Not provided'}`;

                    if (profile) {
                        userContext += `
- Sport: ${profile.sport_id}
- Age: ${profile.age}
- Gender: ${profile.gender}
- Location: ${profile.location}
- Primary Role: ${profile.primary_role}
- Batting Style: ${profile.batting_style}
- Bowling Style: ${profile.bowling_style}`;
                    }
                }
            } catch (err) {
                // Token invalid or expired, ignore and proceed as unauthenticated
                console.error("Alpha-Q Auth Error:", err.message);
            }
        }
        // -------------------------------------

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.5-flash-lite",
            systemInstruction: BASE_SYSTEM_PROMPT + userContext
        });

        // Convert messages to Gemini format
        let history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Gemini requires the first message in history to be from the 'user'
        if (history.length > 0 && history[0].role === 'model') {
            history.shift(); // Remove the initial greeting from the history
        }

        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate response from AI.' });
    }
});

module.exports = router;
