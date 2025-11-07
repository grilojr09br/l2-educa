# AI Chatbot Setup Guide

## Quick Start

The AI Educational Chatbot is now integrated into L2 EDUCA! Follow these steps to get it running.

## 1. Get OpenRouter API Keys

1. Visit [OpenRouter](https://openrouter.ai)
2. Sign up or log in
3. Navigate to the **Keys** section
4. Click **Create Key**
5. Copy your API key

## 2. Configure Environment Variables

Create a `.env` file in the `l2-educa/` directory:

```bash
# In the l2-educa directory
touch .env
```

Add your API configuration to `.env`:

```env
# OpenRouter API Key
VITE_OPENROUTER_API_KEY=your-openrouter-api-key-here

# Model Selection (optional, defaults to gpt-3.5-turbo)
VITE_OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

### Multiple API Keys (Optional)

For better rate limiting and automatic failover, you can provide multiple keys:

```env
# Method 1: Comma-separated
VITE_OPENROUTER_API_KEYS=key1,key2,key3

# Method 2: JSON array
VITE_OPENROUTER_API_KEYS=["key1", "key2", "key3"]

# Method 3: One per line
VITE_OPENROUTER_API_KEYS=key1
key2
key3
```

The system will automatically rotate between keys and handle rate limits.

## 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Model Options

### Free Models (Great for Development)

```env
# DeepSeek Chat v3.1 (HIGHLY RECOMMENDED - Best for education)
VITE_OPENROUTER_MODEL=deepseek/deepseek-chat-v3.1:free

# DeepSeek R1 (Best for complex reasoning/problem-solving)
VITE_OPENROUTER_MODEL=deepseek/deepseek-r1:free

# Alibaba TongYi DeepResearch (Good for research topics)
VITE_OPENROUTER_MODEL=alibaba/tongyi-deepresearch-30b-a3b:free

# GPT-3.5 Turbo (Reliable fallback)
VITE_OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

### Paid Models (Better Quality)

```env
# GPT-4 (Best quality, slower)
VITE_OPENROUTER_MODEL=openai/gpt-4

# Claude 3.5 Sonnet (Excellent reasoning)
VITE_OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# Gemini Pro 1.5 (Long context, fast)
VITE_OPENROUTER_MODEL=google/gemini-pro-1.5
```

## Features

### Context-Aware Assistance
The chatbot knows which page you're on and adapts its responses:
- On Math pages: Focuses on mathematical concepts
- On Physics pages: Explains physics principles
- On subject pages: Recommends specific topics
- On homepage: Helps you choose where to start

### Dynamic Navigation
The AI can create interactive buttons in chat:

```
[[NAVIGATE:Ver Números Complexos|/math/numeros-complexos|functions]]
```

Creates a button that navigates to that page with smooth transitions.

### Topic Recommendations

```
[[TOPIC:polinomios]]
[[TOPIC:geometria-analitica]]
```

Displays beautiful topic cards with difficulty, duration, and gradients.

### Follow-Up Suggestions

```
[[FOLLOW_UP:Quero ver exemplos práticos resolvidos]]
```

Offers contextual follow-up questions to continue the conversation naturally.

## Customization

### Extend System Prompts

Edit `src/utils/chatbotPrompts.js` to customize the AI's personality and instructions.

### Add New Token Types

Edit `src/utils/chatbotTokens.js` to add new interactive elements:
- Formula tooltips
- Exercise generators
- Video links
- Custom actions

### Style Customization

Edit `src/components/AIChatWidget.css` to match your brand:
- Change gradient colors
- Adjust glassmorphism effects
- Modify animations

## Troubleshooting

### Chatbot Not Appearing?

1. Check that you created `.env` file (not `.env.example`)
2. Verify the file is in `l2-educa/` directory
3. Restart the development server
4. Check browser console for errors

### "API not configured" Message?

- Your `.env` file may not be loaded
- Verify environment variable names start with `VITE_`
- Check for typos in variable names
- Ensure no extra spaces around the `=` sign

### API Key Not Working?

1. Verify the key is active on OpenRouter
2. Check you have credits/balance
3. Try generating a new key
4. Test with a free model first

### Rate Limiting Issues?

- Add multiple API keys for automatic rotation
- System handles rate limits with 65-minute cooldown
- Failed keys are temporarily disabled
- Backend proxy support available (optional)

## Backend Proxy (Optional)

For production, consider adding a backend proxy to hide API keys:

```env
VITE_BACKEND_URL=https://your-backend-api.com
```

The chatbot will automatically try the backend first, then fall back to client-side keys.

## Security Notes

- ⚠️ **NEVER** commit your `.env` file to version control
- `.env` is already in `.gitignore` by default
- Keep your API keys private
- For production, use environment variables on your hosting platform
- Consider rate limiting on your backend

## Architecture

```
ChatbotContext (State Management)
    ↓
AIChatWidget (UI Component)
    ↓
chatbotPrompts (Dynamic System Prompts)
    ↓
chatbotTokens (Custom Button Parser)
    ↓
NavigationContext (Page Navigation)
```

### Key Files

- `src/contexts/ChatbotContext.jsx` - Global state and API config
- `src/components/AIChatWidget.jsx` - Main chat UI component
- `src/components/AIChatWidget.css` - Glassmorphic styles
- `src/utils/chatbotPrompts.js` - Context-aware prompt generation
- `src/utils/chatbotTokens.js` - Custom token parsing system
- `src/contexts/NavigationContext.jsx` - Enhanced with location context

## Example .env File

```env
# ============================================
# L2 EDUCA - AI Chatbot Configuration
# ============================================

# Single API Key
VITE_OPENROUTER_API_KEY=sk-or-v1-abc123...

# Model
VITE_OPENROUTER_MODEL=openai/gpt-3.5-turbo

# Optional: Multiple keys for rotation
VITE_OPENROUTER_API_KEYS=sk-or-v1-key1,sk-or-v1-key2

# Optional: Backend proxy
VITE_BACKEND_URL=
```

## Support

For issues or questions:
1. Check this guide first
2. Review browser console errors
3. Test with different models
4. Verify OpenRouter account status

## Future Enhancements

Planned features:
- RAG integration for content-specific answers
- Exercise generation within chat
- Formula rendering in chat
- Study plan creation
- Progress tracking
- Voice input support
- Mobile-optimized gestures

---

**Ready to help students learn!** 🚀📚

