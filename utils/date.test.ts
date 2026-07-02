import { formatRelativeTime } from "./date";

describe("formatRelativeTime", () => {
    test.each([
        ["Just now", 30 * 1000],
        ["5 min ago", 5 * 60 * 1000],
        ["2 hr ago", 2 * 60 * 60 * 1000],
        ["3 days ago", 3 * 24 * 60 * 60 * 1000],
        ["5 months ago", 5 * 30 * 24 * 60 * 60 * 1000],
        ["2 years ago", 2 * 365 * 24 * 60 * 60 * 1000],
    ])("returns '%s'", (expected, diff) => {
        const date = Date.now() - diff;

        expect(formatRelativeTime(date)).toBe(expected);
    });
});