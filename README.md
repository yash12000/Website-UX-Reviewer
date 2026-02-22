# 🔍 Website UX Reviewer

A full-stack application that analyzes and compares website user experience (UX) using intelligent content evaluation and dynamic scoring.

## 🎯 Features

✅ **Single Website Analysis**
- Scrape website content (title, headings, buttons, forms, text)
- Generate dynamic UX score (0-100) based on content quality
- Identify UX issues by category (Clarity, Navigation, Layout, Accessibility, Trust)
- Show improvement recommendations

✅ **Compare Two Websites**
- Analyze and compare UX scores of two websites side-by-side
- Identify winner and score difference
- Evaluate improvement opportunities

✅ **Review History**
- Store last 5 analyzed websites
- Quick access to previous reviews and scores

✅ **Status Page**
- Monitor backend, database, and LLM service health
- Real-time status indicators

✅ **Beautiful UI**
- Recharts bar chart visualization for scores
- Responsive card-based design
- Color-coded scores and status indicators
- Clean, modern interface

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- Axios for HTTP requests
- Cheerio for web scraping
- MongoDB (optional, currently using in-memory storage)

**Frontend:**
- React 18
- Vite (build tool)
- Recharts (data visualization)
- Modern CSS styling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Setup

**1. Clone the repository**
```bash
git clone <repo_url>
cd Website-UX-Reviewer
```

**2. Backend Setup**
```bash
cd backend
npm install
npm start
```
Backend will run on `http://localhost:5000`

**3. Frontend Setup (in another terminal)**
```bash
cd frontend
npm install
npm install recharts
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📖 Usage

### Analyze a Single Website
1. Open http://localhost:5173
2. Enter a website URL (e.g., `https://example.com`)
3. Click "Analyze"
4. View your UX score and improvement recommendations

### Compare Two Websites
1. Scroll to "Compare Two Websites" section
2. Enter two website URLs
3. Click "Compare"
4. See side-by-side scores and winner

### View History
- All analyzed websites are stored in review history
- Click any reviewed URL to re-analyze

### Check System Status
1. Navigate to `/status` page
2. View backend, database, and LLM service health

## 🧠 How Scoring Works

Dynamic score calculation (0-100):
- Base score: 50 points
- Clear title: +10 points
- 3+ headings: +10 points
- 4+ paragraphs: +10 points
- Form present: +5 points
- 3+ buttons: +10 points
- 6+ buttons: +5 bonus points

## 📁 Project Structure

```
Website-UX-Reviewer/
├── backend/
│   ├── routes/review.js          # API endpoints (review, compare, history)
│   ├── services/scraperjs         # Web scraping logic
│   ├── services/llm.js            # LLM integration (optional)
│   ├── server.js                  # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main review & compare page
│   │   │   └── Status.jsx         # System status page
│   │   ├── components/
│   │   │   ├── ReviewCard.jsx     # Review display with chart
│   │   │   └── IssueGroup.jsx     # Issues grouping
│   │   ├── App.jsx                # Router setup
│   │   ├── api.js                 # Axios API client
│   │   └── main.jsx               # React entry point
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration
│   └── package.json
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
└── PROMPTS_USED.md
```

## 🔧 API Endpoints

### POST `/api/review`
Analyze a single website
```json
{
  "url": "https://example.com"
}
```

Response:
```json
{
  "review": {
    "score": 75,
    "issues": [...],
    "improvements": [...]
  },
  "history": [...]
}
```

### POST `/api/compare`
Compare two websites
```json
{
  "url1": "https://example.com",
  "url2": "https://example.org"
}
```

Response:
```json
{
  "url1": "...",
  "review1": {...},
  "url2": "...",
  "review2": {...},
  "difference": 10,
  "winner": "https://example.com"
}
```

### GET `/api/history`
Get last 5 reviewed websites

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
# Connect repo to Vercel
# Vercel auto-deploys on push
```

### Backend (Render)
```bash
# Push code to GitHub
# Create new Web Service on Render
# Connect GitHub repo
# Set environment variables if needed
```

See full step-by-step deployment instructions in [DEPLOY.md](DEPLOY.md).

### Database (MongoDB Atlas)
- Create free cluster on MongoDB Atlas
- Whitelist IP: 0.0.0.0/0 (for development)

## 📄 Environment Variables

Create `.env` file in backend:
```
OPENAI_API_KEY=sk-xxx... (optional, for LLM features)
MONGO_URI=mongodb+srv://... (optional)
```

## 🎓 Learning & Development

This project demonstrates:
- ✅ Full-stack web development
- ✅ Web scraping with Cheerio
- ✅ REST API design
- ✅ React component architecture
- ✅ Data visualization with Recharts
- ✅ Dynamic scoring algorithms
- ✅ Error handling & validation
- ✅ Async/await patterns

## 📝 Notes

- Currently uses **in-memory storage** for history (resets on server restart)
- To enable LLM scoring: add OpenAI API key and uncomment LLM code
- For production: implement persistent MongoDB storage
- Scraping may fail for sites with anti-bot protection

## 📞 Support

For issues or questions, check:
1. Browser console for frontend errors
2. Backend terminal for API errors
3. Network tab for request/response details

---

**Created with ❤️ for UX Analysis**# Website-UX-Reviewer
# Website-UX-Reviewer
