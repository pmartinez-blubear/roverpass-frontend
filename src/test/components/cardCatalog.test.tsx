import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import CardCatalog from "../../components/catalog/cardCatalog";
import userEvent from '@testing-library/user-event';
import { useAuth } from '../../contexts/auth/authContext';
import useSaveFavoriteCampgrounds from '../../hooks/campgrounds/useSaveFavoriteCampground';
import useDeleteFavoriteCampgrounds from '../../hooks/campgrounds/useDeleteFavoriteCampground';
import useProviderFavorites from '../../hooks/campgrounds/useProviderFavorites';
import { mockCampgrounds, mockFavoritesCampgroundsArray } from '../__mocks__/dataTest';

vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span>FontAwesomeIcon</span>,
}));

vi.mock('../../contexts/auth/authContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../hooks/campgrounds/useSaveFavoriteCampground', () => ({
    default: vi.fn().mockReturnValue({
        saveFavoriteCampground: vi.fn()
    }),
}));

vi.mock('../../hooks/campgrounds/useDeleteFavoriteCampground', () => ({
    default: vi.fn().mockReturnValue({
        removeFavoriteCampground: vi.fn()
    }),
}));

vi.mock('../../hooks/campgrounds/useProviderFavorites');


const mockAddFavorite = vi.fn();
const mockSaveCampground = {
    saveFavoriteCampground:mockAddFavorite
};

const mockRemoveFavorite = vi.fn();
const mockRemoveCampground = {
    removeFavoriteCampground:mockRemoveFavorite
};

describe('CardCatalog render & favorites logic', () => { 

    beforeEach(() => {
        vi.clearAllMocks();
        
    });

    it('render campground information', () => {
        render(<CardCatalog campground={mockCampgrounds[0]} />);
        expect(screen.getByText('Campground Las Vegas')).toBeInTheDocument();
        expect(screen.getByText('Las Vegas, Nevada')).toBeInTheDocument();
        expect(screen.getByText('Description campground Las Vegas')).toBeInTheDocument();
        expect(screen.getByText('From $30 USD')).toBeInTheDocument();
    });

    it('open login modal when user is not login', async () => {
        const mockHandleShowModalLogin = vi.fn();
        const mockUseAuth = {
            user: null,
            handleShowModalLogin: mockHandleShowModalLogin,
        };
        
        (useAuth as jest.Mock).mockReturnValue(mockUseAuth);

        render(<CardCatalog campground={mockCampgrounds[0]} />);

        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => 
            expect(mockHandleShowModalLogin).toHaveBeenCalledWith(true)
        );
    });

    it('send remove when a campground is_favorite = true', async () => {
        const mockHandleShowModalLogin = vi.fn();
        const mockUseAuth = {
            user: { email:'test@example.com' },
            handleShowModalLogin: mockHandleShowModalLogin,
        };

        (useAuth as jest.Mock).mockReturnValue(mockUseAuth);
        (useDeleteFavoriteCampgrounds as jest.Mock).mockReturnValue(mockRemoveCampground);
        (useSaveFavoriteCampgrounds as jest.Mock).mockReturnValue(mockSaveCampground);
        (useProviderFavorites as jest.Mock).mockReturnValue({favoritesCampgrounds: mockFavoritesCampgroundsArray});

        render(<CardCatalog campground={mockCampgrounds[0]} />);
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(mockAddFavorite).not.toHaveBeenCalled();
            expect(mockRemoveFavorite).toHaveBeenCalled();
        });
    });

    it('send add when a campground is_favorite = false', async () => {
        const mockHandleShowModalLogin = vi.fn();
        const mockUseAuth = {
            user: { email:'test@example.com' },
            handleShowModalLogin: mockHandleShowModalLogin,
        };

        (useAuth as jest.Mock).mockReturnValue(mockUseAuth);
        (useDeleteFavoriteCampgrounds as jest.Mock).mockReturnValue(mockRemoveCampground);
        (useSaveFavoriteCampgrounds as jest.Mock).mockReturnValue(mockSaveCampground);

        render(<CardCatalog campground={mockCampgrounds[1]} />);
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() =>{
            expect(mockRemoveFavorite).not.toHaveBeenCalled();
            expect(mockAddFavorite).toHaveBeenCalled();
        });
    });
})