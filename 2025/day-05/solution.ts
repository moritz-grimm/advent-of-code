import { readFileSync } from "node:fs";

function solvePart1(input: string): number {
    const start = performance.now();
    const [ranges, ingredients] = parseInput(input);
    const freshIngredients: number[] = [];

    for (const num of ingredients) {
        for (const numRange of ranges) {
            if (num >= numRange.start && num <= numRange.end && !freshIngredients.includes(num)) {
                freshIngredients.push(num);
            }
        }

    }

    const end = performance.now();
    console.log(`Runtime Part 2: ${end - start} ms`);

    return freshIngredients.length;
}

function parseInput(input: string): [{ start: number; end: number; }[], number[]] {
    const rawBlocks = input
        .trim()
        .split(/\n\s*\n/)
        .map(block => block.split(/\r?\n/));

    const ranges = rawBlocks[0].map(line => {
        const [start, end] = line.split("-");

        return { start: Number(start), end: Number(end) };
    });

    const ingredients = rawBlocks[1].map(Number);

    return [ranges, ingredients];
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 1: " + solvePart1(input));
