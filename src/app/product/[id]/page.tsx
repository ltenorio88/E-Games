import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import Image from "next/image";
import { createClient } from "../../../../supabase/server";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock data - in a real app, this would come from a database lookup using the ID
  const allProducts = [
    {
      id: 1,
      name: "Cyberpunk 2077",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
      category: "games",
      description:
        "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
      rating: 4.5,
      stock: 15,
    },
    {
      id: 2,
      name: "Elden Ring",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1616729557461-7e5b21ade4e0?w=800&q=80",
      category: "games",
      description:
        "Elden Ring is an action RPG which takes place in the Lands Between, sometime after the Shattering of the titular Elden Ring.",
      rating: 4.8,
      stock: 10,
    },
    {
      id: 5,
      name: "Darth Vader Figurine",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800&q=80",
      category: "collectibles",
      description:
        "High-quality Darth Vader figurine with incredible detail. Perfect for Star Wars collectors and fans.",
      rating: 4.7,
      stock: 8,
    },
    {
      id: 9,
      name: "Gaming T-Shirt",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      category: "apparel",
      description:
        "Comfortable cotton t-shirt with gaming-inspired design. Available in multiple sizes.",
      rating: 4.3,
      stock: 25,
    },
  ];

  const product =
    allProducts.find((p) => p.id === parseInt(params.id)) || allProducts[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-500"}`}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-300">
                {product.rating} ({Math.floor(Math.random() * 500) + 50}{" "}
                reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-purple-400 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-300 mb-8">{product.description}</p>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-1">Availability:</div>
              <div
                className={`font-medium ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Category:</div>
                  <div className="capitalize">{product.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">SKU:</div>
                  <div>SKU-{product.id.toString().padStart(6, "0")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
