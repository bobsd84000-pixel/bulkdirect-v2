/**
 * BulkDirect Agency Agents Demo
 * Demonstrates complete 4-agent swarm cycle with autonomous decision-making
 */

const AgencyControl = require('./agency-control');

async function runDemo() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('    BULKDIRECT AGENCY AGENTS - AUTONOMOUS SWARM DEMO');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const agency = new AgencyControl({
    confidenceThreshold: 0.75,
    subreddits: ['r/smallbusiness', 'r/entrepreneur', 'r/manufacturing', 'r/procurement']
  });

  // Run demo cycle
  const cycleId = `demo-${Date.now()}`;
  console.log(`Starting Agency Cycle: ${cycleId}\n`);

  const result = await agency.executeCycle(cycleId);

  // Display Results
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    CYCLE RESULTS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  displayPhaseResults(result);
  displayFinalMetrics(result);
  displayAgencyStatus(agency);

  // Show detailed breakdown
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    DETAILED BREAKDOWN');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log('📊 Phase 1: Discovery');
  console.log(`   Pain Points Found: ${result.phases.discovery.painPoints}`);
  console.log(`   Avg Confidence: ${result.phases.discovery.avgConfidence.toFixed(2)}`);

  console.log('\n💡 Phase 2: Ideation (ADHD Skill - 6 Frames)');
  console.log(`   Total Ideas Generated: ${result.phases.ideation.totalIdeas}`);
  console.log(`   Novel Ideas (score > 0.75): ${result.phases.ideation.novelIdeas}`);
  console.log(`   Traps Detected: ${result.phases.ideation.trapsDetected.length}`);

  console.log('\n✅ Phase 3: Validation');
  console.log(`   Leads Scored: ${result.phases.validation.leadsScored}`);
  console.log(`   Contact Ready (≥0.75): ${result.phases.validation.contactReady}`);
  console.log(`   Under Review (0.65-0.74): ${result.phases.validation.underReview}`);
  console.log(`   Archived (<0.65): ${result.phases.validation.archived}`);

  console.log('\n🎯 Phase 4: Matching');
  console.log(`   Leads Routed: ${result.phases.matching.leadsRouted}`);
  console.log(`   Primary Matches: ${result.phases.matching.primaryMatches}`);
  console.log(`   Secondary Options: ${result.phases.matching.secondaryOptions}`);

  console.log('\n📈 Key Metrics');
  console.log(`   Success Rate: ${(result.results.successRate * 100).toFixed(1)}%`);
  console.log(`   Avg Confidence: ${result.results.avgConfidence.toFixed(2)}`);
  console.log(`   Execution Time: ${result.executionTimeMs}ms`);

  // Show agency learning
  console.log('\n🧠 Agency Learning Model');
  const status = agency.getStatus();
  console.log(`   Total Cycles Run: ${status.totalCycles}`);
  console.log(`   Avg Success Rate: ${(status.avgSuccessRate * 100).toFixed(1)}%`);
  console.log(`   Quality Trend (7d): ${status.qualityTrend.toFixed(2)}`);

  // Autonomous decisions made
  console.log('\n🤖 Autonomous Decisions Made');
  if (result.phases.discovery.painPoints < 20) {
    console.log('   ✓ Expanded subreddit search (low pain point count)');
  }
  if (result.phases.matching.leadsRouted < 20) {
    console.log('   ✓ Lowered validation threshold (below routing minimum)');
  }
  const highTraps = result.phases.ideation.trapsDetected.filter(t => t.severity === 'high');
  if (highTraps.length > 0) {
    console.log(`   ✓ Flagged ${highTraps.length} high-trap ideas for manual review`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════\n');

  return result;
}

function displayPhaseResults(result) {
  console.log('Phase Summary:');
  console.log('┌─────────────────┬──────────┬──────────────┐');
  console.log('│ Phase           │ Input    │ Output       │');
  console.log('├─────────────────┼──────────┼──────────────┤');
  console.log(`│ 1. Discovery    │  --      │ ${String(result.phases.discovery.painPoints).padEnd(12)} │`);
  console.log(`│ 2. Ideation     │ ${String(result.phases.discovery.painPoints).padEnd(8)} │ ${String(result.phases.ideation.totalIdeas).padEnd(12)} │`);
  console.log(`│ 3. Validation   │ ${String(result.phases.ideation.totalIdeas).padEnd(8)} │ ${String(result.phases.validation.contactReady).padEnd(12)} │`);
  console.log(`│ 4. Matching     │ ${String(result.phases.validation.contactReady).padEnd(8)} │ ${String(result.phases.matching.leadsRouted).padEnd(12)} │`);
  console.log('└─────────────────┴──────────┴──────────────┘');
}

function displayFinalMetrics(result) {
  console.log('\nFinal Metrics:');
  console.log(`┌─────────────────────────────────────────┐`);
  console.log(`│ Routable Leads      : ${String(result.results.routableLeads).padStart(25)} │`);
  console.log(`│ Success Rate        : ${(result.results.successRate * 100).toFixed(1).padStart(23)}% │`);
  console.log(`│ Avg Confidence      : ${result.results.avgConfidence.toFixed(2).padStart(25)} │`);
  console.log(`│ Novel Ideas Found   : ${String(result.results.topNovelIdeas).padStart(25)} │`);
  console.log(`│ Traps Detected      : ${String(result.results.trapsDetected).padStart(25)} │`);
  console.log(`└─────────────────────────────────────────┘`);
}

function displayAgencyStatus(agency) {
  const status = agency.getStatus();
  console.log('\nAgency Intelligence:');
  console.log(`┌──────────────────────────────────────────┐`);
  console.log(`│ Cycles Executed      : ${String(status.totalCycles).padStart(26)} │`);
  console.log(`│ Avg Success Rate     : ${(status.avgSuccessRate * 100).toFixed(1).padStart(24)}% │`);
  console.log(`│ 7-Day Quality Trend  : ${status.qualityTrend.toFixed(2).padStart(26)} │`);
  console.log(`└──────────────────────────────────────────┘`);
}

// Run the demo
runDemo().catch(error => {
  console.error('Demo failed:', error);
  process.exit(1);
});
