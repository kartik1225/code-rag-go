# Code Rag Go

CLI tool that serves as an on-the-go RAG (Retrieval-Augmented Generation) system for your codebase. It quickly generates a single text file containing your entire code context, optimized for use with Large Language Models (LLMs) like Claude and ChatGPT.

## Key Features

- **Quick Context Generation**: Rapidly create a comprehensive text representation of your entire codebase.
- **.gitignore Respect**: Automatically excludes files and directories specified in your .gitignore file.
- **Comment Stripping**: Option to remove comments from code for a cleaner context.
- **Blank Line Removal**: Ability to eliminate blank lines to reduce noise.
- **Directory Tree**: Includes a visual representation of your project structure.
- **Code Statistics**: Provides insightful stats about your codebase.
- **Flexible Output**: Choose between console output or saving to a file.

## Usage

Install globally:
```
npm install -g code-context-generator
```

Or use with npx:
```
npx code-context-generator generate <directory> [options]
```

### Command

```
crg generate <directory> [options]
```

### Options

- `-s, --strip-comments`: Strip comments from the code
- `-b, --remove-blank-lines`: Remove blank lines from the code
- `-g, --respect-gitignore`: Respect .gitignore rules (default: true)
- `-m, --min`: Apply all of the above options
- `-o, --output <file>`: Specify an output file path

### Example

```
crg generate ./my-project -m -o project_context.txt
```

This command will generate a context file for the `./my-project` directory, stripping comments, removing blank lines, respecting .gitignore rules, and saving the output to `project_context.txt`.

## Use Cases

- Quickly share your project context with LLMs for code reviews or suggestions.
- Generate a comprehensive overview of your project for documentation purposes.
- Analyze your codebase structure and statistics in a single view.
- Prepare your code for AI-assisted debugging or refactoring sessions.

Get started now and enhance your coding experience with AI-powered insights!
