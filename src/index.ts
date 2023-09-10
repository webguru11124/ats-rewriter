
import * as path from 'path';
import * as fs from 'fs';
import express, { Request, Response } from 'express';
import { transformCode, transformFile } from './lib';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/rewrite', async (req: Request, res: Response) => {
  try {
    const data = transformCode(req.body.payload, req.body.entityName);
    res.json({ response: data });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while calling the backend API.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
    console.log(file, ":   successfuly converted!");
  }
}
