import { evaluateWinner } from '../utils/pokerUtils';

test("evaluate winning hand correctly", () => {
    const player = ["AS", "KS", "QS", "JS", "10S"]; // Royal Flush
    const dealer = ["2H", "3D", "5C", "9S", "KH"]; // High Card

    expect(evaluateWinner(player, dealer)).toBe("player");
});

test("returns 'dealer' when dealer has the stronger hand", () => {
    const player = ["2H", "3D", "5C", "9S", "KH"]; //Weak Hand
    const dealer = ["AS", "KS", "QS", "JS", "10S"];// Royal Flush

expect(evaluateWinner(player, dealer)).toBe("dealer");
});

test("returns 'tie' when both hands are equal strength", () => {
    const player = ["AS", "KS", "QS", "JS", "10S"];
    const dealer = ["AD", "KD", "QD", "JD", "10D"];
    expect(evaluateWinner(player, dealer)).toBe("tie");
});