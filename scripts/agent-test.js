#!/usr/bin/env node

const {
  RedditScoutAgent,
  BrainstormAgent,
  ValidatorAgent,
  MatcherAgent,
} = require('./agents');

async function testAgents() {
  console.log('🚀 BulkDirect Agent Test\n');

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY not set in .env');
    process.exit(1);
  }

  try {
    // Test Reddit Scout
    console.log('1️⃣ Reddit Scout Agent');
    const scout = new RedditScoutAgent();
    const painPoints = await scout.discoverPainPoints('startups', 'payment processing');
    console.log('✅ Pain points discovered:', painPoints.subreddit);
    console.log('Analysis:', painPoints.analysis?.substring(0, 200) + '...\n');

    // Test Brainstorm
    console.log('2️⃣ Brainstorm Agent (ADHD Skill)');
    const brainstorm = new BrainstormAgent();
    const solutions = await brainstorm.generateSolutions(
      'Payment processing complexity',
      'SaaS startups with 10-50 employees'
    );
    console.log('✅ Solutions generated:', solutions.ideaCount);
    console.log('Ideas:', solutions.solutions?.substring(0, 200) + '...\n');

    // Test Validator
    console.log('3️⃣ Validator Agent');
    const validator = new ValidatorAgent();
    const lead = {
      id: 'LEAD_001',
      company: 'TechStartup Inc',
      painPoint: 'Payment processing',
      budget: '$5000-10000',
      timeline: '30 days',
    };
    const validation = await validator.scoreLead(lead, solutions.solutions);
    console.log('✅ Lead validated');
    console.log('Score:', validation.validation?.substring(0, 200) + '...\n');

    // Test Matcher
    console.log('4️⃣ Matcher Agent');
    const matcher = new MatcherAgent();
    const candidates = [
      { id: 'PROVIDER_A', name: 'PaymentPro', experience: '5 years' },
      { id: 'PROVIDER_B', name: 'QuickPay', experience: '3 years' },
    ];
    const matches = await matcher.matchProviders(lead, solutions.solutions, candidates);
    console.log('✅ Providers matched');
    console.log('Matches:', matches.matches?.substring(0, 200) + '...\n');

    console.log('✅ All agents tested successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAgents();
