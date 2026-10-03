/**
 * BulkDirect Reddit Extractor
 * Hyper-Extract inspired pattern matching for Reddit content parsing
 */

class RedditExtractor {
  constructor(options = {}) {
    this.patterns = {
      painPoint: /(?:looking for|need|sourcing|can't find|supplier|vendor|purchasing|sourcing|looking to buy)/gi,
      volumeIndicator: /(?:\d+\s*(?:units?|pieces?|bulk|order|qty|items?)|bulk\s*order|wholesale|monthly)/gi,
      urgency: /(?:asap|urgent|immediately|soon|this week|next week|rush|fast)/gi,
      specification: /(?:requires?|needs?|must have|specifications?|specs|requirement)/gi
    };
    this.confidenceWeights = options.confidenceWeights || this.defaultWeights();
  }

  defaultWeights() {
    return {
      explicitPainPoint: 0.85,
      impliedPainPoint: 0.65,
      volumeIndicator: 0.20,
      urgency: 0.15,
      contextualMatch: 0.25
    };
  }

  /**
   * Extract structured data from Reddit thread
   */
  extractThread(thread) {
    const title = thread.title || '';
    const content = thread.selftext || '';
    const fullText = `${title} ${content}`;

    const extraction = {
      title,
      threadUrl: thread.url,
      author: thread.author,
      created: thread.created_utc,
      subreddit: thread.subreddit,
      score: thread.score,
      comments: thread.num_comments,
      content: content.substring(0, 500), // First 500 chars
      extracted: {
        painPoints: this._extractPainPoints(fullText),
        volumeIndicators: this._extractVolumes(fullText),
        urgencySignals: this._extractUrgency(fullText),
        specifications: this._extractSpecs(fullText)
      },
      confidence: this._calculateConfidence(fullText),
      metadata: {
        wordCount: content.split(/\s+/).length,
        hasLinks: /https?:\/\//.test(content),
        hasNumbers: /\d+/.test(content)
      }
    };

    return extraction;
  }

  /**
   * Extract pain point indicators
   */
  _extractPainPoints(text) {
    const matches = text.match(this.patterns.painPoint);
    return matches ? [...new Set(matches.map(m => m.toLowerCase()))] : [];
  }

  /**
   * Extract volume indicators
   */
  _extractVolumes(text) {
    const matches = text.match(this.patterns.volumeIndicator);
    return matches ? [...new Set(matches)] : [];
  }

  /**
   * Extract urgency signals
   */
  _extractUrgency(text) {
    const matches = text.match(this.patterns.urgency);
    return matches ? [...new Set(matches.map(m => m.toLowerCase()))] : [];
  }

  /**
   * Extract specifications
   */
  _extractSpecs(text) {
    const matches = text.match(this.patterns.specification);
    return matches ? [...new Set(matches.map(m => m.toLowerCase()))] : [];
  }

  /**
   * Calculate confidence score
   */
  _calculateConfidence(fullText) {
    let score = 0;

    // Pain point signals
    if (this.patterns.painPoint.test(fullText)) {
      score += this.confidenceWeights.explicitPainPoint;
    }

    // Volume indicators
    if (this.patterns.volumeIndicator.test(fullText)) {
      score += this.confidenceWeights.volumeIndicator;
    }

    // Urgency signals
    if (this.patterns.urgency.test(fullText)) {
      score += this.confidenceWeights.urgency;
    }

    // Specification details
    if (this.patterns.specification.test(fullText)) {
      score += this.confidenceWeights.contextualMatch;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Batch extract from multiple threads
   */
  extractBatch(threads) {
    return threads.map(thread => this.extractThread(thread));
  }

  /**
   * Filter extracted data by confidence threshold
   */
  filterByConfidence(extractions, threshold = 0.65) {
    return extractions.filter(ext => ext.confidence >= threshold);
  }

  /**
   * Format extraction to lead format
   */
  toLeadFormat(extraction) {
    return {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      subreddit: extraction.subreddit,
      threadUrl: extraction.threadUrl,
      title: extraction.title,
      context: extraction.content,
      painPoint: extraction.extracted.painPoints.join(', ') || 'Sourcing/Supplier Request',
      supplier_type: this._inferSupplierType(extraction.extracted),
      volume_indicator: extraction.extracted.volumeIndicators.join(', ') || 'Not specified',
      urgency: this._calculateUrgency(extraction.extracted.urgencySignals),
      confidence: extraction.confidence,
      metadata: extraction.metadata,
      sourceUrl: extraction.threadUrl,
      timestamp: new Date(extraction.created * 1000).toISOString()
    };
  }

  /**
   * Infer supplier type from extraction
   */
  _inferSupplierType(extracted) {
    const text = `${extracted.painPoints.join()} ${extracted.specifications.join()}`.toLowerCase();

    if (text.includes('manufacturing') || text.includes('bulk')) return 'Manufacturer';
    if (text.includes('wholesale') || text.includes('distributor')) return 'Distributor';
    if (text.includes('shipping') || text.includes('logistics')) return 'Logistics Provider';
    if (text.includes('software') || text.includes('saas')) return 'Software Provider';

    return 'General Supplier';
  }

  /**
   * Calculate urgency from signals
   */
  _calculateUrgency(urgencySignals) {
    if (urgencySignals.length === 0) return 'low';
    if (urgencySignals.some(s => s.includes('asap') || s.includes('urgent'))) return 'high';
    if (urgencySignals.some(s => s.includes('soon'))) return 'medium';
    return 'low';
  }
}

module.exports = RedditExtractor;
