interface CodeStats {
    totalSize: string;
    totalLines: number;
    totalWords: number;
    totalCharacters: number;
    averageWordsPerLine: number;
    averageCharactersPerWord: number;
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getCodeStats(content: string): CodeStats {
    const lines = content.split('\n');
    const words = content.split(/\s+/).filter(word => word.length > 0);

    const stats: CodeStats = {
        totalSize: formatBytes(Buffer.byteLength(content, 'utf8')),
        totalLines: lines.length,
        totalWords: words.length,
        totalCharacters: content.length,
        averageWordsPerLine: words.length / lines.length,
        averageCharactersPerWord: content.length / words.length
    };

    return stats;
}

export function formatCodeStats(stats: CodeStats): string {
    return `
Code Statistics:
----------------
Total Size: ${stats.totalSize}
Total Lines: ${stats.totalLines}
Total Words: ${stats.totalWords}
Total Characters: ${stats.totalCharacters}
Average Words per Line: ${stats.averageWordsPerLine.toFixed(2)}
Average Characters per Word: ${stats.averageCharactersPerWord.toFixed(2)}
`;
}

// Example usage:
// const content = "Your aggregated code content here...";
// const stats = getCodeStats(content);
// console.log(formatCodeStats(stats));
