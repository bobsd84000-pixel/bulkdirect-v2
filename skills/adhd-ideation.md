---
name: ADHD Skill - Parallel Divergent Ideation
trigger: /adhd-brainstorm
scope: Brainstorm Agent
---

# ADHD Skill: Parallel Divergent Ideation

Stop converging on the obvious answer. Generate 30+ ideas across 6+ cognitive frames in parallel.

## How It Works

### Phase 1: Frame Isolation (15 min)

Each cognitive frame works independently with zero shared context:
- **Frame A**: Cost minimization lens
- **Frame B**: Speed-to-market lens
- **Frame C**: Quality-first lens
- **Frame D**: Innovation angle
- **Frame E**: Risk mitigation
- **Frame F**: Sustainability
- **Frame G**: Local/regional focus

### Phase 2: Trap Detection (10 min)

Automatic detection of:
- Design pitfalls (solution conflicts, impossible constraints)
- Edge cases (customer segments the obvious solution misses)
- Hidden risks (vendor dependencies, regulatory gaps)
- Non-obvious failure modes

### Phase 3: Novelty Scoring (10 min)

Score each idea:
- **Uniqueness**: How different from conventional answers (0-1.0)
- **Impact Potential**: Likelihood to solve the core need (0-1.0)
- **Combined Score**: `(novelty × 0.6) + (impact × 0.4)`

### Phase 4: Clustering & Synthesis (10 min)

- Group similar ideas by theme
- Identify hybrid/combination opportunities
- Surface the ideas past number three that matter

## Inputs

```json
{
  "pain_point": "...",
  "context": "...",
  "constraints": [...],
  "success_criteria": [...]
}
```

## Outputs

```json
{
  "ideas_by_frame": {...},
  "traps_detected": [...],
  "novel_ideas_ranked": [...],
  "top_5_recommendations": [...],
  "hybrid_combinations": [...]
}
```

## Key Rules

- **No premature convergence**: Generate minimum 4 ideas per frame before filtering
- **Wild cards welcome**: Preserve outlandish ideas in clustering phase
- **Context isolation**: Frames don't see each other's reasoning
- **Trap focus**: What breaks this idea? What does it miss?

## When to Use

- Architecture decisions
- Naming strategies
- Design direction
- Fuzzy debugging (where's the real problem?)
- Solution exploration (not just yes/no, but what else?)

## Expected Cost

- ~30 second execution
- ~10 Claude API calls
- High-novelty output vs single-pass thinking
