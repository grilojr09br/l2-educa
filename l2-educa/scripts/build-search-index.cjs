const fs = require('fs');
const path = require('path');
const MiniSearch = require('minisearch');

const docsDir = path.join(__dirname, '../../DOCS');
const outputDir = path.join(__dirname, '../public');
const outputFile = path.join(outputDir, 'search-index.json');

const documents = [];

fs.readdirSync(docsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    documents.push({
      id: file,
      title: file.replace('.md', ''),
      content: content,
    });
  }
});

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title'],
});

miniSearch.addAll(documents);

fs.writeFileSync(outputFile, JSON.stringify(miniSearch.toJSON()));

console.log('Search index built successfully!');
