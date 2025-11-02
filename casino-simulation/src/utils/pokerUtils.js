import { Hand } from 'pokersolver';

//Elevate the winner between player and dealer hands
export function evaluateWinner(playerCards, dealerCards) {
    // Convert card arrays into Hand objects
    const playerHand = Hand.solve(playerCards);
    const dealerHand = Hand.solve(dealerCards);
    const winner = Hand.winners([playerHand, dealerHand]);

    if (winner.length > 1) return "tie"; // It's a tie
    return winner[0] === playerHand ? "player" : "dealer";
}

