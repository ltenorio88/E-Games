import Link from "next/link";
import { ArrowUpRight, Gamepad2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-gray-900 to-gray-900 opacity-90" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Gamepad2 className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              Level Up Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {" "}
                Gaming{" "}
              </span>
              Experience
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover the latest games, collectibles, and apparel for every
              type of gamer and nerd culture enthusiast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              >
                <Link href="/category/games">
                  Shop Games
                  <ShoppingCart className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-6 text-lg"
              >
                <Link href="/category/collectibles">
                  Browse Collectibles
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
