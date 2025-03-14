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

export default async function NewProduct() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

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
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <form
            action="/api/admin/products/create"
            method="POST"
            encType="multipart/form-data"
          >
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details for the new product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-300">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="games">Games</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="apparel">Apparel</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-gray-300">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-gray-300">
                    Image URL or Upload
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
                    Recommended image size: 800x800px, max 2MB. Supported
                    formats: JPG, PNG, WebP.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku" className="text-gray-300">
                    SKU (Stock Keeping Unit)
                  </Label>
                  <Input
                    id="sku"
                    name="sku"
                    placeholder="SKU-123456"
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
                  placeholder="Enter product description"
                  className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-gray-300">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions" className="text-gray-300">
                    Dimensions (cm)
                  </Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    placeholder="L x W x H"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="release_date" className="text-gray-300">
                    Release Date
                  </Label>
                  <Input
                    id="release_date"
                    name="release_date"
                    type="date"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
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
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Create Product
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
