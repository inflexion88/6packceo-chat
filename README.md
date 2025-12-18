# 6packCEO - AI Nutrition Coach

An elite AI-powered nutrition coaching chatbot built with React, TypeScript, and GPT-4o Mini. Features real-time streaming responses, conversation history, and a curated nutrition knowledge base.

## 🚀 Features

- **Smart Nutrition Coaching**: Built-in knowledge base with meal plans, restaurant strategies, and supplement recommendations
- **Real-time Streaming**: Instant AI responses with streaming support
- **Conversation History**: Persistent chat sessions stored locally
- **Production Ready**: Secure API architecture with serverless functions
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **AI**: OpenAI GPT-4o Mini
- **Deployment**: Vercel Serverless Functions
- **Styling**: Tailwind CSS (custom configuration)

## 📦 Run Locally

**Prerequisites:** Node.js 18+

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 6packceo-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your OpenAI API key:
   ```
   API_KEY=sk-proj-your-actual-key-here
   ```
   Get your API key from: https://platform.openai.com/api-keys

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

## 🌐 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables**
   ```bash
   vercel env add API_KEY
   ```
   Paste your OpenAI API key when prompted

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy with GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `API_KEY` = your OpenAI API key
   - Click "Deploy"

## 🔒 Security

- API keys are stored securely as environment variables
- OpenAI calls are made server-side via Vercel serverless functions
- No API keys are exposed in the client-side code
- Environment files (`.env.local`) are gitignored

## 💰 Cost Optimization

- Uses GPT-4o Mini (~$0.15 per 1M input tokens)
- Efficient knowledge base (~1,800 tokens per request)
- Average cost: ~$0.005 per conversation
- $9 budget = ~1,500+ full conversations

## 📝 License

MIT
