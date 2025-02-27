import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getMovie, getMoviePosterUrl } from "@/lib/omdb"; 
import { motion } from "framer-motion";
import { Star, Calendar, Clock, User, Video, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MovieDetails() {
  const { id } = useParams();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["/api/movies", id],
    queryFn: () => getMovie(id as string),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 animate-pulse">
        <div className="h-[400px] bg-muted rounded-lg mb-8" />
        <div className="h-8 bg-muted rounded w-1/2 mb-4" />
        <div className="h-4 bg-muted rounded w-1/4 mb-8" />
        <div className="h-20 bg-muted rounded" />
      </div>
    );
  }

  if (!movie) return null;

  const posterUrl = getMoviePosterUrl(movie.Poster);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </motion.div>
        </Link>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {posterUrl && (
            <motion.img
              src={posterUrl}
              alt={movie.Title}
              className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <motion.div
            className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)]"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {movie.Title}
            </motion.h1>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="w-5 h-5 text-yellow-500" />
                <span>{movie.imdbRating}/10</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-5 h-5" />
                <span>{movie.Year}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-5 h-5" />
                <span>{movie.Runtime}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Video className="w-5 h-5" />
                <span>{movie.Genre}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {movie.Plot}
              </motion.p>

              <motion.div
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <User className="w-5 h-5" />
                <span className="font-semibold">Director:</span>
                <span>{movie.Director}</span>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <span className="font-semibold">Cast:</span>
                <p>{movie.Actors}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
