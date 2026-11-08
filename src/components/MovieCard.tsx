import React, { useState } from 'react';
import { Box, Card, Typography, Chip } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import type { MovieSummary } from '../services/omdbApi';
import { appleColors } from '../theme';

interface MovieCardProps {
  movie: MovieSummary;
  onClick: (imdbID: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;

  return (
    <Card
      onClick={() => onClick(movie.imdbID)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie.Title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(movie.imdbID);
        }
      }}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        backgroundColor: appleColors.canvas,
        border: appleColors.cardBorder,
        borderRadius: '18px',
        transition: 'transform 0.22s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.22s cubic-bezier(0.25, 0.1, 0.25, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.07)',
          '& .movie-poster': {
            boxShadow: appleColors.productShadow,
          },
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        '&:focus-visible': {
          outline: `2px solid ${appleColors.primaryFocus}`,
          outlineOffset: '2px',
        },
      }}
    >
      {/* Poster Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '142%', // Aspect ratio ~2:3
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: appleColors.canvasParchment,
          mb: 1.75,
        }}
      >
        {hasValidPoster ? (
          <Box
            component="img"
            className="movie-poster"
            src={movie.Poster}
            alt={movie.Title}
            loading="lazy"
            onError={() => setImgError(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'box-shadow 0.22s ease, transform 0.22s ease',
            }}
          />
        ) : (
          /* Text-based fallback poster */
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              textAlign: 'center',
              backgroundColor: '#f1f1f4',
            }}
          >
            <MovieIcon sx={{ fontSize: 36, color: appleColors.inkMuted48, mb: 1, opacity: 0.7 }} />
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                color: appleColors.ink,
                lineHeight: 1.3,
                maxHeight: '4.2em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {movie.Title}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                color: appleColors.inkMuted48,
                mt: 0.5,
              }}
            >
              No Poster Available
            </Typography>
          </Box>
        )}
      </Box>

      {/* Typography Hierarchy */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: '-0.374px',
            color: appleColors.ink,
            mb: 0.75,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {movie.Title}
        </Typography>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              fontSize: '13px',
              color: appleColors.inkMuted48,
              letterSpacing: '-0.12px',
            }}
          >
            {movie.Year}
          </Typography>

          <Chip
            label={movie.Type.toUpperCase()}
            size="small"
            sx={{
              height: '20px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              color: appleColors.inkMuted80,
              borderRadius: '5px',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};
