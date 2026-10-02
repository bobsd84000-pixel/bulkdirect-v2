---
name: Lead Validation & Scoring
trigger: /validate-leads
scope: Validator Agent
---

# Skill: Lead Validation & Scoring

Filter and score discovered leads by confidence, relevance, and provider legitimacy.

## Validation Pipeline

### Step 1: Lead Quality Assessment

Evaluate the original pain point for:
- **Explicitness**: Is this a clear procurement request?
- **Commercial Intent**: Is there actual B2B context?
- **Specificity**: Are requirements detailed enough to match?
- **Volume Signals**: Does the discussion suggest bulk/repeated need?

Scoring:
```
quality_score = (explicitness × 0.3) + (intent × 0.3) + (specificity × 0.2) + (volume × 0.2)
```

### Step 2: Provider Legitimacy Check

Validate each potential match:
- [ ] Business registration exists
- [ ] Contact info is current
- [ ] Online presence confirms specialization
- [ ] No fraud/complaint patterns
- [ ] Industry certifications present

```
legitimacy_score = avg(registration, contact, presence, fraud_check, certifications)
```

### Step 3: Fraud Detection

Red flags:
- Newly registered companies (< 6 months)
- Unusually aggressive pricing
- Vague service descriptions
- No verifiable customer references
- Multiple complaints in public records

### Step 4: Confidence Calculation

```
final_confidence = (quality × 0.4) + (legitimacy × 0.4) + (urgency × 0.2)
```

## Output Actions

| Confidence | Action | Notes |
|-----------|--------|-------|
| ≥ 0.80 | Contact Ready | Route to Matcher immediately |
| 0.65-0.79 | Monitor | Gather more data, re-score weekly |
| 0.50-0.64 | Pending | Needs manual review or additional sources |
| < 0.50 | Archive | Too risky or insufficient context |

## Batch Processing

- Validate 50-100 leads per run
- Track scoring changes over time
- Learn from conversion data
- Adjust thresholds quarterly

## Data Retention

- Keep validation records for 12 months
- Archive low-confidence leads after 90 days
- Preserve fraud flags indefinitely
