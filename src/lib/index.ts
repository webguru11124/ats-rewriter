
import { Project, SourceFile } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

function transformFile(filePath: string, entityName: string, outputDirectory: string) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    // Clone the source file's content
    const sourceFileText = sourceFile.getFullText();

    // Create a new source file with the same content
    const sourceFileCopy = project.createSourceFile('temp.ts', sourceFileText, { overwrite: true });

    // Function to rename nodes containing 'Entity' or 'entities' in the copy
    function renameNodes(node: any) {
        if (node.getKindName() === 'FunctionDeclaration' || node.getKindName() === 'FunctionExpression' || node.getKindName() === 'Identifier') {
            const text = node.getText();
            if (text.includes('Entity') || text.includes('entities')) {
                const updatedText = node.getText().replace(/Entity|entities/g, entityName);
                node.replaceWithText(`${updatedText}`);
            }
        }

        node.getChildren().forEach(renameNodes);
    }

    // Rename nodes in the copy
    renameNodes(sourceFileCopy);

    // Save the modified copy to the output directory
    const outputFilePath = path.join(outputDirectory, path.basename(filePath).replace('Entity', entityName));
    fs.writeFileSync(outputFilePath, sourceFileCopy.getFullText());
}

export default transformFile;