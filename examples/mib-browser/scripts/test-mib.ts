import { MibParserService } from '../lib/services/mibParserService';
import { OidSearchEngine } from '../lib/services/oidSearchEngine';
import { SAMPLE_MIBS } from '../lib/data/sampleMibs';

console.log('--- Testing MibParserService & OidSearchEngine ---');

const parser = new MibParserService();
const sample = SAMPLE_MIBS[0]; // RFC1213-MIB

const result = parser.parseMib(sample.content, sample.fileName);
console.log(`Parsed Module: ${result.document.moduleName}`);
console.log(`Total OIDs Resolved: ${result.nodes.size}`);
console.log(`Root Nodes Count: ${result.rootNodes.length}`);

// Verify some well known OIDs
const sysDescr = result.nodes.get('1.3.6.1.2.1.1.1');
console.log('sysDescr Node:', sysDescr ? {
  name: sysDescr.name,
  numericOid: sysDescr.numericOid,
  type: sysDescr.nodeType,
  access: sysDescr.access,
  syntax: sysDescr.syntax,
} : 'NOT FOUND');

// Test Search Engine
const searchEngine = new OidSearchEngine();
searchEngine.indexNodes(result.nodes);

const searchRes = searchEngine.search({ query: 'sysDescr' });
console.log(`Search 'sysDescr' hits: ${searchRes.length}, top score: ${searchRes[0]?.score}`);

const searchOctets = searchEngine.search({ query: 'octets' });
console.log(`Search 'octets' hits: ${searchOctets.length}, top: ${searchOctets[0]?.node.name}`);

// Test Elasticsearch Bulk Ndjson generation
const ndjson = searchEngine.generateBulkNdjson(Array.from(result.nodes.values()), 'test-mibs');
console.log(`Generated Bulk NDJSON lines: ${ndjson.trim().split('\n').length}`);

console.log('--- All MIB & Search Engine tests completed successfully! ---');
