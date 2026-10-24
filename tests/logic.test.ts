import {test} from 'node:test';
import assert from 'node:assert/strict';
import {opportunities} from '../src/data.ts';
import {filterItems,active,readSaved,safeUrl,webSearchUrl} from '../src/logic.ts';

test('item search intersects with city and category filters',()=>{
 assert.equal(filterItems(opportunities,'coats','Detroit','Clothing')[0]?.id,'det-capuchin');
 assert.equal(filterItems(opportunities,'coats','Flint','Clothing').length,0);
 assert.equal(filterItems(opportunities,'  DIAPERS ','Detroit','Baby & Kids')[0]?.id,'det-capuchin');
 assert.equal(filterItems(opportunities,'','Pontiac','Furniture')[0]?.id,'pon-ccrt');
 assert.equal(filterItems(opportunities,'unfindable','','').length,0);
 assert.equal(filterItems(opportunities,'','','').length,opportunities.length);
});
test('cleaning products are searchable without implying other organizations accept them',()=>{
 assert.equal(filterItems(opportunities,'detergent','Pontiac','Cleaning Products')[0]?.id,'pon-grace-cleaning');
 assert.equal(filterItems(opportunities,'dish soap','','Cleaning Products').length,1);
 assert.equal(filterItems(opportunities,'detergent','','Hygiene').length,0);
 assert.equal(filterItems(opportunities,'','Detroit','Cleaning Products').some(i=>i.id==='det-capuchin'),false);
});
test('organization names, city names, and additional categories can be searched',()=>{
 assert.equal(filterItems(opportunities,'NSO','','')[0]?.id,'det-nso');
 assert.equal(filterItems(opportunities,'Flint','','').length,2);
 assert.equal(filterItems(opportunities,'calculators','Pontiac','School Supplies')[0]?.id,'pon-grace-family');
 assert.equal(filterItems(opportunities,'carriage town','Flint','Food').length,1);
});
test('every real listing has a source, a checked date, and unique ID',()=>{
 assert.equal(new Set(opportunities.map(i=>i.id)).size,opportunities.length);
 for(const item of opportunities){assert.equal(item.demo,false);assert.ok(safeUrl(item.sourceUrl));assert.match(item.dateChecked||'',/^\d{4}-\d{2}-\d{2}$/);}
 for(const city of ['Detroit','Pontiac','Flint']) assert.ok(opportunities.some(i=>i.city===city));
});
test('external web search includes the current item and city with proper encoding',()=>{
 const url=new URL(webSearchUrl('soap & cleaner','Pontiac','Cleaning Products'));
 assert.equal(url.origin,'https://www.google.com');
 assert.ok(url.searchParams.get('q')?.includes('soap & cleaner donation nonprofit Pontiac'));
 assert.ok(new URL(webSearchUrl('','','Furniture')).searchParams.get('q')?.includes('Furniture'));
});
test('expired requests are hidden while expiration day remains active',()=>{
 const item={...opportunities[0],listingType:'current request' as const,expiresOn:'2026-10-23'};
 assert.equal(active(item,'2026-10-23'),true);
 assert.equal(active(item,'2026-10-24'),false);
 assert.equal(filterItems([item],'','','','2026-10-24').length,0);
 assert.equal(active({...item,listingType:'ongoing acceptance'},'2026-10-24'),true);
});
test('bookmarks round-trip; corrupted storage and unsafe links fail safely',()=>{
 assert.deepEqual(readSaved(JSON.stringify(['det-nso','pon-ccrt'])),['det-nso','pon-ccrt']);
 assert.deepEqual(readSaved('bad data'),[]);
 assert.deepEqual(readSaved('{"id":1}'),[]);
 assert.deepEqual(readSaved('["a",2,"a"]'),['a']);
 assert.equal(safeUrl('javascript:alert(1)'),undefined);
 assert.equal(safeUrl(),undefined);
 assert.equal(safeUrl('https://example.org'),'https://example.org/');
});
