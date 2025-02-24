import { motion } from "framer-motion";
import { getMoviePosterUrl } from "@/lib/omdb";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "wouter";
import type { OMDBMovie } from "@/lib/omdb";

interface MovieCardProps {
  movie: OMDBMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getMoviePosterUrl(movie.Poster);

  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="cursor-pointer"
      >
        <Card className="relative overflow-hidden h-[400px] bg-background transform-gpu transition-shadow duration-300 hover:shadow-xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)]">
          <motion.div
            className="w-full h-[300px] relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full h-full object-cover transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                No Image Available
              </div>
            )}
          </motion.div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{movie.Title}</h3>
            <motion.div
              className="flex items-center mt-2 space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-muted-foreground">{movie.Year}</span>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
