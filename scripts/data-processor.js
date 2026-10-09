/**
 * BulkDirect Data Processor
 * Utilities for lead data processing, validation, and export
 */

class DataProcessor {
  /**
   * Batch process leads with validation
   */
  static processBatch(leads, options = {}) {
    const {
      confidenceThreshold = 0.65,
      deduplicateBy = 'url'
    } = options;

    return leads
      .filter(lead => lead.confidence >= confidenceThreshold)
      .filter((lead, index, self) => {
        // Deduplication
        return index === self.findIndex(l => l[deduplicateBy] === lead[deduplicateBy]);
      })
      .sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Format lead for provider contact
   */
  static formatLeadForProvider(lead, provider) {
    return {
      leadId: lead.id,
      provider: provider.name,
      summary: lead.painPoint,
      requirements: lead.specifications,
      volume: lead.volumeIndicator,
      urgency: lead.urgency,
      confidenceScore: lead.confidence,
      // sourceUrl volontairement absent : donnée interne (cf. sanitizeForExternal)
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate performance metrics
   */
  static calculateMetrics(leads, routes) {
    const totalLeads = leads.length;
    const routedLeads = routes.filter(r => r.status === 'ready').length;
    const avgConfidence = DataProcessor.safeDivide(
      leads.reduce((sum, l) => sum + (Number(l.confidence) || 0), 0),
      totalLeads
    );

    return {
      totalProcessed: totalLeads,
      successfulRoutes: routedLeads,
      successRate: DataProcessor.safeDivide(routedLeads, totalLeads),
      averageConfidence: avgConfidence,
      distribution: {
        high: leads.filter(l => l.confidence >= 0.85).length,
        medium: leads.filter(l => l.confidence >= 0.65 && l.confidence < 0.85).length,
        low: leads.filter(l => l.confidence < 0.65).length
      }
    };
  }

  /**
   * Export leads to CSV
   */
  static exportToCSV(leads) {
    const headers = ['ID', 'Pain Point', 'Confidence', 'Urgency', 'Volume', 'Status', 'URL'];
    const rows = leads.map(lead => [
      lead.id,
      lead.painPoint,
      Number.isFinite(lead.confidence) ? lead.confidence.toFixed(2) : '',
      lead.urgency,
      lead.volumeIndicator,
      lead.status,
      lead.sourceUrl
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.map(DataProcessor.escapeCsvCell).join(','))
    ].join('\n');
  }

  /**
   * Échappe une cellule CSV : guillemets doublés + neutralisation des formules
   * (=, +, -, @, tab, CR) pour bloquer l'injection dans Excel / Sheets.
   */
  static escapeCsvCell(value) {
    let text = value === null || value === undefined ? '' : String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  /**
   * Division sans NaN / Infinity : renvoie 0 si le dénominateur est nul.
   */
  static safeDivide(a, b) {
    return b > 0 ? a / b : 0;
  }

  /**
   * Sanitize lead data for external sharing
   */
  static sanitizeForExternal(lead) {
    const { id, painPoint, specifications, urgency, volumeIndicator, confidence } = lead;

    return {
      leadId: id,
      painPoint,
      specifications,
      urgency,
      volumeIndicator,
      confidence,
      // Remove internal fields
      sourceUrl: undefined,
      internalNotes: undefined
    };
  }
}

module.exports = DataProcessor;
