import { NextResponse } from "next/server";
import { fetchMovieData } from "../../../lib/movieService";
import { analyzeSentiment } from "../../../lib/aiService";

export async function POST(req: Request) {
  try {
    const { imdbId } = await req.json();

    if (!imdbId) {
      return NextResponse.json({ error: "IMDb ID required" }, { status: 400 });
    }

    const movie = await fetchMovieData(imdbId);
    const sentiment = await analyzeSentiment(movie.reviews);

    return NextResponse.json({
      ...movie,
      sentiment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}