const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

class RedditScoutAgent {
  constructor() {
    this.name = 'Reddit Scout';
    this.model = 'claude-3-5-sonnet-20241022';
  }

  async discoverPainPoints(subreddit, query) {
    const prompt = `You are a Reddit analyst scouting for B2B pain points and supplier demands.

Analyze the subreddit: r/${subreddit}
Search query: ${query}

Extract:
1. Top 5 pain points mentioned by users
2. Specific supplier/service demands
3. Frequency and urgency signals
4. Relevant user profiles (company size, industry)

Format as JSON with: painPoints[], demands[], urgencyLevel, userProfiles[]`;

    const response = await client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      agent: this.name,
      subreddit,
      analysis: response.content[0].type === 'text' ? response.content[0].text : null,
      timestamp: new Date().toISOString(),
    };
  }
}

class BrainstormAgent {
  constructor() {
    this.name = 'Brainstorm Agent (ADHD Skill)';
    this.model = 'claude-3-5-sonnet-20241022';
  }

  async generateSolutions(painPoint, context) {
    const prompt = `You are a divergent ideation agent using ADHD Skill techniques.

Pain Point: ${painPoint}
Context: ${context}

Generate 30+ solution ideas across 6+ cognitive frames:
1. Automation frame (reduce manual work)
2. Integration frame (connect existing tools)
3. Community frame (peer solutions)
4. Market frame (existing products)
5. Novel frame (new approaches)
6. AI frame (AI-powered solutions)

For each idea: novelty score (1-10), feasibility (1-10), market demand (1-10)

Detect traps: over-engineering, scope creep, false assumptions.

Output JSON: solutions[{idea, frame, novelty, feasibility, demand, trap}]`;

    const response = await client.messages.create({
      model: this.model,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      agent: this.name,
      painPoint,
      ideaCount: 30,
      solutions: response.content[0].type === 'text' ? response.content[0].text : null,
      timestamp: new Date().toISOString(),
    };
  }
}

class ValidatorAgent {
  constructor() {
    this.name = 'Validator Agent';
    this.model = 'claude-3-5-sonnet-20241022';
  }

  async scoreLead(lead, solutions) {
    const prompt = `You are a lead quality validator.

Lead: ${JSON.stringify(lead)}
Proposed Solutions: ${solutions}

Score on:
1. Relevance to pain point (0-100)
2. Market demand (0-100)
3. Solution viability (0-100)
4. Provider fit (0-100)
5. Timeline urgency (0-100)

Output JSON: {
  leadId,
  scores: {relevance, demand, viability, fit, urgency},
  overallScore,
  confidence,
  recommendation: 'route'|'refine'|'reject',
  reasoning
}`;

    const response = await client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      agent: this.name,
      lead,
      validation: response.content[0].type === 'text' ? response.content[0].text : null,
      timestamp: new Date().toISOString(),
    };
  }
}

class MatcherAgent {
  constructor() {
    this.name = 'Matcher Agent';
    this.model = 'claude-3-5-sonnet-20241022';
  }

  async matchProviders(lead, solutions, candidates) {
    const prompt = `You are a provider matching specialist.

Lead Requirements: ${JSON.stringify(lead)}
Validated Solutions: ${solutions}
Provider Candidates: ${JSON.stringify(candidates)}

Match scoring:
1. Solution overlap (0-100)
2. Provider experience (0-100)
3. Geographic fit (0-100)
4. Budget alignment (0-100)
5. Timeline match (0-100)

Output JSON: {
  leadId,
  matches: [{
    provider,
    matchScore,
    reasoning,
    contactEmail,
    nextSteps
  }],
  primaryMatch,
  alternates[]
}`;

    const response = await client.messages.create({
      model: this.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      agent: this.name,
      lead,
      matches: response.content[0].type === 'text' ? response.content[0].text : null,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = {
  RedditScoutAgent,
  BrainstormAgent,
  ValidatorAgent,
  MatcherAgent,
};
