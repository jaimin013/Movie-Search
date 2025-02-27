import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/search-bar";
import { MovieGrid } from "@/components/movie-grid";
import { Film, Clock, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { searchMovies } from "@/lib/omdb";

const features = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Top Rated",
    description: "Discover critically acclaimed movies",
  },
  {
    icon: <Film className="w-6 h-6" />,
    title: "Latest Releases",
    description: "Stay updated with new releases",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Coming Soon",
    description: "Get excited for upcoming movies",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Trending Now",
    description: "See what's popular",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResponse, isLoading } = useQuery({
    queryKey: ["/search/movies", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: !!searchQuery,
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Discover Your Next Favorite Movie
        </motion.h1>
        <motion.p
          className="text-xl text-center text-muted-foreground mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Search through millions of movies, get recommendations, and explore
          the world of cinema
        </motion.p>

        <div className="flex flex-col items-center gap-4 mb-12">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="container mx-auto px-4 py-8">
          <MovieGrid searchResponse={searchResponse} loading={isLoading} />
        </section>
      )}

      {/* Features Section */}
      {!searchQuery && (
        <section className="container mx-auto px-4 py-16 bg-accent/5">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Movies Like Never Before
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg bg-background shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.5)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
