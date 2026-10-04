# Lead Quality Standards

## Scoring Rubric

### Explicitness (0-1.0)

- **1.0**: Direct procurement request ("I need X supplier for Y product")
- **0.8**: Clear need with minor ambiguity ("Looking to source XXX")
- **0.6**: Implied need ("Struggling to find a supplier")
- **0.4**: Tangential mention ("Might need to look for suppliers")
- **0.0**: No clear need signal

### Commercial Intent (0-1.0)

- **1.0**: Clear B2B context, business decision-making
- **0.8**: Business context implied but not explicit
- **0.6**: Mixed personal/business context
- **0.4**: Personal context with business undertones
- **0.0**: Personal consumer inquiry

### Specificity (0-1.0)

- **1.0**: Detailed requirements (volume, timeframe, specs)
- **0.8**: Most requirements specified
- **0.6**: Some requirements clear, others vague
- **0.4**: Minimal specificity
- **0.0**: No details provided

### Volume Signals (0-1.0)

- **1.0**: Bulk/wholesale terminology ("monthly orders", "bulk sourcing")
- **0.8**: Repeated need indicated ("ongoing supplier")
- **0.6**: Scale hints ("need to scale", "growing demand")
- **0.4**: Potential volume but unclear
- **0.0**: One-time or personal volume

## Minimum Thresholds

| Lead Type | Min Score | Route Action |
|-----------|-----------|--------------|
| High-priority | ≥ 0.80 | Immediate contact |
| Standard | 0.65-0.79 | Validate & match |
| Warm | 0.50-0.64 | Monitor for clarity |
| Low-priority | < 0.50 | Archive after 60 days |

## Disqualifying Factors

Leads with these signals are automatically archived:

- Personal/consumer intent confirmed
- Known spam patterns detected
- Fraud indicators present
- Requests for personal data
- Repeated posts in short timeframe (< 7 days)
- Violation of Reddit terms of service

## Re-validation Rules

- Re-score leads monthly if score 0.50-0.75
- Archive unmatched leads after 90 days
- Keep high-confidence (≥ 0.80) leads permanently
- Document all score changes with rationale
