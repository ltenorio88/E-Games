import { createClient } from "../../../../../../supabase/server";
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

interface EditProductProps {
  params: {
    id: string;
  };
}

export default async function EditProduct({ params }: EditProductProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

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
      stock: 15,
      sku: "SKU-000001",
      weight: 0.3,
      dimensions: "15 x 10 x 1",
      release_date: "2020-12-10",
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
      stock: 10,
      sku: "SKU-000002",
      weight: 0.3,
      dimensions: "15 x 10 x 1",
      release_date: "2022-02-25",
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
      stock: 8,
      sku: "SKU-000005",
      weight: 0.5,
      dimensions: "20 x 10 x 30",
      release_date: "2023-05-04",
    },
  ];

  const product =
    allProducts.find((p) => p.id === parseInt(params.id)) || allProducts[0];

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
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <form
            action="/api/admin/products/update"
            method="post"
            encType="multipart/form-data"
          >
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update the details for this product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <input type="hidden" name="id" value={product.id} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={product.name}
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
                    defaultValue={product.price}
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
                    defaultValue={product.category}
                    className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    required
                  >
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
                    defaultValue={product.stock}
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
                      defaultValue={product.image}
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
                    defaultValue={product.sku}
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
                  defaultValue={product.description}
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
                    defaultValue={product.weight}
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
                    defaultValue={product.dimensions}
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
                    defaultValue={product.release_date}
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
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  asChild
                >
                  <Link href={`/api/admin/products/delete?id=${product.id}`}>
                    Delete Product
                  </Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Update Product
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
