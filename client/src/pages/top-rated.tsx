import { motion } from "framer-motion";
import { MovieCard } from "@/components/movie-card";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { getTopRatedMovies } from "@/lib/omdb";

// Import Movie type
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

export default function TopRated() {
  const { data: movieData, isLoading } = useQuery({
    queryKey: ["/api/movies/top-rated"],
    queryFn: () => getTopRatedMovies(), 
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Top Rated Movies</h1>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
            <Star className="w-6 h-6 fill-current" />
          </div>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover the highest-rated movies of all time, from timeless
            classics to modern masterpieces
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieData?.Search?.map((movie: Movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
