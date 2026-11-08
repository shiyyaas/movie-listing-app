import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('App Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Cinema header and initial movie search results', async () => {
    render(<App />);

    expect(screen.getByText('Discover your next favorite story.')).toBeInTheDocument();
    expect(screen.getByText('Explore Cinema')).toBeInTheDocument();

    // Default search is 'Inception'
    await waitFor(() => {
      const titles = screen.getAllByText('Inception');
      expect(titles.length).toBeGreaterThan(0);
    });
  });

  it('clears search input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const clearBtn = screen.getByLabelText('Clear search input');
    await user.click(clearBtn);

    const input = screen.getByLabelText('Search movies by title') as HTMLInputElement;
    expect(input.value).toBe('');

    await waitFor(() => {
      expect(screen.getByText('Type a title in the search box above to begin searching.')).toBeInTheDocument();
    });
  });
});
