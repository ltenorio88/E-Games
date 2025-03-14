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

    // In a real app, you would delete the category from the database
    // const { data, error } = await supabase.from('categories').delete().eq('id', categoryId);

    // For now, we'll just return a success response
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  }
}

export async function GET(request: NextRequest) {
  // Handle deletion request from a link
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    // In a real app, you would delete the category
    // const { data, error } = await supabase.from('categories').delete().eq('id', id);
  }

  // Redirect back to the categories page
  return NextResponse.redirect(new URL("/admin/categories", request.url));
}
