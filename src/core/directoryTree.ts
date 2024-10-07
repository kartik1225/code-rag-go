import { FileSystemNode, loadGitignore, traverseFileSystem } from '../utils/fileSystem';

export function generateDirectoryTree(directory: string): FileSystemNode {
    const ig = loadGitignore(directory);
    return traverseFileSystem(directory, ig);
}

export function printDirectoryTree(tree: FileSystemNode): string {
    return tree.name + '\n' + printDirectoryTreeHelper(tree, '');
}

function printDirectoryTreeHelper(node: FileSystemNode, prefix: string): string {
    if (!node.children || node.children.length === 0) return '';

    let result = '';
    const childrenCount = node.children.length;

    node.children.forEach((child, index) => {
        const isLast = index === childrenCount - 1;
        const newPrefix = prefix + (isLast ? '    ' : '│   ');

        result += `${prefix}${isLast ? '└── ' : '├── '}${child.name}\n`;

        if (child.children && child.children.length > 0) {
            result += printDirectoryTreeHelper(child, newPrefix);
        }
    });

    return result;
}
