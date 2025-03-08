export const fetchQuote = async (): Promise<{
  quote: string;
  author: string;
}> => {
  const API_URL = "https://api.api-ninjas.com/v1/quotes";
  const API_KEY = import.meta.env.VITE_API_NINJAS_KEY;

  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    return data[0]; // API returns an array of quotes
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
