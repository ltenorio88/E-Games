"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Package,
  ShoppingCart,
  Users,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-700 bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch className="text-xl font-bold">
            NerdHaven
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/admin"
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" /> Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <Package className="h-4 w-4" /> Products
            </Link>
            <Link
              href="/admin/categories"
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" /> Categories
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> Orders
            </Link>
            <Link
              href="/admin/customers"
              className="text-gray-300 hover:text-white flex items-center gap-2"
            >
              <Users className="h-4 w-4" /> Customers
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            <Home className="h-5 w-5" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
