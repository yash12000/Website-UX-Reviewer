import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeWebsite = async (url) => {
  try {
    console.log("🔍 Scraping URL:", url);
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    const scraped = {
      title: $("title").text(),
      headings: $("h1,h2,h3")
        .map((i, el) => $(el).text())
        .get(),
      buttons: $("button")
        .map((i, el) => $(el).text())
        .get(),
      forms: $("form").length,
      text: $("p")
        .map((i, el) => $(el).text())
        .get()
        .slice(0, 10),
    };

    console.log("✅ Scrape successful:", scraped.title);
    return scraped;
  } catch (err) {
    console.error("❌ Scrape failed:", err.message);
    throw new Error(`Failed to scrape ${url}: ${err.message}`);
  }
};
