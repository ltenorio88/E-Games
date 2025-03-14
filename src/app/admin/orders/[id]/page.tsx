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
import { ArrowLeft, Printer, Send } from "lucide-react";

interface OrderDetailsProps {
  params: {
    id: string;
  };
}

export default async function OrderDetails({ params }: OrderDetailsProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data - in a real app, this would come from a database lookup using the ID
  const order = {
    id: params.id,
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    date: "2023-06-15",
    total: 59.99,
    subtotal: 54.99,
    tax: 5.0,
    shipping: 0,
    status: "Completed",
    payment_method: "Credit Card (Visa ending in 4242)",
    shipping_address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    billing_address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Cyberpunk 2077",
        price: 59.99,
        quantity: 1,
        total: 59.99,
        sku: "SKU-000001",
      },
    ],
    notes: "",
    tracking_number: "1Z999AA10123456784",
    carrier: "UPS",
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
            <Link href="/admin/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Order {order.id}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Placed on {order.date}
                  </CardDescription>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${order.status === "Completed" ? "bg-green-500/20 text-green-400" : order.status === "Processing" ? "bg-blue-500/20 text-blue-400" : order.status === "Shipped" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 px-4 text-gray-400 font-medium">
                              Product
                            </th>
                            <th className="text-center py-2 px-4 text-gray-400 font-medium">
                              Quantity
                            </th>
                            <th className="text-right py-2 px-4 text-gray-400 font-medium">
                              Price
                            </th>
                            <th className="text-right py-2 px-4 text-gray-400 font-medium">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-700"
                            >
                              <td className="py-4 px-4">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-400">
                                  SKU: {item.sku}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">
                                {item.quantity}
                              </td>
                              <td className="py-4 px-4 text-right">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="py-4 px-4 text-right">
                                ${item.total.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-b border-gray-700">
                            <td
                              colSpan={3}
                              className="py-2 px-4 text-right font-medium"
                            >
                              Subtotal
                            </td>
                            <td className="py-2 px-4 text-right">
                              ${order.subtotal.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td
                              colSpan={3}
                              className="py-2 px-4 text-right font-medium"
                            >
                              Tax
                            </td>
                            <td className="py-2 px-4 text-right">
                              ${order.tax.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td
                              colSpan={3}
                              className="py-2 px-4 text-right font-medium"
                            >
                              Shipping
                            </td>
                            <td className="py-2 px-4 text-right">
                              ${order.shipping.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={3}
                              className="py-4 px-4 text-right font-semibold"
                            >
                              Total
                            </td>
                            <td className="py-4 px-4 text-right font-semibold">
                              ${order.total.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="text-gray-300">
                          <p>{order.customer}</p>
                          <p>{order.shipping_address.street}</p>
                          <p>
                            {order.shipping_address.city},{" "}
                            {order.shipping_address.state}{" "}
                            {order.shipping_address.zip}
                          </p>
                          <p>{order.shipping_address.country}</p>
                        </div>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Shipping Details</h4>
                        <div className="text-gray-300">
                          <p>
                            <span className="font-medium">Carrier:</span>{" "}
                            {order.carrier}
                          </p>
                          <p>
                            <span className="font-medium">
                              Tracking Number:
                            </span>{" "}
                            {order.tracking_number}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 pt-6">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <Printer className="mr-2 h-4 w-4" /> Print Order
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="mr-2 h-4 w-4" /> Send Invoice
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Customer Information Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Name
                  </h4>
                  <p>{order.customer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Email
                  </h4>
                  <p>{order.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Phone
                  </h4>
                  <p>{order.phone}</p>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Billing Address
                  </h4>
                  <p>{order.billing_address.street}</p>
                  <p>
                    {order.billing_address.city}, {order.billing_address.state}{" "}
                    {order.billing_address.zip}
                  </p>
                  <p>{order.billing_address.country}</p>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Payment Method
                  </h4>
                  <p>{order.payment_method}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Actions Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Update Status
                  </label>
                  <select className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Add Tracking Number
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter tracking number"
                      className="bg-gray-700 border-gray-600 text-white"
                      defaultValue={order.tracking_number}
                    />
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Update
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Order Notes
                  </label>
                  <textarea
                    className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white resize-none"
                    placeholder="Add notes about this order"
                    defaultValue={order.notes}
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-700 pt-6">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white ${className}`}
      {...props}
    />
  );
};
