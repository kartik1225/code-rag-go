#!/usr/bin/env node

import { Command } from 'commander';
import { setupCommands } from './commands';

const program = new Command();

program
    .name('cc')
    .description('CLI tool to generate context from your codebase')
    .version('1.0.0');

setupCommands(program);

program.parse(process.argv);
