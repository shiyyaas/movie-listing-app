import React from 'react';
import { Box, Grid, Typography, Pagination } from '@mui/material';
import type { MovieSummary } from '../services/omdbApi';
import { MovieCard } from './MovieCard';
import { appleColors } from '../theme';

interface MovieGridProps {
  movies: MovieSummary[];
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectMovie: (imdbID: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  totalResults,
  currentPage,
  onPageChange,
  onSelectMovie,
}) => {
  const totalPages = Math.min(100, Math.ceil(totalResults / 10)); // OMDb returns 10 per page

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      {/* Search Result Count */}
      <Box sx={{ mb: 2.5, px: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontSize: '14px',
            color: appleColors.inkMuted48,
            fontWeight: 400,
          }}
        >
          Showing {movies.length} of {totalResults.toLocaleString()} results
        </Typography>
      </Box>

      {/* Movies Grid */}
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${movie.imdbID}-${movie.Year}`}>
            <MovieCard movie={movie} onClick={onSelectMovie} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 6,
            mb: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '9999px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: appleColors.ink,
                '&:hover': {
                  backgroundColor: appleColors.surfacePearl,
                },
                '&.Mui-selected': {
                  backgroundColor: appleColors.primary,
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: appleColors.primaryFocus,
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
