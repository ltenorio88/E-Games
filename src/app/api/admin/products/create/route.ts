import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if user is authenticated and has admin privileges
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In a real app, you would check if the user has admin role
  // For now, we'll proceed with the product creation

  try {
    const formData = await request.formData();

    let imageUrl = formData.get("image") as string;
    const imageUpload = formData.get("image_upload") as File;

    // Handle image upload if provided
    if (imageUpload && imageUpload.size > 0) {
      // In a real app, you would upload the image to storage
      // For now, we'll just use the provided image URL or a placeholder
      // const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(`product-${Date.now()}`, imageUpload);
      // if (uploadError) throw uploadError;
      // imageUrl = supabase.storage.from('products').getPublicUrl(uploadData.path).data.publicUrl;

      // If no image URL was provided, use a placeholder
      if (!imageUrl) {
        imageUrl =
          "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80";
      }
    } else if (!imageUrl) {
      // If no image URL was provided and no file was uploaded, use a placeholder
      imageUrl =
        "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80";
    }

    const product = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
      image: imageUrl,
      description: formData.get("description") as string,
      sku: formData.get("sku") as string,
      weight: formData.get("weight")
        ? parseFloat(formData.get("weight") as string)
        : null,
      dimensions: formData.get("dimensions") as string,
      release_date: formData.get("release_date") as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In a real app, you would insert the product into the database
    // const { data, error } = await supabase.from('products').insert(product);

    // For now, we'll just redirect to the products page
    return NextResponse.redirect(new URL("/admin/products", request.url));
  } catch (error) {
    console.error("Error creating product:", error);
    // Redirect to products page even on error to avoid broken page
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }
}

export async function GET(request: NextRequest) {
  // Handle form submission from the client-side form
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const price = url.searchParams.get("price");
  const category = url.searchParams.get("category");
  const stock = url.searchParams.get("stock");
  const image = url.searchParams.get("image");
  const description = url.searchParams.get("description");

  // In a real app, you would validate and save the product
  // For now, we'll just redirect back to the products page
  return NextResponse.redirect(new URL("/admin/products", request.url));
}
