import { evaluateWinner} from 

test("evaluate winning hand correctly", () => {
    const player = ["AS", "KS", "QS", "JS", "10S"]; // Royal Flush
    const dealer = ["2H", "3D", "SC", "9S", "KH"]; // High Card

    expect(evaluateWinner(player, dealer)).toBe("player");
});