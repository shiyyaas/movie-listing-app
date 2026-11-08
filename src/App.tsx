import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Fade,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { theme, appleColors } from './theme';
import { GlobalNav } from './components/GlobalNav';
import { SubNav } from './components/SubNav';
import { SearchBar } from './components/SearchBar';
import { FilterRibbon } from './components/FilterRibbon';
import { MovieGrid } from './components/MovieGrid';
import { MovieDetails } from './components/MovieDetails';
import { SkeletonLoader } from './components/SkeletonLoader';
import { searchMovies, type MovieSummary } from './services/omdbApi';
import { useDebounce } from './hooks/useDebounce';

export const App: React.FC = () => {
  // Search & Filter State
  const [searchInput, setSearchInput] = useState<string>('Inception');
  const [activeType, setActiveType] = useState<string>('all');
  const [activeYear, setActiveYear] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Debounced query with 400ms delay
  const debouncedSearchTerm = useDebounce<string>(searchInput, 400);

  // Data fetching state
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected movie for details view
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  // Reset page to 1 when search or filters change
  const handleTypeChange = (newType: string) => {
    setActiveType(newType);
    setCurrentPage(1);
  };

  const handleYearChange = (newYear: string) => {
    setActiveYear(newYear);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setMovies([]);
    setTotalResults(0);
    setErrorMessage(null);
    setCurrentPage(1);
  };

  // Perform search query
  const executeSearch = useCallback(async () => {
    if (!debouncedSearchTerm.trim()) {
      setMovies([]);
      setTotalResults(0);
      setErrorMessage(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const result = await searchMovies({
      query: debouncedSearchTerm,
      type: activeType,
      year: activeYear,
      page: currentPage,
    });

    if (result.error) {
      setMovies([]);
      setTotalResults(0);
      setErrorMessage(result.error);
    } else {
      setMovies(result.movies);
      setTotalResults(result.totalResults);
      setErrorMessage(null);
    }

    setLoading(false);
  }, [debouncedSearchTerm, activeType, activeYear, currentPage]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: appleColors.canvasParchment,
        }}
      >
        <GlobalNav />

        <SubNav
          title={selectedMovieId ? 'Movie Details' : 'Explore Cinema'}
          subtitle={
            selectedMovieId
              ? undefined
              : totalResults > 0
              ? `${totalResults.toLocaleString()} titles available`
              : 'Search the global film database'
          }
          showBack={Boolean(selectedMovieId)}
          onBack={() => setSelectedMovieId(null)}
        />

        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 3 },
          }}
        >
          {selectedMovieId ? (
            /* Movie Details View */
            <Fade in={Boolean(selectedMovieId)} timeout={300}>
              <Box>
                <MovieDetails
                  imdbID={selectedMovieId}
                  onBack={() => setSelectedMovieId(null)}
                />
              </Box>
            </Fade>
          ) : (
            /* Search & Listing View */
            <Box>
              {/* Apple Hero Header Area */}
              <Box
                sx={{
                  textAlign: 'center',
                  mb: { xs: 4, md: 5 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    mb: 1.5,
                  }}
                >
                  Discover your next favorite story.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: appleColors.inkMuted48,
                    maxWidth: '560px',
                    mx: 'auto',
                    mb: 3.5,
                  }}
                >
                  Curate, browse, and inspect cinematic works from the global library
                  powered by the Open Source OMDb API.
                </Typography>

                {/* Minimal Centered Search Bar */}
                <SearchBar
                  value={searchInput}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                />

                {/* Filter Ribbon */}
                <FilterRibbon
                  type={activeType}
                  onTypeChange={handleTypeChange}
                  year={activeYear}
                  onYearChange={handleYearChange}
                />
              </Box>

              {/* Dynamic State Rendering */}
              {loading && <SkeletonLoader count={8} />}

              {!loading && errorMessage && (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 2,
                    backgroundColor: appleColors.canvas,
                    border: appleColors.cardBorder,
                    borderRadius: '18px',
                    maxWidth: '520px',
                    mx: 'auto',
                    mt: 3,
                  }}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 32, color: appleColors.inkMuted48, mb: 1.5 }} />
                  <Typography
                    sx={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: appleColors.ink,
                      mb: 0.5,
                    }}
                  >
                    No Results Found
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: appleColors.inkMuted48,
                      lineHeight: 1.4,
                    }}
                  >
                    {errorMessage === 'Movie not found!'
                      ? `We couldn't find any results matching "${debouncedSearchTerm}". Try refining your search or checking spelling.`
                      : errorMessage}
                  </Typography>
                </Box>
              )}

              {!loading && !errorMessage && movies.length === 0 && !searchInput.trim() && (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    color: appleColors.inkMuted48,
                  }}
                >
                  <Typography sx={{ fontSize: '16px' }}>
                    Type a title in the search box above to begin searching.
                  </Typography>
                </Box>
              )}

              {!loading && !errorMessage && movies.length > 0 && (
                <Fade in={movies.length > 0} timeout={400}>
                  <Box>
                    <MovieGrid
                      movies={movies}
                      totalResults={totalResults}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                      onSelectMovie={(id) => setSelectedMovieId(id)}
                    />
                  </Box>
                </Fade>
              )}
            </Box>
          )}
        </Container>

        {/* Apple Style Parchment Footer */}
        <Box
          component="footer"
          sx={{
            backgroundColor: appleColors.canvasParchment,
            borderTop: `1px solid ${appleColors.hairline}`,
            py: 4,
            mt: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: appleColors.inkMuted48,
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Cinema discovery engine adhering to Apple design specifications. Powered by the OMDb API.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
