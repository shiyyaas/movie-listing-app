import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import TheatersIcon from '@mui/icons-material/Theaters';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getMovieDetails, type MovieDetailsData } from '../services/omdbApi';
import { appleColors } from '../theme';

interface MovieDetailsProps {
  imdbID: string;
  onBack: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbID, onBack }) => {
  const [details, setDetails] = useState<MovieDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getMovieDetails(imdbID)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setDetails(data);
        } else {
          setError('Movie details could not be retrieved.');
        }
      })
      .catch(() => {
        if (isMounted) setError('Network error fetching movie details.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [imdbID]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress size={36} sx={{ color: appleColors.primary }} />
        <Typography sx={{ color: appleColors.inkMuted48, fontSize: '15px' }}>
          Loading details...
        </Typography>
      </Box>
    );
  }

  if (error || !details) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: appleColors.ink, fontSize: '18px', fontWeight: 600, mb: 1 }}>
          Unable to Load Movie
        </Typography>
        <Typography sx={{ color: appleColors.inkMuted48, mb: 3 }}>
          {error || 'The requested movie information could not be found.'}
        </Typography>
        <Button variant="outlined" onClick={onBack}>
          Return to Movies
        </Button>
      </Box>
    );
  }

  const hasValidPoster = details.Poster && details.Poster !== 'N/A' && !imgError;

  return (
    <Box sx={{ width: '100%', py: { xs: 2, md: 4 } }}>
      {/* Back Navigation Bar */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: appleColors.primary,
            px: 2,
            py: 0.75,
            fontSize: '15px',
            backgroundColor: appleColors.canvas,
            border: appleColors.cardBorder,
            '&:hover': {
              backgroundColor: appleColors.surfacePearl,
            },
          }}
        >
          Back to Results
        </Button>
      </Box>

      {/* Split-screen Canvas */}
      <Grid container spacing={{ xs: 4, md: 6 }}>
        {/* Left: High-Res Poster Art */}
        <Grid size={{ xs: 12, md: 5, lg: 4.5 }}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: appleColors.canvas,
              border: appleColors.cardBorder,
              boxShadow: appleColors.productShadow,
              transition: 'transform 0.3s ease',
            }}
          >
            {hasValidPoster ? (
              <Box
                component="img"
                src={details.Poster}
                alt={details.Title}
                onError={() => setImgError(true)}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  pt: '140%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eaebee',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    textAlign: 'center',
                  }}
                >
                  <TheatersIcon sx={{ fontSize: 56, color: appleColors.inkMuted48, mb: 2 }} />
                  <Typography sx={{ fontWeight: 600, fontSize: '18px', color: appleColors.ink }}>
                    {details.Title}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: appleColors.inkMuted48, mt: 1 }}>
                    Poster unavailable
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right: Primary Typographic Data Hierarchy */}
        <Grid size={{ xs: 12, md: 7, lg: 7.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Title & Year */}
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                  fontSize: { xs: '32px', sm: '42px', md: '48px' },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.374px',
                  color: appleColors.ink,
                  mb: 1.5,
                }}
              >
                {details.Title}
              </Typography>

              {/* Inline Metadata Row: Year, Runtime, Rated, Genre */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  color: appleColors.inkMuted48,
                  fontSize: '15px',
                }}
              >
                <Typography component="span" sx={{ fontWeight: 600, color: appleColors.ink }}>
                  {details.Year}
                </Typography>

                {details.Rated && details.Rated !== 'N/A' && (
                  <Chip
                    label={details.Rated}
                    size="small"
                    sx={{
                      height: '22px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      color: appleColors.ink,
                    }}
                  />
                )}

                {details.Runtime && details.Runtime !== 'N/A' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <Typography component="span" sx={{ fontSize: '14px' }}>
                      {details.Runtime}
                    </Typography>
                  </Box>
                )}

                {details.Genre && details.Genre !== 'N/A' && (
                  <Typography component="span" sx={{ fontSize: '14px', color: appleColors.inkMuted80 }}>
                    • {details.Genre}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Custom Scores Badges (IMDb, Rotten Tomatoes, Metacritic) */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                my: 1,
              }}
            >
              {/* IMDb Badge */}
              {details.imdbRating && details.imdbRating !== 'N/A' && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    backgroundColor: appleColors.canvas,
                    border: appleColors.cardBorder,
                  }}
                >
                  <StarRateRoundedIcon sx={{ color: '#f5c518', fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: appleColors.ink }}>
                      {details.imdbRating}
                      <Typography component="span" sx={{ fontSize: '11px', color: appleColors.inkMuted48 }}>
                        /10
                      </Typography>
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: appleColors.inkMuted48 }}>
                      IMDb {details.imdbVotes ? `(${details.imdbVotes})` : ''}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Rotten Tomatoes Badge */}
              {details.Ratings?.find((r) => r.Source === 'Rotten Tomatoes') && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    backgroundColor: appleColors.canvas,
                    border: appleColors.cardBorder,
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: '#fa320a',
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: appleColors.ink }}>
                      {details.Ratings.find((r) => r.Source === 'Rotten Tomatoes')?.Value}
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: appleColors.inkMuted48 }}>
                      Rotten Tomatoes
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Metacritic Badge */}
              {details.Metascore && details.Metascore !== 'N/A' && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    backgroundColor: appleColors.canvas,
                    border: appleColors.cardBorder,
                  }}
                >
                  <Box
                    sx={{
                      px: 0.75,
                      py: 0.25,
                      borderRadius: '4px',
                      backgroundColor: '#66cc33',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {details.Metascore}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: appleColors.ink }}>
                      Metascore
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: appleColors.inkMuted48 }}>
                      Metacritic
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 0.5, borderColor: appleColors.dividerSoft }} />

            {/* Plot block */}
            <Box>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: appleColors.inkMuted48,
                  mb: 1,
                }}
              >
                Overview
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  letterSpacing: '-0.374px',
                  color: appleColors.ink,
                }}
              >
                {details.Plot && details.Plot !== 'N/A'
                  ? details.Plot
                  : 'No detailed plot summary is currently available.'}
              </Typography>
            </Box>

            <Divider sx={{ my: 0.5, borderColor: appleColors.dividerSoft }} />

            {/* Cast & Crew Pairs */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {details.Director && details.Director !== 'N/A' && (
                <Box>
                  <Typography sx={{ fontSize: '12px', color: appleColors.inkMuted48, fontWeight: 600 }}>
                    DIRECTOR
                  </Typography>
                  <Typography sx={{ fontSize: '15px', color: appleColors.ink, mt: 0.25 }}>
                    {details.Director}
                  </Typography>
                </Box>
              )}

              {details.Writer && details.Writer !== 'N/A' && (
                <Box>
                  <Typography sx={{ fontSize: '12px', color: appleColors.inkMuted48, fontWeight: 600 }}>
                    WRITERS
                  </Typography>
                  <Typography sx={{ fontSize: '15px', color: appleColors.ink, mt: 0.25 }}>
                    {details.Writer}
                  </Typography>
                </Box>
              )}

              {details.Actors && details.Actors !== 'N/A' && (
                <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                  <Typography sx={{ fontSize: '12px', color: appleColors.inkMuted48, fontWeight: 600 }}>
                    STARRING
                  </Typography>
                  <Typography sx={{ fontSize: '15px', color: appleColors.ink, mt: 0.25 }}>
                    {details.Actors}
                  </Typography>
                </Box>
              )}

              {details.BoxOffice && details.BoxOffice !== 'N/A' && (
                <Box>
                  <Typography sx={{ fontSize: '12px', color: appleColors.inkMuted48, fontWeight: 600 }}>
                    BOX OFFICE
                  </Typography>
                  <Typography sx={{ fontSize: '15px', color: appleColors.ink, mt: 0.25 }}>
                    {details.BoxOffice}
                  </Typography>
                </Box>
              )}

              {details.Awards && details.Awards !== 'N/A' && (
                <Box>
                  <Typography sx={{ fontSize: '12px', color: appleColors.inkMuted48, fontWeight: 600 }}>
                    AWARDS
                  </Typography>
                  <Typography sx={{ fontSize: '15px', color: appleColors.ink, mt: 0.25 }}>
                    {details.Awards}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
