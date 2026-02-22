export const generateUXReview = async (content) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
  return {
    score: 70,
    issues: [],
    improvements: []
  };
}

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `Analyze UX and return JSON only`
      }]
    });

    const text = res.choices[0].message.content;

    try {
      return JSON.parse(text);
    } catch {
      console.log("LLM RAW:", text);

      return {
        score: 70,
        issues: [
          {
            category: "Clarity",
            issue: "Fallback issue",
            why: "LLM response not JSON",
            proof: content.title
          }
        ],
        improvements: []
      };
    }

  } catch (err) {
    console.error("LLM ERROR:", err.message);

    return {
      score: 65,
      issues: [],
      improvements: []
    };
  }
};