import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  Gamepad2,
  Trophy,
  ShoppingCart,
  Star,
  Truck,
  CreditCard,
} from "lucide-react";
import { Shirt } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Featured products (would come from database in a real implementation)
  const featuredGames = [
    {
      id: 1,
      name: "Cyberpunk 2077",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80",
      category: "games",
    },
    {
      id: 2,
      name: "Elden Ring",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1616729557461-7e5b21ade4e0?w=500&q=80",
      category: "games",
    },
    {
      id: 3,
      name: "Zelda: Tears of the Kingdom",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=500&q=80",
      category: "games",
    },
    {
      id: 4,
      name: "Baldur's Gate 3",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80",
      category: "games",
    },
  ];

  const featuredCollectibles = [
    {
      id: 5,
      name: "Darth Vader Figurine",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 6,
      name: "Pokemon Card Set",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 7,
      name: "Marvel Legends Series",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1559535332-db9971090158?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 8,
      name: "Anime Figurine Collection",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=500&q=80",
      category: "collectibles",
    },
  ];

  const featuredApparel = [
    {
      id: 9,
      name: "Gaming T-Shirt",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
      category: "apparel",
    },
    {
      id: 10,
      name: "Retro Gaming Hoodie",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      category: "apparel",
    },
    {
      id: 11,
      name: "Gamer Cap",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
      category: "apparel",
    },
    {
      id: 12,
      name: "Console Socks Set",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&q=80",
      category: "apparel",
    },
  ];

  // Banner promotions
  const bannerPromotions = [
    {
      id: 1,
      title: "Summer Gaming Sale",
      description: "Up to 50% off on the latest games and accessories",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
      cta: "Shop Now",
      link: "/category/games",
    },
    {
      id: 2,
      title: "Collector's Edition",
      description: "Limited edition collectibles just arrived",
      image:
        "https://images.unsplash.com/photo-1642229407671-d6c61b8bc1b7?w=1200&q=80",
      cta: "View Collection",
      link: "/category/collectibles",
    },
    {
      id: 3,
      title: "New Apparel Line",
      description: "Show your gaming passion with our new apparel",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200&q=80",
      cta: "Discover More",
      link: "/category/apparel",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Banner Carousel Section */}
      <section className="relative overflow-hidden">
        <Carousel
          className="w-full"
          opts={{ loop: true, align: "start" }}
          autoplay={true}
          interval={5000}
        >
          <CarouselContent>
            {bannerPromotions.map((promo) => (
              <CarouselItem key={promo.id}>
                <div className="relative h-[500px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-10 md:p-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                      {promo.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90">
                      {promo.description}
                    </p>
                    <Button
                      size="lg"
                      asChild
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Link href={promo.link}>
                        {promo.cta}
                        <ArrowUpRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/category/games" className="group">
              <div className="bg-gray-800 rounded-xl p-8 text-center transition-all hover:bg-purple-700 hover:shadow-xl">
                <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-purple-400 group-hover:text-white" />
                <h3 className="text-2xl font-semibold">Games</h3>
                <p className="mt-2 text-gray-300">
                  Latest releases and classics
                </p>
              </div>
            </Link>
            <Link href="/category/collectibles" className="group">
              <div className="bg-gray-800 rounded-xl p-8 text-center transition-all hover:bg-purple-700 hover:shadow-xl">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-400 group-hover:text-white" />
                <h3 className="text-2xl font-semibold">Collectibles</h3>
                <p className="mt-2 text-gray-300">Figures, cards, and more</p>
              </div>
            </Link>
            <Link href="/category/apparel" className="group">
              <div className="bg-gray-800 rounded-xl p-8 text-center transition-all hover:bg-purple-700 hover:shadow-xl">
                <Shirt className="w-16 h-16 mx-auto mb-4 text-purple-400 group-hover:text-white" />
                <h3 className="text-2xl font-semibold">Apparel</h3>
                <p className="mt-2 text-gray-300">Gaming-inspired clothing</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Games</h2>
            <Link
              href="/category/games"
              className="text-purple-400 hover:text-purple-300 flex items-center"
            >
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((product) => (
              <div
                key={product.id}
                className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collectibles Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Collectibles</h2>
            <Link
              href="/category/collectibles"
              className="text-purple-400 hover:text-purple-300 flex items-center"
            >
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCollectibles.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apparel Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Apparel</h2>
            <Link
              href="/category/apparel"
              className="text-purple-400 hover:text-purple-300 flex items-center"
            >
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApparel.map((product) => (
              <div
                key={product.id}
                className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Gaming Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up for exclusive offers, early access to new releases, and
            special events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100"
            >
              <Link href="/sign-up">Create Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
