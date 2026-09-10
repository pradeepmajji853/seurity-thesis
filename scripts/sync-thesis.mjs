import {readFile,writeFile} from 'node:fs/promises';
const source=await readFile(new URL('../research/thesis.md',import.meta.url),'utf8');
const sections=source.split(/^## /m).slice(1).map(block=>{const [title,...body]=block.split('\n');return {id:title.toLowerCase().replaceAll(' ','-'),title,paragraphs:body.join('\n').trim().split(/\n\s*\n/).map(p=>p.trim())}});
await writeFile(new URL('../lib/thesis.json',import.meta.url),JSON.stringify(sections,null,2)+'\n');
await writeFile(new URL('../public/research-thesis.md',import.meta.url),source);
console.log(`Synchronized ${sections.length} thesis sections.`);
