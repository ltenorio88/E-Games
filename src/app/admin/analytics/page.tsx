import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";

export default async function AnalyticsDashboard() {
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex gap-4">
            <div className="flex items-center bg-gray-800 rounded-md px-3">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <select className="bg-transparent border-none text-sm py-2 pr-8 text-gray-300 focus:outline-none">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-gray-500" />
                <p className="text-gray-500 ml-4">
                  Revenue chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Orders by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-500" />
                <p className="text-gray-500 ml-4">
                  Category distribution chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold text-purple-400">3.2%</div>
                <p className="text-sm text-gray-400 mt-2">Visitors to Customers</p>
                <div className="text-xs text-green