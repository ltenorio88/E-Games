import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CategoriesManagement() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database
  const categories = [
    {
      id: 1,
      name: "Games",
      slug: "games",
      description: "Video games for various platforms",
      product_count: 8,
    },
    {
      id: 2,
      name: "Collectibles",
      slug: "collectibles",
      description: "Figurines, cards, and memorabilia",
      product_count: 8,
    },
    {
      id: 3,
      name: "Apparel",
      slug: "apparel",
      description: "Gaming-inspired clothing and accessories",
      product_count: 8,
    },
    {
      id: 4,
      name: "PC Games",
      slug: "pc-games",
      description: "Games for personal computers",
      product_count: 4,
      parent_category: "Games",
    },
    {
      id: 5,
      name: "Console Games",
      slug: "console-games",
      description: "Games for gaming consoles",
      product_count: 4,
      parent_category: "Games",
    },
    {
      id: 6,
      name: "Figurines",
      slug: "figurines",
      description: "Collectible character figurines",
      product_count: 4,
      parent_category: "Collectibles",
    },
    {
      id: 7,
      name: "T-Shirts",
      slug: "t-shirts",
      description: "Gaming-themed t-shirts",
      product_count: 4,
      parent_category: "Apparel",
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
            <h1 className="text-3xl font-bold">Categories Management</h1>
          </div>
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/admin/categories/new">
                <Plus className="mr-2 h-4 w-4" /> Add New Category
              </Link>
            </Button>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Slug
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Parent Category
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Products
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">#{category.id}</td>
                      <td className="py-3 px-4 font-medium">{category.name}</td>
                      <td className="py-3 px-4">{category.slug}</td>
                      <td className="py-3 px-4">
                        {category.parent_category || "-"}
                      </td>
                      <td className="py-3 px-4">{category.product_count}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Link
                              href={`/admin/categories/edit/${category.id}`}
                            >
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
                              href={`/api/admin/categories/delete?id=${category.id}`}
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
