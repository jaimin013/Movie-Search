import { MovieCard } from "./movie-card";
import { motion } from "framer-motion";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

interface OMDBSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

interface MovieGridProps {
  searchResponse?: OMDBSearchResponse;
  loading?: boolean;
}

export function MovieGrid({ searchResponse, loading }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-[400px] bg-muted animate-pulse rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (!searchResponse?.Search || searchResponse.Search.length === 0) {
    return (
      <motion.div 
        className="text-center text-muted-foreground py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        No movies found. Try a different search term.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {searchResponse.Search.map((movie, index) => (
        <motion.div
          key={movie.imdbID}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MovieCard movie={movie} />
        </motion.div>
      ))}
    </motion.div>
  );
}