import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Film } from "lucide-react";
import { motion } from "framer-motion";

const menuAnimation = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 }
};

const MenuLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <NavigationMenuLink asChild>
    <Link href={href}>
      <div className="cursor-pointer">{children}</div>
    </Link>
  </NavigationMenuLink>
);

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Film className="w-6 h-6" />
              <span className="text-xl font-bold">MovieMaster</span>
            </motion.div>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <motion.div {...menuAnimation}>Discover</motion.div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul 
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li className="row-span-3">
                      <MenuLink href="/top-rated">
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:bg-gradient-to-b hover:from-primary/20 hover:to-primary/5">
                          <Film className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Top Rated Movies
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover the highest-rated movies of all time
                          </p>
                        </div>
                      </MenuLink>
                    </li>
                    <li>
                      <MenuLink href="/new-releases">
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">New Releases</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Latest movies in theaters and streaming
                          </p>
                        </div>
                      </MenuLink>
                    </li>
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}