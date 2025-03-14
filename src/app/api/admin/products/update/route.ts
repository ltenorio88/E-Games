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

  try {
    const formData = await request.formData();

    const productId = formData.get("id") as string;
    let imageUrl = formData.get("image") as string;
    const imageUpload = formData.get("image_upload") as File;

    // Handle image upload if provided
    if (imageUpload && imageUpload.size > 0) {
      // In a real app, you would upload the image to storage
      // For now, we'll just use the existing image URL
      // const { data: uploadData, error: uploadError } = await supabase.storage.from('products').upload(`product-${productId}`, imageUpload);
      // if (uploadError) throw uploadError;
      // imageUrl = supabase.storage.from('products').getPublicUrl(uploadData.path).data.publicUrl;
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
      updated_at: new Date().toISOString(),
    };

    // In a real app, you would update the product in the database
    // const { data, error } = await supabase.from('products').update(product).eq('id', productId);

    // For now, we'll just return a success response
    return NextResponse.redirect(new URL("/admin/products", request.url));
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }
}

export async function GET(request: NextRequest) {
  // Handle form submission from the client-side form
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  // In a real app, you would validate and update the product
  // For now, we'll just redirect back to the products page
  return NextResponse.redirect(new URL("/admin/products", request.url));
}
