export function createLogger(enabled: boolean) {
    return {
        log(...args: any[]) {
            if (enabled) console.log(...args);
        },
    };
}
