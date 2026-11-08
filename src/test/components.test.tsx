import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from '../components/SearchBar';
import { FilterRibbon } from '../components/FilterRibbon';
import { MovieCard } from '../components/MovieCard';
import type { MovieSummary } from '../services/omdbApi';

describe('SearchBar component', () => {
  it('renders input with placeholder and calls onChange when typed into', () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();

    render(
      <SearchBar
        value="Batman"
        onChange={handleChange}
        onClear={handleClear}
        placeholder="Search movies..."
      />
    );

    const input = screen.getByLabelText('Search movies by title') as HTMLInputElement;
    expect(input.value).toBe('Batman');

    fireEvent.change(input, { target: { value: 'Inception' } });
    expect(handleChange).toHaveBeenCalledWith('Inception');

    const clearButton = screen.getByLabelText('Clear search input');
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});

describe('FilterRibbon component', () => {
  it('handles type filter selection', () => {
    const handleTypeChange = vi.fn();
    const handleYearChange = vi.fn();

    render(
      <FilterRibbon
        type="all"
        onTypeChange={handleTypeChange}
        year=""
        onYearChange={handleYearChange}
      />
    );

    const moviesChip = screen.getByText('Movies');
    fireEvent.click(moviesChip);
    expect(handleTypeChange).toHaveBeenCalledWith('movie');
  });
});

describe('MovieCard component', () => {
  const mockMovie: MovieSummary = {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg',
  };

  it('renders movie title, year, and type badge and responds to click', () => {
    const handleClick = vi.fn();
    render(<MovieCard movie={mockMovie} onClick={handleClick} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('MOVIE')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /View details for Inception/i }));
    expect(handleClick).toHaveBeenCalledWith('tt1375666');
  });

  it('renders fallback poster state when Poster is N/A', () => {
    const mockNoPoster: MovieSummary = {
      Title: 'Untitled Film',
      Year: '2024',
      imdbID: 'tt9999999',
      Type: 'movie',
      Poster: 'N/A',
    };

    render(<MovieCard movie={mockNoPoster} onClick={vi.fn()} />);
    expect(screen.getByText('No Poster Available')).toBeInTheDocument();
  });
});
