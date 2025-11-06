import { calculateWinnings } from "../utils/rouletteLogic";

describe("Roulette Logic", () => {
    test("pays 2x for correct color bet", () => {
        const result = {color: "red", number: 7 };
        const winnings = calculateWinnings("color", "red", 100, result);
        expect(winnings).toBe(200);
    });

    test("pays 36x for correct number bet", () => {
        const result = { color: "black", number: 17 };
        const winnings = calculateWinnings("number", 17, 100, result);
        expect(winnings).toBe(3600);
    });

    test("pays 14x for correct green color bet", () => {
        const result = { color: "green", number: 0 };
        const winnings = calculateWinnings("color", "green", 100, result);
        expect(winnings).toBe(1400);
    });

    test("returns 0 for incorrect bet", () => {
        const result = { color: "black", number: 20 };
        const winnings = calculateWinnings("color", "red", 100, result);
        expect(winnings).toBe(0);
    });
});
        



    
