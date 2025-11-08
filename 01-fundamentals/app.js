const fs = require('fs');

const documentData = fs.readFileSync('README.md', 'utf8');

console.log(documentData);

const newDocumentData = documentData.replace(/Dolore/ig, 'NewLoremIpsum');

fs.writeFileSync('README_NEW.md', newDocumentData);