# Security Rules

## API Key Management

- **Never** commit API keys to repository
- Use environment variables (`.env.local`, not versioned)
- Rotate keys quarterly
- Monitor for unauthorized access patterns
- Use read-only tokens where possible

## Data Collection Boundaries

### Do Not Collect
- Personal identifiable information (PII) beyond business context
- Email addresses without explicit consent
- Phone numbers without opt-in
- Residential addresses
- Social security numbers or financial data

### Allowed Collection
- Business names and contact info (public domain)
- Company websites and LinkedIn profiles
- Industry and specialization signals
- Business size indicators (from public records)

## Rate Limiting

- Reddit API: 60 requests/minute
- Claude API: Follow usage tier limits
- Database queries: 1000/minute per endpoint
- Implement exponential backoff on rate limits

## Authentication & Access Control

- All agent communications must use authenticated tokens
- Rotate credentials on team member departure
- Audit logs for all data access
- No hardcoded credentials in code

## External Data Validation

- Never trust external data without validation
- Sanitize all inputs before processing
- Validate provider information from multiple sources
- Flag suspicious patterns for manual review

## Incident Response

- Log all security incidents
- Notify affected users within 24 hours
- Document root cause and remediation
- Prevent recurrence with automated checks
