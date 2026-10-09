/**
 * BulkDirect 4-Agent Swarm Orchestrator
 * Coordinates Reddit Scout, Brainstorm, Validator, and Matcher agents
 * in parallel for efficient lead generation and provider matching.
 */

const {
  RedditScoutAgent,
  BrainstormAgent,
  ValidatorAgent,
  MatcherAgent
} = require('./agents');
const DataProcessor = require('./data-processor');

class SwarmOrchestrator {
  constructor(config = {}) {
    this.config = {
      redditSubreddits: ['r/smallbusiness', 'r/entrepreneur', 'r/manufacturing', 'r/procurement'],
      batchSize: 50,
      confidenceThreshold: 0.75,
      ...config
    };
    this.agents = {};
    this.leads = [];
    this.routes = [];
  }

  /**
   * Initialize all four agents
   */
  async initialize() {
    this.agents.redditScout = new RedditScoutAgent(this.config);
    this.agents.brainstorm = new BrainstormAgent(this.config);
    this.agents.validator = new ValidatorAgent(this.config);
    this.agents.matcher = new MatcherAgent(this.config);

    console.log('✓ 4-Agent Swarm initialized');
  }

  /**
   * Run complete swarm cycle: Scout → Brainstorm → Validate → Match
   */
  async runSwarmCycle() {
    console.log('🚀 Starting BulkDirect swarm cycle...\n');

    try {
      // Phase 1: Reddit Scout - Discover pain points
      console.log('📍 Phase 1: Reddit Scout - Discovering pain points...');
      const painPoints = await this.agents.redditScout.scanSubreddits(
        this.config.redditSubreddits
      );
      console.log(`Found ${painPoints.length} potential pain points\n`);

      // Phase 2: Brainstorm - Generate solutions (parallel frames)
      console.log('💡 Phase 2: Brainstorm Agent - Generating solutions...');
      const solutions = await Promise.all(
        painPoints.map(point =>
          this.agents.brainstorm.generateIdeas(point)
        )
      );
      const flatSolutions = this.flattenSolutions(solutions);
      console.log(`Generated ${flatSolutions.length} solution ideas\n`);

      // Phase 3: Validator - Score and filter
      console.log('✅ Phase 3: Validator - Scoring leads...');
      this.leads = await this.agents.validator.validateLeads(flatSolutions);
      const qualityLeads = this.leads.filter(l => l.confidence >= this.config.confidenceThreshold);
      console.log(`${qualityLeads.length} leads passed quality threshold (≥${this.config.confidenceThreshold})\n`);

      // Phase 4: Matcher - Route to providers
      console.log('🎯 Phase 4: Matcher - Routing to providers...');
      this.routes = await this.agents.matcher.matchAndRoute(qualityLeads);
      console.log(`Successfully routed ${this.routes.length} leads to providers\n`);

      return {
        painPoints,
        solutions,
        leads: qualityLeads,
        routes: this.routes,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Swarm cycle failed:', error);
      throw error;
    }
  }

  /**
   * Flatten multi-dimensional solution array
   */
  flattenSolutions(solutions) {
    // generateIdeas renvoie { painPointId, ideas: [...] } : on aplatit les idées,
    // pas les objets conteneurs (sinon on comptait 1 "idée" par pain point).
    const timestamp = new Date().toISOString();
    return solutions.flatMap(sol => {
      if (sol && Array.isArray(sol.ideas)) {
        return sol.ideas.map(idea => ({ ...idea, painPointId: sol.painPointId, timestamp }));
      }
      return sol ? [{ ...sol, timestamp }] : [];
    });
  }

  /**
   * Get current swarm status
   */
  getStatus() {
    return {
      leads: {
        total: this.leads.length,
        highConfidence: this.leads.filter(l => l.confidence >= 0.85).length,
        mediumConfidence: this.leads.filter(l => l.confidence >= 0.65 && l.confidence < 0.85).length,
        lowConfidence: this.leads.filter(l => l.confidence < 0.65).length
      },
      routes: {
        ready: this.routes.filter(r => r.status === 'ready').length,
        review: this.routes.filter(r => r.status === 'review_needed').length,
        blocked: this.routes.filter(r => r.status === 'blocked').length
      }
    };
  }

  /**
   * Generate report of latest cycle
   */
  generateReport() {
    const status = this.getStatus();
    const timestamp = new Date().toISOString();

    return {
      timestamp,
      summary: {
        totalLeads: status.leads.total,
        routableLeads: status.routes.ready,
        conversionRate: DataProcessor.safeDivide(status.routes.ready, status.leads.total)
      },
      breakdown: status,
      leads: this.leads,
      routes: this.routes
    };
  }
}

module.exports = SwarmOrchestrator;

// Lancement direct : npm run swarm
if (require.main === module) {
  (async () => {
    const swarm = new SwarmOrchestrator();
    await swarm.initialize();
    await swarm.runSwarmCycle();
    console.log(JSON.stringify(swarm.generateReport().summary, null, 2));
  })().catch(error => {
    console.error('Swarm failed:', error.message);
    process.exit(1);
  });
}
