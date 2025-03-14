import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { createClient } from "../../../../supabase/server";

export default async function GamesCategory() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data - in a real app, this would come from a database
  const games = [
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
    {
      id: 13,
      name: "God of War Ragnarök",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&q=80",
      category: "games",
    },
    {
      id: 14,
      name: "Horizon Forbidden West",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
      category: "games",
    },
    {
      id: 15,
      name: "Final Fantasy XVI",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
      category: "games",
    },
    {
      id: 16,
      name: "Starfield",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=500&q=80",
      category: "games",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Games</h1>
          <p className="text-gray-300">
            Browse our selection of the latest and greatest video games
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <ProductCard key={game.id} product={game} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
