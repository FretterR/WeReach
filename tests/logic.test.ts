import {test} from 'node:test';
import assert from 'node:assert/strict';
import {opportunities} from '../src/data.ts';
import {filterItems,active,readSaved,safeUrl} from '../src/logic.ts';
test('search, city, category intersect and reset returns all opportunities',()=>{
 assert.equal(filterItems(opportunities,'coats','Detroit','Clothing').length,1);
 assert.equal(filterItems(opportunities,'coats','Flint','Clothing').length,0);
 assert.equal(filterItems(opportunities,'  DIAPERS ','Detroit','Baby & Kids').length,1);
 assert.equal(filterItems(opportunities,'','Pontiac','Furniture')[0].id,'pon-furniture');
 assert.equal(filterItems(opportunities,'unfindable','','').length,0);
 assert.equal(filterItems(opportunities,'','','').length,10);
});
test('cleaning supplies have a dedicated category and searchable items',()=>{
 assert.equal(filterItems(opportunities,'detergent','Pontiac','Cleaning Products')[0]?.id,'pon-cleaning');
 assert.equal(filterItems(opportunities,'dish soap','','Cleaning Products').length,1);
 assert.equal(filterItems(opportunities,'detergent','','Hygiene').length,0);
});
test('expired requests are hidden, including saved subsets, but expiration day stays active',()=>{
 const item={...opportunities.find(item=>item.id==='det-baby')!,expiresOn:'2026-10-23'};
 assert.equal(active(item,'2026-10-23'),true);
 assert.equal(active(item,'2026-10-24'),false);
 assert.equal(filterItems([item],'','','','2026-10-24').length,0);
 assert.equal(active({...item,listingType:'ongoing acceptance'},'2026-10-24'),true);
});
test('bookmark data round-trips and malformed storage is safe',()=>{
 assert.deepEqual(readSaved(JSON.stringify(['det-coats','pon-home'])),['det-coats','pon-home']);
 assert.deepEqual(readSaved('bad data'),[]);
 assert.deepEqual(readSaved('{"id":1}'),[]);
 assert.deepEqual(readSaved('["a",2,"a"]'),['a']);
});
test('unsafe and absent external links are not activated',()=>{
 assert.equal(safeUrl('javascript:alert(1)'),undefined);
 assert.equal(safeUrl(),undefined);
 assert.equal(safeUrl('https://example.org'),'https://example.org/');
});
