import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Catalog from '../../pages/catalog/catalog';
import useCampgrounds from '../../hooks/campgrounds/useCampgrounds';
import useProviderFavorites from '../../hooks/campgrounds/useProviderFavorites';
import CardCatalog from '../../components/catalog/cardCatalog';
import { Campgrounds } from '../../interfaces/campgrounds/campgroundsInterface';


vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span>FontAwesomeIcon</span>, // Return a simple span for testing
}));

vi.mock('../../hooks/campgrounds/useCampgrounds');
vi.mock('../../hooks/campgrounds/useProviderFavorites');

const mockCampgrounds:Campgrounds[] = [
    { 
        id: 1, 
        name: 'Campground Las Vegas',
        location: 'Las Vegas, Nevada',
        description: 'Description campground Las Vegas',
        price:30
    },
    { 
        id: 2, 
        name: 'Campground California',
        location: 'San Francisco, California',
        description: 'Description campground California',
        price:20
    },
];

const mockFavorites = [mockCampgrounds[0]];

describe('Campground List Page', () => {    
    it('call API getCampgrounds & renders list campgrounds', () => {
        const getCampgroundsMock = vi.fn();
        (useCampgrounds as jest.Mock).mockReturnValue({
            campgrounds: mockCampgrounds,
            getCampgrounds: getCampgroundsMock,
        });
        (useProviderFavorites as jest.Mock).mockReturnValue({
            favoritesCampgrounds: mockFavorites,
        });
        render(<Catalog />);
        expect(getCampgroundsMock).toHaveBeenCalledTimes(1);
        mockCampgrounds.forEach((campground) => {
            expect(screen.getByText(campground.name)).toBeInTheDocument();
        });
    });

    it('render campground information', () => {
        render(<CardCatalog isSaved={true} campground={mockCampgrounds[0]} />);
        expect(screen.getByText('Campground Las Vegas')).toBeInTheDocument();
        expect(screen.getByText('Las Vegas, Nevada')).toBeInTheDocument();
        expect(screen.getByText('Description campground Las Vegas')).toBeInTheDocument();
        expect(screen.getByText('From $30 USD')).toBeInTheDocument();
    });


    /*it('marks favorite campgrounds', () => {
        const mockCampgrounds = [
            { id: 1, name: 'Campground 1' },
            { id: 2, name: 'Campground 2' },
        ];
        const mockFavorites = [{ id: 1 }];

        (useCampgrounds as jest.Mock).mockReturnValue({
            campgrounds: mockCampgrounds,
            getCampgrounds: vi.fn(),
        });

        (useProviderFavorites as jest.Mock).mockReturnValue({
            favoritesCampgrounds: mockFavorites,
        });

        render(<Catalog />);

        const favoriteCampground = screen.getByText('Campground 1');
        expect(favoriteCampground).toHaveClass('favorite');
    });*/
});