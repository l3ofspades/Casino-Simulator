import { render, screen } from "@testing-library/react";
import Blackjack from "../components/Blackjack";
import { AuthProvider } from "../context/AuthContext";
import { ChipProvider } from "../context/ChipContext";
import { MemoryRouter } from "react-router-dom";

test("renders blackjack component", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <ChipProvider>
          <Blackjack />
        </ChipProvider>
      </AuthProvider>
    </MemoryRouter>
  );

  
  expect(screen.getByText(/blackjack/i)).toBeInTheDocument();
});
