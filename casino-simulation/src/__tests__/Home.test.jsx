import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';

test("renders home page title", () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
const title = screen.getByText(/Casino Simulator/i);
  expect(title).toBeInTheDocument();
});