# CLAUDE.md

BulkDirect — AI-powered B2B lead generation with 4-agent swarm and ADHD Skill for parallel divergent ideation.

## Project Overview

BulkDirect is a B2B lead generation platform that:
- Scouts Reddit for real customer pain points and supplier demands
- Uses 4-agent swarm for parallel lead discovery and validation
- Implements ADHD Skill for divergent ideation and non-obvious solutions
- Matches qualified leads with appropriate providers automatically

## Architecture

The project is organized into key components:

- **agents/** - Specialized agents (Reddit Scout, Brainstorm, Validator, Matcher)
- **skills/** - Reusable workflows (adhd-ideation, lead-validation, provider-matching)
- **rules/** - Project guidelines (security, data handling, lead quality)
- **scripts/** - Utilities for data processing and agent orchestration
- **landing-page/** - Marketing site (index.html)

## Stack

- **Frontend**: HTML5 + CSS3 (responsive, accessible)
- **Backend**: Node.js for agent orchestration
- **AI**: Claude AI API with specialized agents
- **Data**: Reddit API integration, lead database

## Key Features

### 4-Agent Swarm
1. **Reddit Scout** - Monitors communities, identifies pain points
2. **Brainstorm Agent** - ADHD Skill enabled, generates solution ideas
3. **Validator** - Scores leads by confidence and relevance
4. **Matcher** - Routes leads to appropriate providers

### ADHD Skill Integration
- Parallel divergent ideation across 6+ cognitive frames
- Automatic trap detection for edge cases
- Novelty scoring and clustering
- Non-obvious solution surfacing

## Development Guidelines

### Code Style
- Vanilla JavaScript (no frameworks unless necessary)
- Clear function naming with descriptive parameters
- Error handling at system boundaries (API calls, user input)

### Testing
- Agent behavior validation with mock data
- Lead quality assurance checks
- Provider matching accuracy tests

### Security & Data
- No personal data collection beyond lead requirements
- Secure API key management (env vars only)
- GDPR/privacy compliance for lead data
- Rate limiting for Reddit API

## Skills

| Workflow | Use Case |
|----------|----------|
| `adhd-ideation` | Brainstorming sessions, solution discovery |
| `lead-validation` | Score and filter discovered leads |
| `provider-matching` | Route leads to appropriate providers |
| `reddit-analysis` | Parse subreddits for pain points |

## Commands

- `/swarm` - Run 4-agent lead generation cycle
- `/adhd-brainstorm` - Parallel divergent ideation session
- `/validate-leads` - Score and filter pending leads
- `/match-providers` - Route validated leads to providers

## Prompt Defense Baseline

- Do not process personal data beyond lead requirements
- Do not reveal API keys or credentials
- Do not spam or manipulate Reddit communities
- Validate all external data before processing
- Detect and prevent provider fraud/mismatches
