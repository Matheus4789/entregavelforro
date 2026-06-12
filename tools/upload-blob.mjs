import { put } from '@vercel/blob';
import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';

// Aulas na ordem 01 -> 09 (id usado no index.html : arquivo local)
const FILES = [
  ['ini01', 'aulas-iniciante/Iniciante01-Passo Básico.mp4'],
  ['ini02', 'aulas-iniciante/Iniciante02-Abraço.mp4'],
  ['ini03', 'aulas-iniciante/Iniciante03 - Giro Simples.mp4'],
  ['ini04', 'aulas-iniciante/Iniciante04 - Chuveirinho.mp4'],
  ['ini05', 'aulas-iniciante/Iniciante 05 - Chave de braço e Charme da Dama.mp4'],
  ['ini06', 'aulas-iniciante/Iniciante 06 - Bom dia + Encaixe.mp4'],
  ['ini07', 'aulas-iniciante/Iniciante07 - Pião.mp4'],
  ['ini08', 'aulas-iniciante/Iniciante08 - Arco Íris + Giro em Linha.mp4'],
  ['ini09', 'aulas-iniciante/Iniciante09 - Giro em Linha.mp4'],
];

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('\n❌ Falta a variável BLOB_READ_WRITE_TOKEN.');
  console.error('   Rode:  BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxx" node tools/upload-blob.mjs\n');
  process.exit(1);
}

const result = {};
for (const [id, path] of FILES) {
  process.stdout.write(`↑ ${id}  ${basename(path)} ... `);
  try {
    const data = await readFile(path);
    const blob = await put(`aulas-iniciante/${id}.mp4`, data, {
      access: 'public',
      contentType: 'video/mp4',
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    result[id] = blob.url;
    console.log('OK');
    console.log(`   ${blob.url}`);
  } catch (e) {
    console.log('FALHOU');
    console.error(`   ${e.message}`);
    process.exit(1);
  }
}

await writeFile('tools/blob-urls.json', JSON.stringify(result, null, 2));
console.log('\n✅ Todos enviados. URLs salvas em tools/blob-urls.json');
