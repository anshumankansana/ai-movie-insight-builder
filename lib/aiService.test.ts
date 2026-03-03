import { analyzeSentiment } from "./aiService";

test("returns mixed when no reviews", async () => {
  const result = await analyzeSentiment([]);
  expect(result.classification).toBe("Mixed");
});