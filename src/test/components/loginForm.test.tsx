
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormSignin from '../../components/signin/FormSignin';
import { vi } from 'vitest';
import { useAuth } from '../../contexts/auth/authContext';
import userEvent from '@testing-library/user-event'

vi.mock('../../contexts/auth/authContext', () => ({
    useAuth: vi.fn(),
}));

describe('Sign In form test', () => {
    test('render all form elements', () => {
        render(<FormSignin />);
        
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    });

    it('prevent onsubmit event & show message error', async () => {
        const mockLogin = vi.fn();
        const mockUseAuth = {
            login: mockLogin,
            errorAuth: null,
            isLoadingAuth: false,
        };

        (useAuth as jest.Mock).mockReturnValue(mockUseAuth);

        render(<FormSignin />);

        const loginButton = screen.getByRole('button', { name: /Sign in/i });
        await userEvent.click(loginButton);
        expect(mockLogin).not.toHaveBeenCalled();

        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });

    test('calls onSubmit with email and password when form is submitted', async () => {
        const mockLogin = vi.fn();
        const mockUseAuth = {
            login: mockLogin,
            errorAuth: null,
            isLoadingAuth: false,
        };

        (useAuth as jest.Mock).mockReturnValue(mockUseAuth);

        render(<FormSignin />);
        
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const loginButton = screen.getByRole('button', { name: /Sign in/i });

        await userEvent.type(emailInput, 'two@example.com')
        await userEvent.type(passwordInput, 'password')
        await userEvent.click(loginButton)
        
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email_address:'two@example.com', 
                password:'password'
            });
        })
        
    });
});