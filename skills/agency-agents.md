---
name: Agency Agents - Autonomous Swarm Control
trigger: /agency-agents
scope: Full 4-Agent Swarm
---

# Skill: Agency Agents - Autonomous Swarm Control

Autonomous coordination of 4-agent swarm for end-to-end lead generation, validation, and provider matching.

## Architecture

### Agent Stack (Sequential → Parallel)

```
┌─────────────────────────────────────────────────────────────┐
│ AGENCY AGENTS - Autonomous Swarm                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Phase 1: DISCOVERY                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Reddit Scout Agent                                   │   │
│  │ • Scan 4+ subreddits (smallbusiness, entrepreneur)   │   │
│  │ • Extract pain points with confidence scores         │   │
│  │ • Output: 50+ pain points per run                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  Phase 2: IDEATION (Parallel - 6 Frames)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Brainstorm Agent + ADHD Skill                        │   │
│  │ • Cost Minimization (cheap suppliers)                │   │
│  │ • Speed to Market (fastest delivery)                 │   │
│  │ • Quality First (premium vendors)                    │   │
│  │ • Innovation Angle (emerging alternatives)           │   │
│  │ • Risk Mitigation (vendor diversification)           │   │
│  │ • Sustainability (eco-conscious)                     │   │
│  │ Output: 30+ novel ideas, trap detection              │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  Phase 3: VALIDATION (Sequential)                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Validator Agent                                      │   │
│  │ • Score by: quality (0.4) + legitimacy (0.4) + ...  │   │
│  │ • Filter: confidence ≥ 0.75 = contact-ready         │   │
│  │ • Output: Filtered, ranked leads                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  Phase 4: MATCHING (Parallel)                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Matcher Agent                                        │   │
│  │ • Category alignment (50%)                           │   │
│  │ • Capacity assessment (30%)                          │   │
│  │ • Historical performance (20%)                       │   │
│  │ • Output: Routed leads → primary + alternate options │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Full Cycle Execution

### Input
```json
{
  "cycle_id": "bulk-2026-10-02-1",
  "subreddits": ["r/smallbusiness", "r/entrepreneur", "r/manufacturing"],
  "confidenceThreshold": 0.75,
  "batchSize": 50
}
```

### Output
```json
{
  "cycleId": "bulk-2026-10-02-1",
  "timestamp": "2026-10-02T14:30:00Z",
  "phases": {
    "discovery": {
      "painPoints": 52,
      "avgConfidence": 0.68
    },
    "ideation": {
      "totalIdeas": 312,
      "novelIdeas": 18,
      "trapsDetected": 23
    },
    "validation": {
      "leadsScored": 52,
      "contactReady": 38,
      "underReview": 9,
      "archived": 5
    },
    "matching": {
      "leadsRouted": 38,
      "primaryMatches": 38,
      "secondaryOptions": 76
    }
  },
  "results": {
    "routableLeads": 38,
    "successRate": 0.73,
    "avgConfidence": 0.81
  }
}
```

## Agency Control Loop

Autonomous decision-making per phase:

### Phase-Specific Logic

**Discovery → Ideation**
- If painPoints < 20: Expand subreddit search
- If painPoints > 100: Increase confidence threshold

**Ideation → Validation**
- Auto-route novelty score > 0.85 ideas
- Flag trap-heavy ideas for manual review
- Cluster similar ideas before scoring

**Validation → Matching**
- Confidence ≥ 0.85: Priority routing
- Confidence 0.65-0.84: Secondary routing
- Confidence < 0.65: Archive for later

## Monitoring & Feedback

Track per cycle:
- Lead quality trend (7-day rolling average)
- Provider conversion rates
- Time to first contact
- Customer acquisition cost (CAC) per source

## Autonomous Triggers

The Agency can self-trigger based on:
- ✅ Daily at 09:00 UTC
- ✅ When subreddit activity spikes (>50% above avg)
- ✅ When provider routable lead queue < 20
- ✅ On-demand via `/agency-agents` command

## Safety Rails

- Max 100 leads per cycle (prevents overload)
- Rate limit: 1 cycle per 4 hours (respects Reddit API)
- Require human approval for CAC > $500
- Audit log all routing decisions
- Block if fraud detection > 5% rate
