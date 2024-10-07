import * as fs from 'fs';
import * as path from 'path';
import strip from 'strip-comments';
import { FileSystemNode, loadGitignore, traverseFileSystem } from '../utils/fileSystem';

interface AggregatedFile {
    filePath: string;
    content: string;
}

interface AggregateOptions {
    stripComments: boolean;
    removeBlankLines: boolean;
    respectGitignore: boolean;
}

function removeBlankLines(content: string): string {
    return content.split('\n').filter(line => line.trim() !== '').join('\n');
}

export function aggregateFiles(directory: string, options: AggregateOptions): AggregatedFile[] {
    const aggregatedFiles: AggregatedFile[] = [];
    const ig = loadGitignore(directory);
    const fileSystem = traverseFileSystem(directory, ig);

    function processNode(node: FileSystemNode) {
        if (node.type === 'file') {
            try {
                let content = fs.readFileSync(node.path, 'utf8');
                if (options.stripComments) {
                    content = strip(content);
                }
                if (options.removeBlankLines) {
                    content = removeBlankLines(content);
                }
                aggregatedFiles.push({ filePath: node.path, content });
            } catch (error) {
                console.error(`Error reading file ${node.path}:`, error);
            }
        } else if (node.type === 'directory' && node.children) {
            node.children.forEach(processNode);
        }
    }

    processNode(fileSystem);
    return aggregatedFiles;
}

export function mergeContent(aggregatedFiles: AggregatedFile[], baseDirectory: string): string {
    return aggregatedFiles.map(file => {
        const relativePath = path.relative(baseDirectory, file.filePath);
        const startSeparator = `\n--- start of ${relativePath} ---\n`;
        const endSeparator = `\n--- end of ${relativePath} ---\n`;
        return `${startSeparator}${file.content}${endSeparator}`;
    }).join('');
}
