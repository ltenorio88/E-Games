import ProductCard from "./product-card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink: string;
  bgColor?: string;
}

export default function ProductGrid({
  title,
  products,
  viewAllLink,
  bgColor = "bg-gray-900",
}: ProductGridProps) {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link
            href={viewAllLink}
            className="text-purple-400 hover:text-purple-300 flex items-center"
          >
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
