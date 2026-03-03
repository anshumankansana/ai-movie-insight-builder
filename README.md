# 🎬 AI Movie Insight Builder

A full-stack web application that allows users to enter an IMDb movie ID and instantly receive detailed movie information along with AI-powered audience sentiment analysis.

Built using Next.js (App Router) with secure server-side API routes and deployed on Vercel.

---

## 🚀 Live Demo

🔗 https://your-vercel-link-here.vercel.app

Example IMDb ID to test: tt0133093

---

## ✨ Features

- 🔎 Search movie by IMDb ID
- 🎥 Fetch movie title, poster, year, rating, plot, and cast
- 💬 Retrieve audience reviews
- 🤖 AI-generated sentiment summary
- 📊 Overall sentiment classification (Positive / Mixed / Negative)
- ⚡ Responsive UI
- 🎨 Smooth animations
- ✅ Input validation
- ❌ Graceful error handling
- 🔐 Secure API key handling (server-side only)

---

## 🧠 How It Works

1. User enters an IMDb ID.
2. Frontend sends a POST request to `/api/movie`.
3. Server:
   - Fetches movie details from OMDb.
   - Converts IMDb ID to TMDB ID.
   - Retrieves audience reviews from TMDB.
   - Sends reviews to Gemini AI for sentiment analysis.
4. API returns combined movie data + AI insights.
5. Frontend renders results in a structured UI.

All third-party API calls are handled server-side to protect API keys.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes
- Axios (external API requests)

### External APIs
- OMDb API (movie metadata)
- TMDB API (audience reviews)
- Google Gemini API (AI summarization & sentiment classification)

### Deployment
- Vercel

---

## 🧩 Tech Stack Rationale

**Next.js**  
Chosen to build both frontend and backend in a single framework. API routes allow secure handling of API keys and simplified deployment.

**TypeScript**  
Improves maintainability and prevents runtime errors through type safety.

**Tailwind CSS**  
Enables rapid styling and a clean, modern UI without complex CSS structure.

**Gemini API**  
Used for summarizing audience reviews and classifying sentiment efficiently using AI.

**Vercel**  
Provides seamless Next.js deployment and environment variable management.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/anshumankansana/ai-movie-insight-builder.git
cd ai-movie-insight-builder
2️⃣ Install Dependencies
npm install
3️⃣ Create Environment File

Create a file in the root directory:

.env.local

Add:

OMDB_API_KEY=your_omdb_key
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key

⚠️ Do not commit .env.local to GitHub.

4️⃣ Run Locally
npm run dev

Open:

http://localhost:3000
📌 Assumptions

User provides a valid IMDb ID.

Sentiment is derived from available TMDB reviews.

If no reviews are available, sentiment defaults to "Mixed".

AI output may require fallback parsing if JSON formatting fails.

Application is optimized for assignment evaluation, not large-scale production traffic.

🔐 Security Considerations

API keys stored in environment variables.

All external API calls handled server-side.

No secrets exposed to client.

External links use rel="noopener noreferrer".

🧪 Testing Scenarios Covered

Valid IMDb ID

Invalid IMDb format

Valid format but non-existent movie

Movie with no reviews

API failure handling

📈 Future Improvements

Implement caching for repeated searches

Add rate limiting

Expand test coverage

Add review preview section

Improve loading skeleton UI

Add streaming AI responses

👨‍💻 Author
developed by =>Anshuman Kansana

Developed as part of a Full-Stack Developer Internship assignment.
