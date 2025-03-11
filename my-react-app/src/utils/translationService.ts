export const fetchTranslation = async (
  text: string,
  oldLang: string,
  newLang: string
) => {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${oldLang}|${newLang}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.responseData.translatedText;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
};
