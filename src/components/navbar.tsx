import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { ShoppingCart, Search, Menu, Gamepad2 } from "lucide-react";
import { Input } from "./ui/input";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-700 bg-gray-900 py-4 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            prefetch
            className="text-2xl font-bold flex items-center gap-2"
          >
            <Gamepad2 className="h-8 w-8 text-purple-400" />
            <span className="hidden md:inline">NerdHaven</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/category/games"
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Games
          </Link>
          <Link
            href="/category/collectibles"
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Collectibles
          </Link>
          <Link
            href="/category/apparel"
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            Apparel
          </Link>
          <Link
            href="/new-releases"
            className="text-gray-300 hover:text-purple-400 font-medium"
          >
            New Releases
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative hidden md:flex items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-64 bg-gray-800 border-gray-700 text-white pr-10"
            />
            <Search className="h-4 w-4 absolute right-3 text-gray-400" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-purple-400"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-purple-400 relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>

          {user ? (
            <UserProfile />
          ) : (
            <div className="hidden md:flex gap-4 items-center">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-400"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-purple-400"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
