import { readFileSync } from "node:fs";

function solvePart1(input: string): number {
    const start = performance.now();
    const inputArray = parseInput(input);
    let joltageSum = 0;

    for (const arr of inputArray) {
        let biggestNum = 0;
        for (let firstDigitIndex = 0; firstDigitIndex < arr.length; firstDigitIndex++) {
            if (arr[firstDigitIndex] * 10 + 9 < biggestNum) {
                continue;
            }
            for (let secondDigitIndex = firstDigitIndex + 1; secondDigitIndex < arr.length; secondDigitIndex++) {
                if (arr[secondDigitIndex] < biggestNum - arr[firstDigitIndex] * 10) {
                    continue;
                }

                const newNum = Number(String(arr[firstDigitIndex]) + String(arr[secondDigitIndex]));

                if (newNum > biggestNum) {
                    biggestNum = newNum;
                }
            }
        }
        joltageSum += biggestNum;
    }

    const end = performance.now();
    console.log(`Runtime Part 1: ${(end - start).toFixed(2)} ms`);

    return joltageSum;
}

function solvePart2(input: string): bigint {
    const start = performance.now();
    const inputArray = parseInput(input);
    let joltageSum = 0n;

    for (const arr of inputArray) {
        const digitsToRemove = arr.length - 12;
        const num = BigInt(arr.join(""));
        const maxNumber = getMaxNumber(num, digitsToRemove);
        joltageSum += maxNumber;
    }

    const end = performance.now();
    console.log(`Runtime Part 2: ${(end - start).toFixed(2)} ms`);

    return joltageSum;
}

function parseInput(input: string): number[][] {
    return input
        .trim()
        .split(/\s+/)
        .map(row => row.split("").map(Number));
}

function getMaxNumber(num: bigint, digitsToRemove: number): bigint {
    for (let j = 0; j < digitsToRemove; j++) {

        let ans = 0n;
        let i = 1n;

        while (num / i > 0n) {
            const temp = num / (i * 10n) * i + (num % i);
            i *= 10n;

            ans = temp > ans ? temp : ans;
        }

        num = ans;
    }

    return num;
}

const input = readFileSync("./input.txt", "utf-8");
console.log(solvePart1(input));
console.log();
console.log(solvePart2(input));
