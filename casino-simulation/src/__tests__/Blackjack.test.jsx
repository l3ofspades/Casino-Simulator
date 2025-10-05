import { render, screen } from '@testing-library/react';
import Blackjack from '../components/Blackjack';

test("renders blackjack component", () => {
    render(<Blackjack chips={1000} setChips={() => {}} />);
    expect(screen.getByText(/Blackjack/i)).toBeInTheDocument();
});