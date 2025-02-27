import { motion } from "framer-motion";
import { MovieCard } from "@/components/movie-card";
import { useQuery } from "@tanstack/react-query";
import { Film, Loader2 } from "lucide-react";
import { getNewReleases } from "@/lib/omdb";
import type { OMDBMovie } from "@/lib/omdb";

export default function NewReleases() {
  const currentYear = 2024; // Hardcode to actual current year for movie data

  const {
    data: movieData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/movies/new-releases"],
    queryFn: getNewReleases,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">New Releases</h1>
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Film className="w-6 h-6" />
            <span className="text-lg font-medium">{currentYear}</span>
          </div>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover the latest movie releases of {currentYear} and{" "}
            {currentYear - 1}
          </p>
        </motion.div>

        {error ? (
          <motion.div
            className="flex flex-col items-center justify-center p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-destructive mb-2">
              {error instanceof Error
                ? error.message
                : "Unable to load new releases"}
            </div>
            <p className="text-muted-foreground">
              Please try again later or check your internet connection.
            </p>
          </motion.div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-[400px] bg-muted animate-pulse rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground/50" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : movieData?.Search && movieData.Search.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {movieData.Search.map((movie: OMDBMovie) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Film className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">
              No new releases found at the moment.
            </p>
            <p className="text-sm text-muted-foreground/75 mt-2">
              Please check back later for updates.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
