Movie Insight Builder 
A full-stack web application that allows users to enter an IMDb movie ID and instantly receive detailed movie information along with AI-powered audience sentiment analysis.
This project was built as part of a Full-Stack Developer Internship assignment.
Setup Instructions
1.	1. Clone the repository:
git clone https://github.com/anshumankansana/ai-movie-insight-builder.git
cd ai-movie-insight-builder
2.	2. Install dependencies:
npm install
3.	3. Configure environment variables:
Create a file named .env.local in the root directory and add:
OMDB_API_KEY=your_omdb_key
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_gemini_key
4.	4. Run the development server:
npm run dev
Open http://localhost:3000 in your browser.
Tech Stack Rationale
Next.js (App Router):
Chosen to build both frontend and backend within a single framework. API routes ensure secure handling of API keys and simplify deployment.
TypeScript:
Provides type safety, improves maintainability, and reduces runtime errors.
Tailwind CSS:
Used for rapid UI development and consistent, modern styling.
Framer Motion:
Adds subtle animations to enhance user experience.
OMDb API:
Used to fetch movie metadata directly via IMDb ID.
TMDB API:
Used to retrieve audience reviews for sentiment analysis.
Google Gemini API:
Used to summarize audience reviews and classify overall sentiment.
Vercel:
Chosen for seamless Next.js deployment and environment variable management.
Assumptions
- The user provides a valid IMDb ID as input.
- Audience sentiment is derived from available TMDB reviews.
- If no reviews are found, sentiment defaults to 'Mixed'.
- AI response formatting may require fallback parsing.
- The application is optimized for assignment evaluation, not large-scale production traffic.
Architecture Overview
1. User enters IMDb ID. Example tt1375666, tt9362722etc.
2. Frontend sends POST request to /api/movie.
3. Server fetches data from OMDb and TMDB.
4. Reviews are analyzed using Gemini AI.
5. Combined response is sent back and rendered
