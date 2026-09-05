import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(dir+'/'+e.name):dir+'/'+e.name))).flat();}
const files=(await walk('dist')).filter(f=>!f.endsWith('/sw.js')).sort();
const manifest=JSON.parse(await readFile('dist/manifest.webmanifest','utf8'));
const base=manifest.scope || '/';
const hash=createHash('sha256');let bytes=0;for(const f of files){const b=await readFile(f);hash.update(b);bytes+=b.length;}
const template=await readFile('scripts/sw-template.js','utf8');
hash.update(template);
const version='possiblecooker-'+hash.digest('hex').slice(0,16);const urls=files.map(f=>`${base}${f.slice(5)}`);
await writeFile('dist/sw.js',template.replace('__CACHE__',JSON.stringify(version)).replace('__ASSETS__',JSON.stringify(urls)).replace('__INDEX__',JSON.stringify(`${base}index.html`)));
console.log('Offline cache:',version,urls.length,'files',bytes,'bytes');
