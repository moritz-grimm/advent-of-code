import { readFileSync } from "node:fs";
import { createLogger } from "utils/logger";

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

/*
Note: This would have worked too, but we don't want it too easy here, right?
For anyone interested, this is around 500ms faster than my other solution.

```
function solvePart2(input: string) {
    const start = performance.now();
    let invalidIdSum = 0;
    const numRanges = parseInput(input);

    for (const numRange of numRanges) {
        for (let currentNum = Number(numRange.start); currentNum <= Number(numRange.end); currentNum++) {
            if (hasRepeatingPattern(String(currentNum))) {
                invalidIdSum += currentNum;
            }
        }

    }

    const end = performance.now();
    console.log(`Runtime Part 2: ${end - start} ms`);

    return invalidIdSum;
}

function hasRepeatingPattern(str) {
    const n = str.length;
    for (let i = 1; i <= Math.floor(n / 2); i++) {
        if (n % i === 0) {
            const pattern = str.slice(0, i);
            const repetitions = n / i;
            if (pattern.repeat(repetitions) === str) {
                return true;
            }
        }
    }
    return false;
}

const input = readFileSync("input.txt", "utf-8");
console.log("Result Part 2: " + solvePart2(input));
```
 */
function solvePart2(input: string): number {
    const start = performance.now();
    const numRanges = parseInput(input);
    let invalidIdSum = 0;
    const logger = createLogger(false);

    for (const numRange of numRanges) {
        for (let currentNum = Number(numRange.start); currentNum <= Number(numRange.end); currentNum++) {
            const numStr = String(currentNum);
            let patternLength = 1;

            if (numStr.length < 1) continue;

            while (patternLength <= Math.floor(numStr.length / 2)) {
                const pattern = numStr.slice(0, patternLength);
                const patternRegex = new RegExp(`^(${pattern})+$`);

                if (numStr.length % pattern.length === 0 && patternRegex.test(numStr)) {
                    invalidIdSum += currentNum;
                    logger.log("Current Number: " + currentNum);
                    logger.log("Detected Pattern: " + pattern);
                    logger.log(`Invalid ID found: ${currentNum}`);
                    break;
                }

                patternLength++;
            }
        }
    }

    const end = performance.now();
    console.log(`Runtime Part 2: ${end - start} ms`);

    return invalidIdSum;
}

function parseInput(input: string): { start: string, end: string }[] {
    return input
        .trim()
        .split(",")
        .map(numRange => {
            const [firstNum, secondNum] = numRange.split("-");

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
console.log();
console.log("Result Part 2: " + solvePart2(input));
