import {Command} from 'commander';
import {generateDirectoryTree, printDirectoryTree} from "../core/directoryTree";
import {aggregateFiles, mergeContent} from "../core/fileAggregator";
import {getCodeStats} from "../core/codeStats";
import * as fs from 'fs';

export function setupCommands(program: Command): void {
    program
        .command('gen')
        .description('Generate single text file from the given directory')
        .argument('<directory>', 'Path to your codebase directory')
        .option('--strip-comments', 'Strip comments from the code')
        .option('--remove-blank-lines', 'Remove blank lines from the code')
        .option('--respect-gitignore', 'Respect .gitignore rules')
        .option('-min', 'Apply --strip-comments, --remove-blank-lines, and --respect-gitignore')

        .option('-o, --output <file>', 'Output file path')
        .action(async (directory, options) => {
            try {
                const aggregateOptions = {
                    stripComments: options.min || options.stripComments || false,
                    removeBlankLines: options.min || options.removeBlankLines || false,
                    respectGitignore: options.min || options.respectGitignore || false
                };

                const directoryTree = generateDirectoryTree(directory);
                const treeOutput = printDirectoryTree(directoryTree);
                const aggregatedFiles = aggregateFiles(directory, aggregateOptions);
                const mergedContent = mergeContent(aggregatedFiles, directory);
                const finalContent = `${treeOutput}\n\n${mergedContent}`;
                const stats = getCodeStats(finalContent);

                const output = `${finalContent}\nCode Statistics:\n${JSON.stringify(stats, null, 2)}`;

                console.log("options", options);

                if (options.output) {
                    fs.writeFileSync(options.output, output);
                    console.log(`Output written to ${options.output}`);
                } else {
                    console.log(output);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
}
