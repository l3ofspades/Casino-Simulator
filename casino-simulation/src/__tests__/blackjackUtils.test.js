import { calculateHandValue, determineWinner } from "../utils/blackjackUtils";

describe("Blackjack Logic", () => {
    test("calculates hand value correctly with face cards and aces", () => {
        const cards = [{ value: "ACE" }, { value: "KING" }];
        expect(calculateHandValue(cards)).toBe(21);
    });

    test("returns correct winner", () => {
        expect(determineWinner(20, 18)).toBe("player");
        expect(determineWinner(22, 17)).toBe("dealer");
        expect(determineWinner(19, 21)).toBe("dealer");
        expect(determineWinner(18, 18)).toBe("push");

    });
});
