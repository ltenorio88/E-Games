import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Search, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function CustomersManagement() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      joined: "2023-01-15",
      orders: 5,
      spent: 299.95,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      joined: "2023-02-20",
      orders: 3,
      spent: 189.97,
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      joined: "2023-03-10",
      orders: 2,
      spent: 79.98,
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      joined: "2023-04-05",
      orders: 1,
      spent: 29.99,
      status: "Active",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@example.com",
      joined: "2023-05-12",
      orders: 4,
      spent: 219.96,
      status: "Active",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      joined: "2023-06-18",
      orders: 0,
      spent: 0,
      status: "Inactive",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      joined: "2023-07-22",
      orders: 2,
      spent: 129.98,
      status: "Active",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      email: "lisa.taylor@example.com",
      joined: "2023-08-30",
      orders: 1,
      spent: 59.99,
      status: "Active",
    },
    {
      id: 9,
      name: "Robert Martin",
      email: "robert.martin@example.com",
      joined: "2023-09-14",
      orders: 0,
      spent: 0,
      status: "Inactive",
    },
    {
      id: 10,
      name: "Jennifer Anderson",
      email: "jennifer.anderson@example.com",
      joined: "2023-10-05",
      orders: 3,
      spent: 149.97,
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customers Management</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" /> Email Customers
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Export Customers
            </Button>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Customer Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search customers..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="joined">Join Date</option>
                  <option value="orders">Orders</option>
                  <option value="spent">Total Spent</option>
                </select>
              </div>
              <div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Search className="mr-2 h-4 w-4" /> Apply Filters
                </Button>
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
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Joined
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Orders
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      Total Spent
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
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 px-4">#{customer.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-400">
                            {customer.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{customer.joined}</td>
                      <td className="py-3 px-4">{customer.orders}</td>
                      <td className="py-3 px-4">
                        ${customer.spent.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${customer.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="h-8 px-3"
                        >
                          <Link href={`/admin/customers/${customer.id}`}>
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
