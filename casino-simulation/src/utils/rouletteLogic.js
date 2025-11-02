export function calculateWinnings(betType, choice, betAmount, result) {
    switch (betType) {
        case "color":
            if (result.color === choice) {
                return choice === "green" ? betAmount * 14 : betAmount * 2;
            }
            return 0;

            case "number":
                return result.number === parseInt(choice) ? betAmount * 36 : 0;

                case "evenodd":
                    if (choice === "even" && result.number % 2 === 0) return betAmount * 2;
                    if (choice === "odd" && result.number % 2 !== 0) return betAmount * 2;
                    return 0;

                    default:
                        return 0;
    }   
}