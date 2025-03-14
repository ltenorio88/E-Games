import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
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
    { id: 1, name: "Cyberpunk 2077", price: 59.99, category: "games", stock: 15, status: "In Stock" },
    { id: 2, name: "Elden Ring", price: 69.99, category: "games", stock: 10, status: "In Stock" },
    { id: 3, name: "Zelda: Tears of the Kingdom", price: 59.99, category: "games", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Baldur's Gate 3", price: 59.99, category: "games", stock: 5, status: "Low Stock" },
    { id: 5, name: "Darth Vader Figurine", price: 29.99, category: "collectibles", stock: 8, status: "In Stock" },
    { id: 6, name: "Pokemon Card Set", price: 19.99, category: "collectibles", stock: 20, status: "In Stock" },
    { id: 7, name: "Marvel Legends Series", price: 24.99, category: "collectibles", stock: 3, status: "Low Stock" },
    { id: 8, name: "Anime Figurine Collection", price: 39.99, category: "collectibles", stock: 0, status: "Out of Stock" },
    { id: 9, name: "Gaming T-Shirt", price: 24.99, category: "apparel", stock: 25, status: "In Stock" },
    { id: 10, name: "Retro Gaming Hoodie", price: 49.99, category: "apparel", stock: 12, status: "In Stock" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products Management</h1>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Link>
          </Button>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Product Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input 
                  placeholder="Search products..." 
                  className="bg-gray-700 border-gray-600 text-white"
                  icon={<Search className="h-4 w-4 text-gray-400" />}
                />
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">All Categories</option>
                  <option value="games">Games</option>
                  <option value="collectibles">Collectibles</option>
                  <option value="apparel">Apparel</option>
                </select>
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">All Stock Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">Sort By</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
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
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Product Name</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Stock</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="py-3 px-4">#{product.id}</td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4 capitalize">{product.category}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'In Stock' ? 'bg-green-500/20 text-green-400' : product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="outline" className="h-8 w-8