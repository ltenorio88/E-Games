import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Input } from "./ui/input";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full bg-gray-900 py-4 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center gap-2"
          >
            <img
              src="/images/lifegames-logo.svg"
              alt="LifeGames"
              className="h-8"
            />
            LifeGames
          </Link>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/category/games"
            className="text-white hover:text-purple-400"
          >
            Jogos
          </Link>
          <Link
            href="/category/collectibles"
            className="text-white hover:text-purple-400"
          >
            Colecionáveis
          </Link>
          <Link
            href="/category/apparel"
            className="text-white hover:text-purple-400"
          >
            Vestuário
          </Link>
        </div>

        <div className="relative hidden md:block flex-1 mx-8 max-w-md">
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="w-full bg-gray-800 border-gray-700 text-white pr-10"
          />
          <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-purple-400 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
              <UserProfile />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-purple-400 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
              <div className="hidden md:flex gap-4 items-center">
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="bg-blue-600 text-white border-blue-500 hover:bg-white hover:text-purple-600"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-purple-600 hover:bg-white hover:text-purple-600 text-white border border-purple-600">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-purple-400"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
