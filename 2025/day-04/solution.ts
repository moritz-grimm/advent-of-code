import { readFileSync } from "node:fs";

function solvePart1(input: string): number {
    const start = performance.now();
    const grid = parseInput(input);
    let paperRolesSum = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            if (grid[row][column] === "@" && isAccessible(grid, row, column)) {
                paperRolesSum++;
            }
        }
    }

    const end = performance.now();
    console.log(`Runtime Part 1: ${(end - start).toFixed(2)} ms`);

    return paperRolesSum;
}

function parseInput(input: string): string[][] {
    return input
        .trim()
        .split("\n")
        .map(line => line.split(""));
}

function isAccessible(grid: string[][], row: number, col: number): boolean {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    let adjacentPaperCount = 0;

    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[newRow].length) {
            if (grid[newRow][newCol] === "@") {
                adjacentPaperCount++;
            }
        }
    }

    return adjacentPaperCount < 4;
}

const input = readFileSync("./input.txt", "utf-8");
console.log(solvePart1(input));
