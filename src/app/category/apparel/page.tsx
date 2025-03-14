import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { createClient } from "../../../../supabase/server";

export default async function ApparelCategory() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data - in a real app, this would come from a database
  const apparel = [
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
    {
      id: 21,
      name: "Pixel Art Sweater",
      price: 54.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
      category: "apparel",
    },
    {
      id: 22,
      name: "Gaming Character Jacket",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&q=80",
      category: "apparel",
    },
    {
      id: 23,
      name: "Esports Team Jersey",
      price: 64.99,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
      category: "apparel",
    },
    {
      id: 24,
      name: "Gamer Beanie",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
      category: "apparel",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Apparel</h1>
          <p className="text-gray-300">
            Show your gaming passion with our stylish apparel collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apparel.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
