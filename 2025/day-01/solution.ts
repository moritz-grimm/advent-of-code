import { readFileSync } from "node:fs";
import { createLogger } from "utils/logger";

function solvePart1(input: string): number {
    const logger = createLogger(false);
    let count = 0;
    let dial = 50;
    const instructions = input
        .trim()
        .split(/\s+/)
        .map(line => {
            const dir = line[0];
            const value = parseInt(line.slice(1), 10);
            return { dir, value };
        });

    for (const instruction of instructions) {
        if (instruction.dir === "R") {
            logger.log("Spinning Right");
            logger.log("Instruction Value: " + instruction.value);
            logger.log("Dial before 'R': " + dial);
            dial = (dial + instruction.value) % 100;
            logger.log("Dial after 'R': " + dial);
        } else {
            logger.log("Spinning Left");
            logger.log("Instruction Value: " + instruction.value);
            logger.log("Dial before 'L': " + dial);
            dial = (dial - instruction.value + 100) % 100;
            logger.log("Dial after 'L': " + dial);
        }

        logger.log();

        if (dial === 0) {
            count++;
        }
    }

    return count;
}

function solvePart2(input: string): number {
    const logger = createLogger(false);
    let count = 0;
    let dial = 50;
    const instructions = input
        .trim()
        .split(/\s+/)
        .map(line => {
            const dir = line[0];
            const value = parseInt(line.slice(1), 10);
            return { dir, value };
        });

    return count;
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 1: " + solvePart1(input));
console.log("Result Part 2: " + solvePart2(input));
