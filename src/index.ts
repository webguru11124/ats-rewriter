import { Project } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

function transformFile(filePath: string, entityName: string, outputDirectory: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  console.log(sourceFile);
  // Function to rename nodes containing 'Entity' or 'entities'
  function renameNodes(node: any) {
    console.log(node.getKindName(), node.getText())
    if (node.getKindName() === 'FunctionDeclaration' || node.getKindName() === 'FunctionExpression') {
      const text = node.getText();
      if (text.includes('Entity') || text.includes('entities')) {
        node.rename(`Renamed${entityName}`);
      }
    } else if (node.getKindName() === 'StringLiteral') {
      const updatedText = node.getText().replace(/Entity|entities/g, entityName);
      node.replaceWithText(`"${updatedText}"`);
    }

    node.getChildren().forEach(renameNodes);
  }

  // Rename nodes in the AST
  renameNodes(sourceFile);

  // Save the modified source file
  sourceFile.saveSync();
  const outputFilePath = path.join(outputDirectory, path.basename(filePath).replace('Entity', entityName));
  fs.copyFileSync(filePath, outputFilePath);
}

const inputDirectory = 'input';
const outputDirectory = 'output';
const entityName = 'Renamed';

// Read all .tsx files in the input directory and transform them
const files = fs.readdirSync(inputDirectory);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(inputDirectory, file);
    transformFile(filePath, entityName, outputDirectory);
  }
}
