import { readFileSync } from "node:fs";

function solvePart1(input: string): number {
    const start = performance.now();
    const [ranges, ingredients] = parsePart1Input(input);
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

function solvePart2(input: string): number {
    const start = performance.now();
    const numRanges = parsePart2Input(input);
    const merged: { start: number, end: number }[] = [];
    let ingredientCount = 0;

    numRanges.sort((a, b) => a.start - b.start);

    for (const range of numRanges) {
        if (merged.length === 0) {
            merged.push(range);
        } else {
            const last = merged[merged.length - 1];

            if (range.start < last.end + 1) {
                last.end = Math.max(range.end, last.end);
            } else {
                merged.push(range);
            }
        }
    }

    merged.forEach(element => {
        ingredientCount += element.end - element.start + 1;
    });

    const end = performance.now();
    console.log(`Runtime Part 2: ${end - start} ms`);

    return ingredientCount;
}

function parsePart1Input(input: string): [{ start: number; end: number; }[], number[]] {
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

function parsePart2Input(input: string): { start: number; end: number; }[] {
    const rawBlocks = input
        .trim()
        .split(/\n\s*\n/)
        .map(block => block.split(/\r?\n/));

    return rawBlocks[0].map(line => {
        const [start, end] = line.split("-");

        return {
            start: Number(start),
            end: Number(end),
        };
    });
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 1: " + solvePart1(input));
console.log();
console.log("Result Part 2: " + solvePart2(input));
