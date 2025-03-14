import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Search, Download } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function OrdersManagement() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john.doe@example.com",
      date: "2023-06-15",
      total: 59.99,
      status: "Completed",
      items: 1,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2023-06-14",
      total: 69.99,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      email: "mike.johnson@example.com",
      date: "2023-06-13",
      total: 24.99,
      status: "Completed",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      email: "sarah.williams@example.com",
      date: "2023-06-12",
      total: 29.99,
      status: "Shipped",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Alex Brown",
      email: "alex.brown@example.com",
      date: "2023-06-11",
      total: 49.99,
      status: "Completed",
      items: 1,
    },
    {
      id: "ORD-006",
      customer: "Emily Davis",
      email: "emily.davis@example.com",
      date: "2023-06-10",
      total: 114.98,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-007",
      customer: "David Wilson",
      email: "david.wilson@example.com",
      date: "2023-06-09",
      total: 89.97,
      status: "Shipped",
      items: 3,
    },
    {
      id: "ORD-008",
      customer: "Lisa Taylor",
      email: "lisa.taylor@example.com",
      date: "2023-06-08",
      total: 129.99,
      status: "Completed",
      items: 2,
    },
    {
      id: "ORD-009",
      customer: "Robert Martin",
      email: "robert.martin@example.com",
      date: "2023-06-07",
      total: 39.99,
      status: "Cancelled",
      items: 1,
    },
    {
      id: "ORD-010",
      customer: "Jennifer Anderson",
      email: "jennifer.anderson@example.com",
      date: "2023-06-06",
      total: 149.97,
      status: "Completed",
      items: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" /> Export Orders
          </Button>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Order Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search orders..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="From Date"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Input
                  type="date"
                  placeholder="To Date"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-700/50">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-400">
                            {order.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${order.status === "Completed" ? "bg-green-500/20 text-green-400" : order.status === "Processing" ? "bg-blue-500/20 text-blue-400" : order.status === "Shipped" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="h-8 px-3"
                        >
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
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
