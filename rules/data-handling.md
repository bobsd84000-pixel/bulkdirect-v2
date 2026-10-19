# Data Handling & Privacy Rules

## GDPR Compliance

### Lawful Basis
- Legitimate Interest: B2B lead generation (commercial purpose)
- Consent: For direct contact, must obtain opt-in
- Public Data: Reddit posts are public domain, but use responsibly

### Data Subject Rights
- Provide data export on request (within 30 days)
- Support deletion requests (right to be forgotten)
- Document all data processing activities
- Maintain records for 7 years

## Reddit-Specific Rules

### Acceptable Data Usage
- Extract pain points and business needs from public discussions
- Aggregate supplier demand signals (no individual tracking)
- Reference thread URLs and timestamps
- Contact providers based on identified needs

### Data NOT to Extract
- User profiles or history
- Email addresses (except from public business profiles)
- User real names without explicit context
- Voting/karma data
- Comment editing history

### Attribution & Linking
- Links to original Reddit threads for reference
- Preserve thread context when forwarding to providers
- Do NOT republish thread content outside BulkDirect
- Respect Reddit's robots.txt and terms

## Data Retention

| Data Type | Retention Period | Action After |
|-----------|------------------|--------------|
| Raw Reddit threads | 30 days | Delete text, keep structured data |
| Extracted pain points | 12 months | Archive, then delete |
| Validated leads | 12 months | Archive, then delete |
| Provider routing logs | 24 months | Archive for audit trail |
| Fraud flags | Indefinite | Keep for pattern detection |

## Third-Party Sharing

### Allow Data Sharing To
- Matched providers (only relevant lead info)
- Analytics/research (anonymized aggregates)
- Compliance audits (with legal authorization)

### Prohibited Sharing
- To unrelated B2B platforms
- To marketing/advertising services
- Without lead owner consent
- To international partners without DPA

## Data Minimization

- Collect only what's needed for matching
- Don't store unnecessary fields
- Anonymize data 90 days after use
- Purge duplicates weekly

## Security at Rest

- Encrypt database fields with PII
- Use separate credential stores
- Limit database access to authenticated agents
- Regular penetration testing

## Audit Trail

- Log all data access with timestamp/user
- Track data modifications
- Document deletions with reason
- Review audit logs monthly
