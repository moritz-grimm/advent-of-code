import { readFileSync } from "node:fs";

function solvePart1(input: string): number {
    const start = performance.now();
    const numRanges = parseInput(input);
    let idSum = 0;

    for (const numRange of numRanges) {

        const nums = getNumRange(numRange.start, numRange.end);

        for (const num of nums) { // Note: This could be optimized by iterating directly instead of building the array first.
            if (num.length % 2 != 0) continue;

            const stringMid = Math.floor(num.length / 2);
            const left = num.slice(0, stringMid);
            const right = num.slice(stringMid);

            if (left === right) {
                idSum += Number(num);
            }
        }
    }

    const end = performance.now();
    console.log(`Runtime Part 1: ${end - start} ms`);

    return idSum;
}

function parseInput(input: string): { start: string, end: string }[] {
    return input
        .trim()
        .split(",")
        .map(line => {
            const [firstNum, secondNum] = line.split("-");

            return {
                start: firstNum,
                end: secondNum,
            };
        });
}

function getNumRange(start: string, end: string): string[] {
    const numbers = [];
    for (let i = Number(start); i <= Number(end); i++) {
        numbers.push(String(i));
    }

    return numbers;
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 1:" + solvePart1(input));
