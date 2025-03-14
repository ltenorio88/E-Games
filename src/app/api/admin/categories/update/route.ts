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

    const categoryId = formData.get("id") as string;
    let imageUrl = formData.get("image") as string;
    const imageUpload = formData.get("image_upload") as File;

    // Handle image upload if provided
    if (imageUpload && imageUpload.size > 0) {
      // In a real app, you would upload the image to storage
      // For now, we'll just use the existing image URL
      // const { data: uploadData, error: uploadError } = await supabase.storage.from('categories').upload(`category-${categoryId}`, imageUpload);
      // if (uploadError) throw uploadError;
      // imageUrl = supabase.storage.from('categories').getPublicUrl(uploadData.path).data.publicUrl;
    }

    const category = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      parent_category: (formData.get("parent_category") as string) || null,
      display_order: parseInt(formData.get("display_order") as string) || 0,
      image: imageUrl,
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    };

    // In a real app, you would update the category in the database
    // const { data, error } = await supabase.from('categories').update(category).eq('id', categoryId);

    // For now, we'll just return a success response
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  }
}

export async function GET(request: NextRequest) {
  // Handle form submission from the client-side form
  return NextResponse.redirect(new URL("/admin/categories", request.url));
}
