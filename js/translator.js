const API_URL = "https://libretranslate.de/translate";

export async function translateText(text, targetLang = "es") {
  if (!text) return "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      })
    });

    const data = await response.json();

    return data.translatedText || text;
  } catch (error) {
    console.error("Error traduciendo:", error);
    return text; // fallback si falla
  }
}