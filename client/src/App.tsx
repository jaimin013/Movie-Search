import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import MovieDetails from "@/pages/movie/[id]";
import TopRated from "@/pages/top-rated";
import NewReleases from "@/pages/new-releases";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/top-rated" component={TopRated} />
      <Route path="/new-releases" component={NewReleases} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;