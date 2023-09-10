
import * as path from 'path';
import * as fs from 'fs';
import transformFile from './lib';

// Get inputDirectory, outputDirectory, and entityName from process arguments
const [, , inputDirectory, outputDirectory, entityName] = process.argv;

// Check if all required arguments are provided
if (!inputDirectory || !outputDirectory || !entityName) {
  console.error('Usage: node script.js inputDirectory outputDirectory entityName');
  process.exit(1);
}


// Read all .tsx files in the input directory and transform them
const files = fs.readdirSync(inputDirectory);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(inputDirectory, file);
    transformFile(filePath, entityName, outputDirectory);
  }
}
