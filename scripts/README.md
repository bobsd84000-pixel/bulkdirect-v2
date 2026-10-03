# BulkDirect Scripts

Utilities and orchestration tools for the 4-agent swarm.

## Files

### swarm-orchestrator.js
Main orchestrator that coordinates all four agents in sequence:
1. Reddit Scout discovers pain points
2. Brainstorm agent generates 30+ solutions
3. Validator scores and filters leads
4. Matcher routes to providers

**Usage:**
```javascript
const SwarmOrchestrator = require('./swarm-orchestrator');
const swarm = new SwarmOrchestrator();
await swarm.initialize();
const results = await swarm.runSwarmCycle();
```

### agents.js
Agent implementations (stubs for integration with Claude API):
- `RedditScoutAgent`: Scans subreddits for pain points
- `BrainstormAgent`: Generates divergent ideas using ADHD Skill
- `ValidatorAgent`: Scores leads by confidence
- `MatcherAgent`: Routes leads to providers

### data-processor.js
Batch processing and data utilities:
- `processBatch()`: Filter and deduplicate leads
- `formatLeadForProvider()`: Format lead for external sharing
- `calculateMetrics()`: Generate performance reports
- `exportToCSV()`: Export leads to CSV format
- `sanitizeForExternal()`: Remove internal fields before sharing

### reddit-extractor.js
**NEW** - Hyper-Extract powered Reddit content parser:
- `extractThread()`: Parse single Reddit thread for lead signals
- `extractBatch()`: Process multiple threads in parallel
- `filterByConfidence()`: Filter by confidence threshold
- `toLeadFormat()`: Convert extraction to lead schema
- Pattern matching for pain points, volume, urgency, specs
- Intelligent confidence scoring (0.0-1.0)

## API Integration

These scripts require integration with:
- **Reddit API**: For thread discovery and parsing
- **Claude API**: For agent reasoning and ADHD Skill
- **Provider Database**: For matching and routing

See `../rules/` for security and data handling constraints.
