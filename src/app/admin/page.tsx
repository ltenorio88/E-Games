import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real app, you would check if the user has admin privileges
  // For now, we'll assume all authenticated users can access the admin dashboard

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Link href="/admin/products">Manage Products</Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/admin/products/new">Add New Product</Link>
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$12,628</h3>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">256</h3>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8.2%
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Customers</p>
                  <h3 className="text-2xl font-bold mt-1">1,024</h3>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5.3%
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">128</h3>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +2.1%
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Package className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription className="text-gray-400">
                Monthly revenue for the current year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-500" />
                <p className="text-gray-500 ml-4">
                  Sales chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription className="text-gray-400">
                Visitor to customer conversion rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-gray-500" />
                <p className="text-gray-500 ml-4">
                  Conversion chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Orders</CardTitle>
              <Button
                variant="link"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto flex items-center"
              >
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "ORD-001",
                      customer: "John Doe",
                      product: "Cyberpunk 2077",
                      date: "2023-06-15",
                      amount: "$59.99",
                      status: "Completed",
                    },
                    {
                      id: "ORD-002",
                      customer: "Jane Smith",
                      product: "Elden Ring",
                      date: "2023-06-14",
                      amount: "$69.99",
                      status: "Processing",
                    },
                    {
                      id: "ORD-003",
                      customer: "Mike Johnson",
                      product: "Gaming T-Shirt",
                      date: "2023-06-13",
                      amount: "$24.99",
                      status: "Completed",
                    },
                    {
                      id: "ORD-004",
                      customer: "Sarah Williams",
                      product: "Darth Vader Figurine",
                      date: "2023-06-12",
                      amount: "$29.99",
                      status: "Shipped",
                    },
                    {
                      id: "ORD-005",
                      customer: "Alex Brown",
                      product: "Retro Gaming Hoodie",
                      date: "2023-06-11",
                      amount: "$49.99",
                      status: "Completed",
                    },
                  ].map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${order.status === "Completed" ? "bg-green-500/20 text-green-400" : order.status === "Processing" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}
                        >
                          {order.status}
                        </span>
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
