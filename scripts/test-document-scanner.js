/**
 * Test Document Scanner Agent
 * Demonstrates autonomous document extraction and lead enrichment
 */

const { DocumentScannerAgent } = require('./agents');

async function testDocumentScanner() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('    DOCUMENT SCANNER AGENT - TEST');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const scanner = new DocumentScannerAgent({
    confidenceThreshold: 0.75
  });

  // Mock validated leads from Validator
  const mockLeads = [
    {
      id: 'lead_001',
      summary: 'Manufacturing company needs bulk plastics supplier',
      confidence: 0.78,
      provider: 'Global Plastics Corp'
    },
    {
      id: 'lead_002',
      summary: 'E-commerce startup sourcing electronics components',
      confidence: 0.71,
      provider: 'ElectroTech Wholesale'
    },
    {
      id: 'lead_003',
      summary: 'Construction firm needs steel beam supplier',
      confidence: 0.82,
      provider: 'Steel Distribution Inc'
    }
  ];

  console.log(`📄 Scanning ${mockLeads.length} validated leads for documents...\n`);

  const enrichedLeads = await scanner.scanAndEnrichLeads(mockLeads);

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('    ENRICHMENT RESULTS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  enrichedLeads.forEach(lead => {
    console.log(`📊 Lead ID: ${lead.id}`);
    console.log(`   Summary: ${lead.summary}`);
    console.log(`   Original Confidence: ${(lead.original_confidence * 100).toFixed(1)}%`);
    console.log(`   Document Strength: ${(lead.document_strength * 100).toFixed(1)}%`);
    console.log(`   Enriched Confidence: ${(lead.enriched_confidence * 100).toFixed(1)}%`);
    console.log(`   Tier 1 Documents Found: ${lead.documents_found.tier_1.length}`);
    console.log(`   Tier 2 Documents Found: ${lead.documents_found.tier_2.length}`);
    console.log(`   Tier 3 Documents Found: ${lead.documents_found.tier_3.length}`);
    console.log(`   Ready for Matching: ${lead.ready_for_matching ? '✅ Yes' : '❌ No'}`);
    console.log('');
  });

  // Summary
  const readyCount = enrichedLeads.filter(l => l.ready_for_matching).length;
  const avgConfidenceBoost = enrichedLeads.reduce((sum, l) =>
    sum + (l.enriched_confidence - l.original_confidence), 0
  ) / enrichedLeads.length;

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('    SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✓ Leads Processed: ${enrichedLeads.length}`);
  console.log(`✓ Leads Ready for Matching: ${readyCount}/${enrichedLeads.length}`);
  console.log(`✓ Average Confidence Boost: +${(avgConfidenceBoost * 100).toFixed(1)}%`);
  console.log('\n✅ Document Scanner test completed successfully!\n');
}

testDocumentScanner().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
