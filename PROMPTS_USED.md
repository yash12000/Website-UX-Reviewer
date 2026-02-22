# 📝 Prompts Used - Website UX Reviewer

## Primary Development Prompts

### Prompt 1: Initial Setup & Architecture
**Goal:** Set up full-stack project structure

```
Set up a Node.js + React full-stack application for website UX review. 
Create backend with Express scraping endpoint, frontend with React router.
Include database models for reviews and history. Add error handling.
```

**Result:** Backend server, frontend routing, API structure

---

### Prompt 2: Web Scraping Implementation
**Goal:** Implement website content extraction

```
Create a scraper service using Cheerio that extracts:
- Page title
- Headings (h1, h2)
- Buttons and links
- Forms count
- Paragraph text

Include User-Agent header and timeout handling.
Add error logging.
```

**Result:** scraper.js with robust extraction logic

---

### Prompt 3: Dynamic UX Scoring Algorithm
**Goal:** Create intelligent UX analysis without OpenAI quota constraints

```
Create algorithm that calculates score (0-100) based on:
- Title presence (+10)
- Headings count > 2 (+10)
- Text content length > 3 paragraphs (+10)
- Forms present (+5)
- Buttons/links count > 2 (+10)
- Bonus for 6+ buttons (+5)
- Cap at 100

Generate issues for 5 categories:
- Clarity
- Navigation
- Layout
- Accessibility
- Trust
```

**Result:** Stable, offline-capable scoring in generateUXReview()

---

### Prompt 4: Frontend UI & Components
**Goal:** Create React components with proper rendering

```
Build ReviewCard component that:
- Safely handles null/undefined data
- Groups issues by category
- Displays improvements list
- Shows score with Recharts bar chart

Build Home page with:
- URL input field
- Analyze button with loading state
- Error message display
- History list rendering
```

**Result:** ReviewCard.jsx, Home.jsx with proper UX

---

### Prompt 5: Compare Feature
**Goal:** Add website comparison functionality

```
Implement compare endpoint that:
- Takes two URLs
- Analyzes both independently
- Returns side-by-side results
- Calculates difference
- Determines winner

Update frontend to show:
- Two input fields
- Side-by-side score display
- Winner announcement
```

**Result:** Compare endpoint + UI section

---

### Prompt 6: Safe Failure Handling
**Goal:** Prevent app crashes on partial failures

```
Implement Promise.allSettled for comparison flow:
- If one URL fails, still show the other
- Handle null/undefined gracefully
- Use optional chaining (?.)
- Show "Failed to analyze" for unreachable URLs
```

**Result:** Robust compare feature handling partial failures

---

## Key Prompt Learnings

✅ **Be Specific** - Details > Vague requests  
✅ **Include Context** - Reference existing code  
✅ **Separate Concerns** - One prompt per feature  
✅ **Handle Errors** - Always ask about error cases  
✅ **Test with Examples** - Verify with sample data  

---

**Last Updated:** February 21, 2026