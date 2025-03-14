import { createClient } from "../../../../../supabase/server";
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
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ShoppingBag,
  User,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

interface CustomerDetailsProps {
  params: {
    id: string;
  };
}

export default async function CustomerDetails({
  params,
}: CustomerDetailsProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database lookup using the ID
  const customer = {
    id: parseInt(params.id),
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joined: "2023-01-15",
    orders: 5,
    spent: 299.95,
    status: "Active",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    recent_orders: [
      {
        id: "ORD-001",
        date: "2023-06-15",
        total: 59.99,
        status: "Completed",
      },
      {
        id: "ORD-008",
        date: "2023-05-22",
        total: 69.99,
        status: "Completed",
      },
      {
        id: "ORD-015",
        date: "2023-04-10",
        total: 89.98,
        status: "Completed",
      },
      {
        id: "ORD-023",
        date: "2023-03-05",
        total: 49.99,
        status: "Completed",
      },
      {
        id: "ORD-031",
        date: "2023-02-18",
        total: 29.99,
        status: "Completed",
      },
    ],
    notes: "Prefers email communication. Interested in collectible figurines.",
  };

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
            <Link href="/admin/customers">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Customer Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            {/* Customer Information Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-700 p-4 rounded-full">
                    <User className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">{customer.name}</h3>
                    <p className="text-gray-400">Customer #{customer.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <p>{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Joined
                      </p>
                      <p>{customer.joined}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Orders
                      </p>
                      <p>{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Total Spent
                      </p>
                      <p>${customer.spent.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Address
                      </p>
                      <p>{customer.address.street}</p>
                      <p>
                        {customer.address.city}, {customer.address.state}{" "}
                        {customer.address.zip}
                      </p>
                      <p>{customer.address.country}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-6">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Mail className="mr-2 h-4 w-4" /> Send Email
                </Button>
              </CardFooter>
            </Card>

            {/* Customer Notes Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white resize-none"
                  defaultValue={customer.notes}
                ></textarea>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-6">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Save Notes
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription className="text-gray-400">
                  The customer's most recent purchases
                </CardDescription>
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
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">
                          Total
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.recent_orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-gray-700 hover:bg-gray-700/50"
                        >
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            ${order.total.toFixed(2)}
                          </td>
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
                                View
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <Link href={`/admin/orders?customer=${customer.id}`}>
                    View All Orders
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Customer Actions Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Customer Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Edit Customer
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Create Order
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Add to Segment
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white md:col-span-2"
                  >
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
