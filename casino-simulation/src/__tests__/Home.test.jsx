import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import AuthContext from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom"


test("renders home page title", () => {
  const mockValue = { user: { username: "TestUser" }, logout: jest.fn() };


  render(
    <MemoryRouter>
    <AuthContext.Provider value={mockValue}>
      <Home />
    </AuthContext.Provider>
    </MemoryRouter>
  );
  expect(screen.getByText(/casino/i)).toBeInTheDocument();
});


