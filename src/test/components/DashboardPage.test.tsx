import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardPage } from '../../pages/DashboardPage';

vi.mock('../../features/dashboard/hooks/useDashboardMovies', () => ({
  useDashboardMovies: () => ({
    trendingMovies: [
      { id: 1, title: 'Movie A', genreIds: [18, 35], popularity: 10 },
      { id: 2, title: 'Movie B', genreIds: [878, 28], popularity: 10 },
      { id: 3, title: 'Movie C', genreIds: [18], popularity: 10 },
    ],
    upcomingMovies: [
      {
        id: 101,
        title: 'Upcoming A',
        genreIds: [18],
        popularity: 10,
        releaseDate: '2026-06-12',
      },
    ],
    isLoading: false,
    errorMessage: null,
  }),
}));

vi.mock('../../features/dashboard/hooks/usePopularTalentMatches', () => ({
  usePopularTalentMatches: () => ({
    rows: [
      {
        id: 1,
        actor: 'Zendaya',
        popularity: 'Alta',
        strongGenres: 'Drama / Science Fiction',
        affinityPercentage: 78,
        tone: 'success',
      },
    ],
    isLoading: false,
    errorMessage: null,
  }),
}));

vi.mock('../../features/dashboard/hooks/useMovieAnniversaries', () => ({
  useMovieAnniversaries: () => ({
    rows: [
      {
        yearsAgo: 5,
        title: 'Example Anniversary',
        genreLabel: 'Drama',
        affinityPercentage: 80,
        insight: 'Puede aprovecharse como referencia cultural.',
        isEmpty: false,
      },
    ],
    isLoading: false,
    errorMessage: null,
  }),
}));

vi.mock('../../features/dashboard/hooks/useSearchActors', () => ({
  useSearchActors: () => ({
    actors: [],
    isLoading: false,
    errorMessage: null,
  }),
}));

vi.mock('../../features/dashboard/hooks/useActorMovieCredits', () => ({
  useActorMovieCredits: () => ({
    credits: [],
    isLoading: false,
    errorMessage: null,
  }),
}));

describe('DashboardPage', () => {
  it('updates brand-driven content when the selected brand changes', async () => {
    const user = userEvent.setup();

    render(<DashboardPage />);

    const narrativeMetric = screen.getByTestId('metric-brand-narrative-profile');

    expect(within(narrativeMetric).getByText('Drama')).toBeInTheDocument();

    const brandSelect = screen.getByLabelText('Marca Activa');
    await user.selectOptions(brandSelect, 'tesla');

    expect(
      within(narrativeMetric).getByText('Sci-Fi'),
    ).toBeInTheDocument();
  });
});
