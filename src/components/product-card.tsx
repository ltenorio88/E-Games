"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
            onClick={() => console.log(`Added ${product.name} to cart`)}
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
