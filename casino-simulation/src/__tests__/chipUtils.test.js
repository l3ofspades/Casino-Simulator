import { updateChips } from "../utils/chipUtils";

describe("Chip Management Logic", () => {
    test("adds chips correctly on win", () => {
        expect(updateChips(1000, 100, "win", 2)).toBe(1200);
    });
    
    test("subtracts chips on loss", () => {
        expect(updateChips(1000, 100, "lose")).toBe(900);
    });

    test("keeps chips the same on tie", () => {
        expect(updateChips(1000, 100, "tie")).toBe(1000);
    });

    test("handles payout multiplier", () => {
        expect(updateChips(500, 50, "win", 5)).toBe(750);
    });
});