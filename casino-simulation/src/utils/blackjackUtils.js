export function calculateHandValue(cards) {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
        const value = card.value;

        if (["JACK", "QUEEN", "KING"].includes(value)) total += 10;
        else if (value === "ACE") {
            total += 11;
            aces += 1;
        } else {
            total += parseInt(value, 10);
        }
    });

    // Convert some aces from 11 to 1 if total is over 21
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }

    return total;
}
export function determineWinner(playerTotal, dealerTotal) {
  if (playerTotal > 21) return "dealer"; // Player busts
  if (dealerTotal > 21) return "player"; // Dealer busts
  if (playerTotal > dealerTotal) return "player";
  if (dealerTotal > playerTotal) return "dealer";
  return "push"; // tie
}