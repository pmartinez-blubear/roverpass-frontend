import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Catalog from '../../pages/catalog/catalog';
import useCampgrounds from '../../hooks/campgrounds/useCampgrounds';
import { mockCampgrounds } from '../__mocks__/dataTest';

vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span>FontAwesomeIcon</span>, // Return a simple span for testing
}));

vi.mock('../../hooks/campgrounds/useCampgrounds');
vi.mock('../../hooks/campgrounds/useProviderFavorites');


describe('Campground List Page', () => {    
    
    it('call API getCampgrounds & renders list campgrounds', async () => {
        const getCampgroundsMock = vi.fn();
        (useCampgrounds as jest.Mock).mockReturnValue({
            campgrounds: mockCampgrounds,
            getCampgrounds: getCampgroundsMock,
        });
        render(<Catalog />);
        await waitFor(() => {
            expect(getCampgroundsMock).toHaveBeenCalledTimes(1);
        })
        
        mockCampgrounds.forEach((campground) => {
            expect(screen.getByText(campground.name)).toBeInTheDocument();
        });
    });
});