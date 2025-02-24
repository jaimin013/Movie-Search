import { Mail, Github, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-accent/5 py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* company info */}
          <div>
            <h3 className="font-bold text-lg mb-4">MovieMaster</h3>
            <p className="text-muted-foreground">
              Your ultimate destination for discovering and exploring movies from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="text-muted-foreground hover:text-primary transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-muted-foreground hover:text-primary transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-muted-foreground">
              Stay connected with us on social media for the latest updates.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MovieMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}