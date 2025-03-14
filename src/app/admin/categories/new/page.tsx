import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewCategory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get parent categories for dropdown
  const parentCategories = [
    { id: 1, name: "Games", slug: "games" },
    { id: 2, name: "Collectibles", slug: "collectibles" },
    { id: 3, name: "Apparel", slug: "apparel" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            asChild
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Link href="/admin/categories">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Category</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <form action="/api/admin/categories/create" method="post">
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details for the new category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Category Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter category name"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-gray-300">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="category-slug"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent_category" className="text-gray-300">
                    Parent Category (Optional)
                  </Label>
                  <select
                    id="parent_category"
                    name="parent_category"
                    className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">None (Top-level Category)</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order" className="text-gray-300">
                    Display Order
                  </Label>
                  <Input
                    id="display_order"
                    name="display_order"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter category description"
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-300">
                  Category Image (Optional)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <div>
                    <Input
                      id="image_upload"
                      name="image_upload"
                      type="file"
                      accept="image/*"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Recommended image size: 800x400px, max 2MB. Supported formats:
                  JPG, PNG, WebP.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                    defaultChecked
                  />
                  <Label htmlFor="is_active" className="text-gray-300 ml-2">
                    Active (visible on the site)
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-700 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                asChild
              >
                <Link href="/admin/categories">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Create Category
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
