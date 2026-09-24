import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../build', import.meta.url));
const externalReactCall =
  /\(\s*["'](?:react(?:\/jsx(?:-dev)?-runtime)?|react-dom(?:\/client)?)["']\s*\)/;
const files = [];

async function collectJavaScript(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectJavaScript(path);
    } else if (extname(entry.name) === '.js') {
      files.push(path);
    }
  }
}

await collectJavaScript(outputDirectory);

if (files.length === 0) {
  throw new Error('The Vite build did not emit any JavaScript assets.');
}

for (const file of files) {
  const source = await readFile(file, 'utf8');

  if (externalReactCall.test(source)) {
    throw new Error(
      `${relative(outputDirectory, file)} contains a browser-incompatible React require.`
    );
  }
}

console.log(`Verified ${files.length} browser JavaScript asset(s).`);
