const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { execSync } = require('child_process');

const SRC_DIR = './src';
const TARGET_DIR = './build';
const TEMPLATE = './templates/main.html';

// TODO: For now, assuming flat structure to directory.
// TODO: Should copy over non-markdown assets, like images.
function main() {
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  const srcFiles = fs.readdirSync(SRC_DIR).filter((fn) => fn.endsWith('.md'));
  const srcPaths = srcFiles.map((fn) => path.join(SRC_DIR, fn));

  const names = srcFiles.map((fn) => fn.slice(0, -'.md'.length));

  const targetFiles = names.map((n) => `${n}.html`);
  const targetPaths = targetFiles.map((fn) => path.join(TARGET_DIR, fn));

  const contents = srcPaths.map((p) => execSync(`kramdown ${p}`));
  const template = fs.readFileSync(TEMPLATE).toString();

  assert(contents.length === names.length);
  assert(contents.length === targetFiles.length);

  for (let i = 0; i < contents.length; ++i) {
    const name = names[i];
    const content = contents[i];
    const targetPath = targetPaths[i];

    let html = template;
    html = html.replace('{{title}}', name);
    html = html.replace('{{content}}', content);

    fs.writeFileSync(targetPath, html);
  }
}

main();
