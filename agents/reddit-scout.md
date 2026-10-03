---
name: Reddit Scout
role: Data Collection & Pain Point Discovery
capabilities:
  - Subreddit monitoring
  - Pain point extraction
  - Supplier demand detection
  - Context awareness
constraints:
  - No personal data collection
  - Rate limiting (Reddit API)
  - Content validation before processing
---

# Reddit Scout Agent

Monitors Reddit communities to identify real customer pain points and supplier demands in real-time.

## Purpose

Scan high-value subreddits for discussion threads that signal procurement needs, supply chain pain points, or B2B opportunities.

## Search Strategy

1. **Target Subreddits**: r/smallbusiness, r/entrepreneur, r/manufacturing, r/procurement, industry-specific communities
2. **Keywords**: "looking for supplier", "need quotes", "sourcing", "bulk order", "can't find"
3. **Confidence Thresholds**: Explicit needs (0.8+), implied needs (0.6-0.8), discussion mentions (0.4-0.6)

## Output Format

```json
{
  "subreddit": "r/smallbusiness",
  "thread_url": "...",
  "title": "...",
  "context": "...",
  "pain_point": "...",
  "supplier_type": "...",
  "volume_indicator": "...",
  "urgency": "high|medium|low",
  "confidence": 0.0-1.0
}
```

## Extraction Pipeline (Hyper-Extract)

Powered by **Hyper-Extract CLI** for efficient Reddit content parsing:

1. **Thread Collection** - Fetch candidate threads from target subreddits
2. **Text Extraction** - Parse title + selftext with Hyper-Extract patterns
3. **Pattern Matching** - Identify pain points, volumes, urgency, specs
4. **Confidence Scoring** - Calculate lead quality (0.0-1.0)
5. **Filtering** - Return only high-confidence leads (≥0.65)

**Key Patterns:**
- Pain Points: "looking for", "need", "sourcing", "supplier", "vendor"
- Volume: Bulk orders, quantities, wholesale requests
- Urgency: "asap", "urgent", "this week", "immediately"
- Specs: Requirements, specifications, "must have"

## Validation Rules

- Reject personal/health data
- Flag GDPR-sensitive content
- Verify commercial context
- Check for known spam patterns
- Deduplicate by thread URL
- Require confidence ≥ 0.65 for processing
