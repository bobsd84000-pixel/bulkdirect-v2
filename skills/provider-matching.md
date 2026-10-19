---
name: Provider Matching & Smart Routing
trigger: /match-providers
scope: Matcher Agent
---

# Skill: Provider Matching & Smart Routing

Connect validated leads with the right suppliers based on specialization, capacity, and historical performance.

## Matching Dimensions

### Dimension 1: Category Alignment (50% weight)

Match lead requirements against provider capabilities:

```
category_match = (primary_category_overlap × 0.6) + (subcategory_match × 0.4)
```

Examples:
- Lead: "need bulk PCB manufacturing" → Best match: Electronics PCB specialist
- Lead: "sourcing leather hides" → Best match: Tanning supplier
- Lead: "bulk powder packaging" → Best match: Packaging equipment provider

### Dimension 2: Capacity Assessment (30% weight)

Does the provider have capacity?

```
capacity_score = min(1.0, provider_monthly_output / lead_monthly_need)
```

Additional checks:
- Geographic coverage (can ship to lead location?)
- Lead time compatibility (does timeline match?)
- Minimum order quantities acceptable

### Dimension 3: Historical Performance (20% weight)

Provider track record:

```
performance_score = (conversion_rate × 0.5) + (customer_rating × 0.3) + (response_time × 0.2)
```

## Matching Algorithm

```
match_score = (category × 0.50) + (capacity × 0.30) + (performance × 0.20)
```

## Routing Tiers

**Tier 1: Best Match (≥ 0.85)**
- Single top-ranked provider
- Ready for immediate outreach
- High conversion probability

**Tier 2: Alternative Routes (0.70-0.84)**
- 2-3 secondary providers
- Backup options if primary unavailable
- Diversification strategy

**Tier 3: Manual Review (< 0.70)**
- Insufficient matching data
- Requires human judgment
- Flag for senior team

## Deduplication

- Check if lead already routed to this provider
- Track routed leads by provider ID
- Prevent duplicate lead spam
- Log all routing decisions

## Provider Preferences

- Respect provider capacity constraints
- Honor exclusivity agreements
- Track provider opt-out requests
- Update provider status monthly
