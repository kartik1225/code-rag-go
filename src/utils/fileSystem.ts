import * as fs from 'fs';
import * as path from 'path';
import ignore, { Ignore } from 'ignore';

export interface FileSystemNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileSystemNode[];
}

export function loadGitignore(directory: string): Ignore {
    const ig = ignore().add('.git');  // Always ignore .git folder
    const gitignorePath = path.join(directory, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        ig.add(gitignoreContent);
    }
    return ig;
}

export function traverseFileSystem(directory: string, ig: Ignore): FileSystemNode {
    const stats = fs.statSync(directory);
    const node: FileSystemNode = {
        name: path.basename(directory),
        path: directory,
        type: stats.isDirectory() ? 'directory' : 'file'
    };

    if (stats.isDirectory()) {
        node.children = [];
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const relativePath = path.relative(directory, filePath);

            if (ig.ignores(relativePath)) {
                continue;
            }

            const childNode = traverseFileSystem(filePath, ig);
            if (childNode) {
                node.children.push(childNode);
            }
        }
    }

    return node;
}
