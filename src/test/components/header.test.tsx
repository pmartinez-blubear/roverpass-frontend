import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '../../contexts/auth/authContext';
import LoggedHeader from '../../components/header/LoggedHeader';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';


vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span>FontAwesomeIcon</span>, // Return a simple span for testing
}));

vi.mock('../../contexts/auth/authContext', () => ({
    useAuth: vi.fn(),
}));

describe('LoggedHeader Component', () => {
    const mockUseAuth = useAuth as jest.Mock;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            user: { email: 'test@example.com' },
            handleShowModalLogout: vi.fn(),
        });
    });

    it('render the welcome message', () => {
        render(<LoggedHeader userEmail="test@example.com" />);
        expect(screen.getByText('Welcome, test@example.com')).toBeInTheDocument();
    });

    it('render toggle the submenu after click', async () => {
        render(
            <MemoryRouter>
                <LoggedHeader userEmail="test@example.com" />
            </MemoryRouter>
        );
        const loggedButton = screen.getByTestId('loggedButton');
        await act(async () => {
            loggedButton.click()
        })
        const submenuItemA = await screen.findByText('My Favorites');
        expect(submenuItemA).toBeInTheDocument();
        await act(async () => {
            loggedButton.click()
        })
        expect(submenuItemA).not.toBeInTheDocument()
    });

    it('should call handleShowModalLogout when clicking on Log Out', async () => {
        const mockHandleShowModalLogout = vi.fn();
        mockUseAuth.mockReturnValue({
            user: { email: 'test@example.com' },
            handleShowModalLogout: mockHandleShowModalLogout,
        });
        render(
            <MemoryRouter>
                <LoggedHeader userEmail="test@example.com" />
            </MemoryRouter>
        );
        const loggedButton = screen.getByTestId('loggedButton');
        await act(async () => {
            loggedButton.click()
        })
        const logoutButton = await screen.findByText('Log Out');
        await act(async () => {
            logoutButton.click()
        })
        expect(mockHandleShowModalLogout).toHaveBeenCalledOnce();
    });
});