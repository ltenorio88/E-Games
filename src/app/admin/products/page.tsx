import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Search, ArrowLeft, Folder } from "lucide-react";
import CategoryFilter from "./category-filter";
import StockFilter from "./stock-filter";
import SortFilter from "./sort-filter";
import SearchForm from "./search-form";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function ProductsManagement() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database
  const products = [
    {
      id: 1,
      name: "Cyberpunk 2077",
      price: 59.99,
      category: "games",
      stock: 15,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Elden Ring",
      price: 69.99,
      category: "games",
      stock: 10,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Zelda: Tears of the Kingdom",
      price: 59.99,
      category: "games",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Baldur's Gate 3",
      price: 59.99,
      category: "games",
      stock: 5,
      status: "Low Stock",
    },
    {
      id: 5,
      name: "Darth Vader Figurine",
      price: 29.99,
      category: "collectibles",
      stock: 8,
      status: "In Stock",
    },
    {
      id: 6,
      name: "Pokemon Card Set",
      price: 19.99,
      category: "collectibles",
      stock: 20,
      status: "In Stock",
    },
    {
      id: 7,
      name: "Marvel Legends Series",
      price: 24.99,
      category: "collectibles",
      stock: 3,
      status: "Low Stock",
    },
    {
      id: 8,
      name: "Anime Figurine Collection",
      price: 39.99,
      category: "collectibles",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 9,
      name: "Gaming T-Shirt",
      price: 24.99,
      category: "apparel",
      stock: 25,
      status: "In Stock",
    },
    {
      id: 10,
      name: "Retro Gaming Hoodie",
      price: 49.99,
      category: "apparel",
      stock: 12,
      status: "In Stock",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Products Management</h1>
          </div>
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Link href="/admin/categories">
                <Folder className="mr-2 h-4 w-4" /> Manage Categories
              </Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Link>
            </Button>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Product Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <SearchForm />
              </div>
              <div>
                <CategoryFilter />
              </div>
              <div>
                <StockFilter />
              </div>
              <div>
                <SortFilter />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Product Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">#{product.id}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4 capitalize">
                        {product.category}
                      </td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${product.status === "In Stock" ? "bg-green-500/20 text-green-400" : product.status === "Low Stock" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Link
                              href={`/api/admin/products/delete?id=${product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
