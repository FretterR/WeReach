import type { Opportunity } from './data.ts';
export function active(item: Opportunity, today = new Date().toLocaleDateString('en-CA')) {
  const now = /^\d{4}-\d{2}-\d{2}$/.test(today) ? today : new Date().toISOString().slice(0,10);
  return item.listingType !== 'current request' || !item.expiresOn || item.expiresOn >= now;
}
export function filterItems(items: Opportunity[], search: string, city: string, category: string, today?: string) {
  const words = search.toLowerCase().replace(/[^a-z0-9& ]/g,' ').split(/\s+/).filter(Boolean);
  return items.filter(item => active(item,today) && (!city || item.city === city) && (!category || item.category === category || item.additionalCategories?.includes(category as Opportunity['category'])) && words.every(word => [item.title,item.organization,item.city,item.category,...(item.additionalCategories||[]),item.description,...item.acceptedItems,...item.keywords].join(' ').toLowerCase().includes(word)));
}
export function webSearchUrl(search: string, city: string, category: string) {
  const query = [search.trim() || category || 'useful items','donation nonprofit',city || 'Detroit Pontiac Flint','Michigan','accepted items'].join(' ');
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
export function readSaved(value: string | null): string[] {
  try { const data: unknown = JSON.parse(value || '[]'); return Array.isArray(data) ? [...new Set(data.filter((id): id is string => typeof id === 'string'))] : []; } catch { return []; }
}
export function safeUrl(value?: string) { try {const url = new URL(value || ''); return ['https:','http:'].includes(url.protocol) ? url.href : undefined;} catch {return undefined;} }
