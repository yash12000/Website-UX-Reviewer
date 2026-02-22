import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

let history = [];

async function scrapeWebsite(url) {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(data);

  return {
    title: $("title").text() || "No title",
    headings: $("h1,h2")
      .map((i, el) => $(el).text())
      .get(),
    buttons: $("button,a")
      .map((i, el) => $(el).text())
      .get(),
    forms: $("form").length,
    text: $("p")
      .map((i, el) => $(el).text())
      .get()
      .slice(0, 5),
  };
}

function generateUXReview(content) {
  let score = 50;

  if (content.title && content.title !== "No title") score += 10;
  if (content.headings.length > 2) score += 10;
  if (content.text.length > 3) score += 10;
  if (content.forms > 0) score += 5;
  if (content.buttons.length > 2) score += 10;
  if (content.buttons.length > 5) score += 5;

  return {
    score: Math.min(score, 100),
    issues: [
      {
        category: "Clarity",
        issue: "Headline is not clear",
        why: "Users may not understand purpose immediately",
        proof: content.title,
      },
      {
        category: "Navigation",
        issue: "Too many clickable elements",
        why: "Creates confusion",
        proof: content.buttons.slice(0, 3).join(", "),
      },
      {
        category: "Layout",
        issue: "Content not structured",
        why: "Hard to scan",
        proof: content.text[0] || "No text",
      },
      {
        category: "Accessibility",
        issue: "No form labels",
        why: "Difficult for screen readers",
        proof: "Forms count: " + content.forms,
      },
      {
        category: "Trust",
        issue: "No trust signals",
        why: "Users may hesitate",
        proof: "No visible testimonials",
      },
    ],
    improvements: [
      {
        before: content.title,
        after: "Clear benefit-driven headline",
      },
      {
        before: "Too many buttons",
        after: "Limit to 1 primary CTA",
      },
      {
        before: "Unstructured text",
        after: "Use sections and headings",
      },
    ],
  };
}

router.post("/review", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    const content = await scrapeWebsite(url);
    const review = await generateUXReview(content);

    res.json({ review });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      error: "Backend failed",
      message: err.message
    });
  }
});

router.post("/compare", async (req, res) => {
  try {
    const { url1, url2 } = req.body;

    if (!url1 || !url2) {
      return res.status(400).json({ error: "Both URLs required" });
    }

    const content1 = await scrapeWebsite(url1);
    const review1 = generateUXReview(content1);

    const content2 = await scrapeWebsite(url2);
    const review2 = generateUXReview(content2);

    res.json({
      url1,
      review1,
      url2,
      review2,
      difference: review1.score - review2.score,
      winner: review1.score > review2.score ? url1 : review2.score > review1.score ? url2 : "Tie"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to compare websites" });
  }
});

router.get("/history", (req, res) => {
  res.json(history);
});

export default router;
