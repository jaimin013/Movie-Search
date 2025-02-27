const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
console.log("OMDB_API_KEY:", OMDB_API_KEY);

export function getMoviePosterUrl(url: string | null) {
  if (!url || url === "N/A") return null;
  return url;
}

export interface OMDBMovie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

interface MovieSearchResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: string;
}

export async function searchMovies(query: string, page = 1): Promise<MovieSearchResponse> {
  if (!query.trim()) return { Search: [], totalResults: "0", Response: "False" };

  const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`);
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();
  if (data.Response === "False") {
    return { Search: [], totalResults: "0", Response: "False" };
  }
  return data;
}

export async function getMovie(id: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  const data = await res.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details");
  }
  return data;
}

export async function getTopRatedMovies(page = 1): Promise<MovieSearchResponse> {
  const keywords = ["best", "top rated", "acclaimed"];
  const searchPromises = keywords.map(keyword => 
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(keyword + " movies")}&type=movie&page=${page}`)
  );

  try {
    const responses = await Promise.all(searchPromises);
    const results = await Promise.all(
      responses.map(async (res) => {
        if (!res.ok) return [];
        const data = await res.json();
        return data.Response === "True" ? data.Search : [];
      })
    );

    const uniqueMovies = Array.from(
      new Map(results.flat().map(movie => [movie.imdbID, movie])).values()
    );

    return {
      Search: uniqueMovies.slice(0, 10),
      totalResults: String(uniqueMovies.length),
      Response: uniqueMovies.length > 0 ? "True" : "False"
    };
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return { Search: [], totalResults: "0", Response: "False" };
  }
}

export async function getNewReleases(): Promise<MovieSearchResponse> {
  const currentYear = 2024;
  const previousYear = currentYear - 1;

  const keywords = [
    'new movies',
    'latest releases',
    `${currentYear}`
  ];

  console.log('Fetching new releases with keywords:', keywords);

  const searchPromises = keywords.map(keyword => 
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(keyword)}&type=movie`)
      .then(res => res.json())
      .then(data => {
        console.log(`Response for keyword "${keyword}":`, data);
        return data.Response === "True" ? data.Search : [];
      })
      .catch(error => {
        console.error(`Error fetching movies for keyword "${keyword}":`, error);
        return [];
      })
  );

  try {
    const results = await Promise.all(searchPromises);

    const uniqueMovies = Array.from(
      new Map(
        results.flat()
          .filter(movie => {
            if (!movie || !movie.imdbID) return false;
            const year = parseInt(movie.Year);
            // Include movies from current and previous year
            return !isNaN(year) && year >= previousYear;
          })
          .map(movie => [movie.imdbID, movie])
      ).values()
    )
    .sort((a, b) => {
      const yearDiff = parseInt(b.Year) - parseInt(a.Year);
      return yearDiff !== 0 ? yearDiff : a.Title.localeCompare(b.Title);
    });

    console.log('Total unique movies found:', uniqueMovies.length);

    return {
      Search: uniqueMovies.slice(0, 20),
      totalResults: String(uniqueMovies.length),
      Response: uniqueMovies.length > 0 ? "True" : "False"
    };
  } catch (error) {
    console.error("Error in getNewReleases:", error);
    return { 
      Search: [], 
      totalResults: "0", 
      Response: "False" 
    }; 
  }
}