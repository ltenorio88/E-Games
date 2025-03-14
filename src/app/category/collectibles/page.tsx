import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { createClient } from "../../../../supabase/server";

export default async function CollectiblesCategory() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data - in a real app, this would come from a database
  const collectibles = [
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
    {
      id: 17,
      name: "Star Wars Helmet Replica",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 18,
      name: "Dungeons & Dragons Dice Set",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 19,
      name: "Retro Gaming Console",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&q=80",
      category: "collectibles",
    },
    {
      id: 20,
      name: "Limited Edition Art Book",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
      category: "collectibles",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Collectibles</h1>
          <p className="text-gray-300">
            Discover unique collectibles from your favorite franchises
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectibles.map((collectible) => (
            <ProductCard key={collectible.id} product={collectible} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
