import { readFileSync } from "node:fs";
import { createLogger } from "utils/logger";

function solvePart1(input: string): number {
    const start = performance.now();
    const logger = createLogger(false);
    let count = 0;
    let dial = 50;
    const instructions = parseInput(input);

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

    const end = performance.now();
    console.log(`Runtime Part 1: ${(end - start).toFixed(2)} ms`);

    return count;
}

function solvePart2(input: string): number {
    const start = performance.now();
    const logger = createLogger(false);
    let count = 0;
    let dial = 50;
    const instructions = parseInput(input);

    logger.log("Count before: " + count);
    for (const instruction of instructions) {
        if (instruction.dir === "R") {
            logger.log("Spinning Right");
            logger.log("Instruction Value: " + instruction.value);
            logger.log("Dial before 'R': " + dial);

            for (let i = 0; i < instruction.value; i++) {
                dial += 1;

                if (dial > 99) {
                    dial = 0;
                }

                if (dial === 0) {
                    count++;
                }
            }


            logger.log("Dial after 'R': " + dial);
        } else {
            logger.log("Spinning Left");
            logger.log("Instruction Value: " + instruction.value);
            logger.log("Dial before 'L': " + dial);

            for (let i = 0; i < instruction.value; i++) {
                dial -= 1;

                if (dial < 0) {
                    dial = 99;
                }

                if (dial === 0) {
                    count++;
                }
            }

            logger.log("Dial after 'L': " + dial);
        }

        logger.log("Count after: " + count);
        logger.log();
    }

    const end = performance.now();
    console.log(`Runtime Part 2: ${(end - start).toFixed(2)} ms`);

    return count;
}

function parseInput(input: string): { dir: string, value: number }[] {
    return input
        .trim()
        .split(/\s+/)
        .map(line => {
            const dir = line[0];
            const value = parseInt(line.slice(1), 10);
            return { dir, value };
        });
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 1: " + solvePart1(input));
console.log();
console.log("Result Part 2: " + solvePart2(input));
