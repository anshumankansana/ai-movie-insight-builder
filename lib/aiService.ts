export async function analyzeSentiment(reviews: string[]) {
  if (!reviews.length) {
    return {
      summary: "No reviews available.",
      classification: "Mixed",
    };
  }

  const prompt = `
Analyze these movie audience reviews:

${reviews.join("\n\n")}

Return ONLY valid JSON:
{
  "summary": "short 3-5 line summary",
  "classification": "Positive or Mixed or Negative"
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return {
  summary:
    "AI could not structure the response. Displaying raw analysis below:\n\n" +
    text,
  classification: "Mixed",
};
  }
}