export interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetailsData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice?: string;
  Production?: string;
}

export interface SearchResponse {
  Search?: MovieSummary[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

const OMDB_API_BASE = 'https://www.omdbapi.com/';
const DEFAULT_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy';

/**
 * Curated high-quality backup data if the network or API rate limit is reached
 */
const FALLBACK_MOVIES: MovieSummary[] = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'Interstellar',
    Year: '2014',
    imdbID: 'tt0816692',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'The Dark Knight',
    Year: '2008',
    imdbID: 'tt0468569',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'Dune: Part Two',
    Year: '2024',
    imdbID: 'tt15239678',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Blade Runner 2049',
    Year: '2017',
    imdbID: 'tt1856101',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
  },
  {
    Title: 'Severance',
    Year: '2022–',
    imdbID: 'tt11280740',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMmMzNWJhOWMtMDJkNi00MGI0LWJmNWUtMzQ1ZDI1MjUyNWJhXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Oppenheimer',
    Year: '2023',
    imdbID: 'tt15398776',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Succession',
    Year: '2018–2023',
    imdbID: 'tt7660850',
    Type: 'series',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYzA2Nzk5MTAtNGYwNi00MmFiLWE2MWYtODEyMDNmYWM2YmQ2XkEyXkFqcGc@._V1_SX300.jpg',
  },
];

const FALLBACK_DETAILS: Record<string, MovieDetailsData> = {
  tt1375666: {
    Title: 'Inception',
    Year: '2010',
    Rated: 'PG-13',
    Released: '16 Jul 2010',
    Runtime: '148 min',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'Christopher Nolan',
    Writer: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    Language: 'English, Japanese, French',
    Country: 'United States, United Kingdom',
    Awards: 'Won 4 Oscars. 159 wins & 220 nominations total',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '8.8/10' },
      { Source: 'Rotten Tomatoes', Value: '87%' },
      { Source: 'Metacritic', Value: '74/100' },
    ],
    Metascore: '74',
    imdbRating: '8.8',
    imdbVotes: '2,580,240',
    imdbID: 'tt1375666',
    Type: 'movie',
    BoxOffice: '$292,587,330',
  },
};

export async function searchMovies(params: {
  query: string;
  type?: string;
  year?: string;
  page?: number;
}): Promise<{ movies: MovieSummary[]; totalResults: number; error?: string }> {
  const { query, type, year, page = 1 } = params;

  if (!query || query.trim() === '') {
    return { movies: [], totalResults: 0 };
  }

  const url = new URL(OMDB_API_BASE);
  url.searchParams.set('apikey', DEFAULT_API_KEY);
  url.searchParams.set('s', query.trim());
  url.searchParams.set('page', String(page));

  if (type && type !== 'all') {
    url.searchParams.set('type', type);
  }

  if (year && year.trim()) {
    url.searchParams.set('y', year.trim());
  }

  try {
    const res = await fetch(url.toString());
    const data: SearchResponse = await res.json();

    if (data.Response === 'True' && data.Search) {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults || '0', 10),
      };
    }

    // If rate limit reached or error, filter fallback if query matches
    if (data.Error && data.Error.includes('Request limit')) {
      const filtered = FALLBACK_MOVIES.filter((m) =>
        m.Title.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        return { movies: filtered, totalResults: filtered.length };
      }
    }

    return {
      movies: [],
      totalResults: 0,
      error: data.Error || 'No results found',
    };
  } catch {
    // Network failure fallback
    const filtered = FALLBACK_MOVIES.filter((m) =>
      m.Title.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length > 0) {
      return { movies: filtered, totalResults: filtered.length };
    }
    return {
      movies: [],
      totalResults: 0,
      error: 'Unable to connect to movie library service.',
    };
  }
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetailsData | null> {
  const url = new URL(OMDB_API_BASE);
  url.searchParams.set('apikey', DEFAULT_API_KEY);
  url.searchParams.set('i', imdbID);
  url.searchParams.set('plot', 'full');

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.Response === 'True') {
      return data as MovieDetailsData;
    }

    if (FALLBACK_DETAILS[imdbID]) {
      return FALLBACK_DETAILS[imdbID];
    }

    return null;
  } catch {
    return FALLBACK_DETAILS[imdbID] || null;
  }
}
