import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { AuthContext } from "../context/AuthContext";

test("renders home page title", () => {
  const mockValue = { user: { username: "TestUser" }, logout: jest.fn() };
  render(
    <AuthContext.Provider value={mockValue}>
      <Home />
    </AuthContext.Provider>
  );
  expect(screen.getByText(/casino/i)).toBeInTheDocument();
});
