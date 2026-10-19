---
name: Reddit Analysis & Pain Point Extraction
trigger: /reddit-analysis
scope: Reddit Scout Agent
---

# Skill: Reddit Analysis & Pain Point Extraction

Parse subreddits to identify B2B procurement opportunities and supplier demands.

## Search Strategy

### Target Communities

**High-Value Subreddits:**
- r/smallbusiness (procurement discussions)
- r/entrepreneur (sourcing challenges)
- r/manufacturing (supplier needs)
- r/procurement (B2B logistics)
- Industry-specific subs (r/wholesale, r/logistics, etc.)

### Keyword Detection

Search for signals of B2B need:

| Signal | Examples | Confidence |
|--------|----------|------------|
| Active seeking | "looking for", "need quotes", "sourcing" | 0.85+ |
| Pain signals | "can't find", "supply chain issue", "struggling" | 0.75+ |
| Volume language | "bulk", "wholesale", "monthly order" | 0.70+ |
| Recurring need | "every month", "ongoing", "regular supplier" | 0.65+ |

## Analysis Pipeline

### 1. Thread Collection
- Scan subreddit feed (last 7 days)
- Filter by relevance keywords
- Extract thread metadata (title, author, date, engagement)

### 2. Context Extraction
- Read full thread discussion
- Identify original pain point
- Note supplier type being sought
- Capture volume/urgency indicators

### 3. Need Classification

```json
{
  "need_type": "product_sourcing|service|equipment|logistics",
  "specificity": "explicit|implied|tangential",
  "urgency": "high|medium|low",
  "volume_level": "small|medium|large|enterprise"
}
```

### 4. Quality Filtering

Remove:
- [ ] Personal/consumer queries
- [ ] Health/sensitive data discussions
- [ ] Spam/marketing posts
- [ ] Duplicate threads
- [ ] Low-engagement discussions (< 3 replies)

## Output Format

```json
{
  "source": "reddit",
  "subreddit": "r/...",
  "thread_url": "...",
  "title": "...",
  "pain_point": "...",
  "supplier_type": "...",
  "volume_indicator": "...",
  "urgency": "high|medium|low",
  "confidence_score": 0.0-1.0,
  "key_quotes": [...],
  "timestamp": "...",
  "status": "new|validated|matched|archived"
}
```

## Rate Limiting

- Respect Reddit API limits (60 requests/minute)
- Cache results for 24 hours
- Batch process subreddits (5 at a time)
- Monitor for rate limit warnings

## Data Handling

- No storage of usernames/user data beyond thread context
- Aggregate only pain points, not individuals
- Comply with Reddit terms of service
- Delete raw data after 30 days retention
