export function updateChips(currentChips, bet, outcome, payout = 1) {
    switch (outcome) {
        case "win":
            return currentChips + bet * payout;
            case "lose":
                return currentChips - bet;
                default:
                    return currentChips;
    
    }
}